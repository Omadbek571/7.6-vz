import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../axios';

function Detailes({ addProductToCard }) {
  const [deproduct, setDeproduct] = useState({});
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    http.get(`products/${id}`)
      .then(response => {
        if (response.status === 200) {
          setDeproduct(response.data.data);
          setColor(response.data.data.attributes.colors[0]);
        }
      })
      .catch(err => {
        console.log(err); 
      });
  }, [id]);

  const handleAddToBag = () => {
    const productToAdd = {
      id: deproduct.id,
      title: deproduct.attributes.title,
      color: color,
      quantity: quantity,
      image: deproduct.attributes.image,
      price: deproduct.attributes.price,
    };

    addProductToCard(productToAdd);

    const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    storedProducts.push(productToAdd);
    localStorage.setItem('cartProducts', JSON.stringify(storedProducts)); 
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      {deproduct.id && (
        <div className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-6 gap-12">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src={deproduct.attributes.image} alt="" className='w-full h-auto rounded-lg' />
          </div>
          <div className='md:w-1/2 flex flex-col'>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{deproduct.attributes.title}</h3>
            <h3 className="text-lg text-gray-600 mb-4">${deproduct.attributes.price}</h3>
            <p className='mb-4'>{deproduct.attributes.description}</p>

            <div className="flex items-center mb-4">
              <p className="mr-2 text-gray-700">Colors:</p>
              {deproduct.attributes.colors.map((colorProduct, index) => (
                <span key={index} className='block w-6 h-6 rounded-full mr-2 cursor-pointer'
                  style={{ backgroundColor: colorProduct, border: color === colorProduct ? "2px solid black" : "none" }}
                  onClick={() => setColor(colorProduct)}
                >
                </span>
              ))}
            </div>

            <div className="flex flex-col mb-4">
              <p className="mr-2 text-gray-700">Amount:</p>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="px-12 py-2 mt-2 border-black border text-black bg-white rounded-xl"
              >
                {[...Array(20).keys()].map(number => (
                  <option key={number + 1} value={number + 1}>{number + 1}</option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-outline btn-primary"
              onClick={handleAddToBag} 
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detailes;
