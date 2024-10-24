import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { http } from '../axios'
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    http.get("products?featured=true")
      .then(data => {
        if (data.status == 200) {
          setProducts(data.data.data);
        }
      })

      .catch((err) => {
        console.log(err);

      })
  }, [])


  const navigate = useNavigate()
  function handleRedirect(id) {
      navigate(`/products/${id}`)
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <div className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-slate-600'>We are changing the way people shop</div>
          <p className='mt-8 max-w-xl text-lg leading-8'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>
          <Link to="/products">
            <button className="btn btn-active btn-primary text-white mt-10">OUR PRODUCTS</button>
          </Link>
        </div>
        <div>
          <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                className="rounded-box" />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                className="rounded-box" />
            </div>
          </div>
        </div>
      </div>
      <div className='py-16'>
        <div className='border-b border-slate-200 pb-5'>
          <h2 className='text-3xl font-medium tracking-wider capitalize text-slate-600'>Featured Products</h2>
        </div>
      </div>

      <div className="wrapper pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          products.length > 0 && products.map(function (product, index) {
            return (
              <div className='flex shadow-xl cursor-pointer rounded-2xl hover:shadow-2xl' onClick={() => { handleRedirect(product.id) }} key={index}>
                <div className='p-5 '>
                  <img src={product.attributes.image} alt="img" className='h-[192px] w-[376px] rounded-2xl' />
                  <div className='p-5 flex flex-col gap-5 text-center text-slate-700'>
                    <p className='font-bold text-xl'>{product.attributes.title}</p>
                    <p>${product.attributes.price}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;
