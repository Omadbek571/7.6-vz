import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from "../axios";

function Products() {
  const [producCard, setProductCard] = useState([]);

  useEffect(() => {
    http.get("/products")
      .then(data => {
        setProductCard(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();
  
  function handlePages(id) {
    navigate(`/products/${id}`);
  }

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-4xl font-bold text-center mb-10'>
        {producCard.length} Products
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {producCard.length > 0 ? (
          producCard.map(product => (
            <div key={product.id} className='shadow-lg rounded-xl overflow-hidden cursor-pointer' onClick={() => handlePages(product.id)}>
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className='w-full h-64 object-cover'
              />
              <div className='p-5 text-center'>
                <h3 className='text-xl font-bold capitalize'>{product.attributes.title}</h3>
                <p className='text-lg text-gray-600 mt-2'>${(product.attributes.price / 100).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>No products available</p>
        )}
      </div>
    </div>
  );
}

export default Products;
