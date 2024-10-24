import React, { useEffect, useState } from 'react';

function Card() {
  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    return storedProducts;
  });

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products));
  }, [products]);

  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      return updatedProducts;
    });
  };

  const handleRemoveProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((item) => item.id !== id);
      return updatedProducts;
    });
  };

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-4xl font-bold text-center mb-10'>Your Cart</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.length > 0 ? (
          products.map((item, index) => (
            <div key={index} className='shadow-lg rounded-xl overflow-hidden'>
              <img 
                src={item.image} 
                alt={item.title} 
                className='w-full h-64 object-cover'
              />
              <div className='p-5 text-center'>
                <h3 className='text-xl font-bold capitalize'>{item.title}</h3>
                <div className='flex items-center justify-center mt-2'>
                  <label className='mr-2'>Color:</label>
                  <span 
                    className='block w-6 h-6 rounded-full mr-2' 
                    style={{ backgroundColor: item.color }} 
                  />
                  <span className='text-lg text-gray-600'>{item.color}</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <label htmlFor={`quantity-${index}`} className="mr-2">Quantity:</label>
                  <select
                    id={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(20).keys()].map(number => (
                      <option key={number + 1} value={number + 1}>{number + 1}</option>
                    ))}
                  </select>
                </div>
                <p className='text-lg text-gray-600 mt-2'>
                  ${(item.price / 100 * item.quantity).toFixed(2)}
                </p>
                <button 
                  onClick={() => handleRemoveProduct(item.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No items in your cart</p>
        )}
      </div>
    </div>
  );
}

export default Card;
