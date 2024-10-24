  import React, { useState, useEffect } from 'react';
  import { Routes, Route, Link, useLocation } from 'react-router-dom';

  import logo from "./imges/logo-c.png";
  import moon from "./imges/moon.png";

  import Home from './pages/Home';
  import About from './pages/About';
  import Products from './pages/Products';
  import Card from './pages/Card';
  import Detailes from './pages/Detailes';
  import Register from './pages/Register';
  import Login from './pages/Login';

  function App() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      setActiveLink(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
      const storedProducts = JSON.parse(localStorage.getItem('cartProducts'));
      if (storedProducts) {
        setProducts(storedProducts);
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('cartProducts', JSON.stringify(products));
    }, [products]);

    const handleLinkClick = (path) => {
      setActiveLink(path);
    };

    const addProductToCard = (product) => {
      const existingProduct = products.find(item => item.id === product.id);
      if (existingProduct) {
        const newQuantity = existingProduct.quantity + product.quantity;
        updateProductQuantity(product.id, newQuantity);
      } else {
        setProducts(prevProducts => [...prevProducts, { ...product, quantity: product.quantity }]);
      }
    };

    const updateProductQuantity = (id, newQuantity) => {
      setProducts(prevProducts =>
        prevProducts.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    };

    return (
      <div className='bg-white'>
        <header className='bg-blue-950'>
          <div className='p-2 container max-w-[1440px] text-white flex justify-end gap-5 px-16'>
            <Link to="/register" className='hover:text-blue-300'>Create Account</Link>
            <Link to="/login" className='hover:text-blue-300'>Sign in / Guest</Link>
          </div>
        </header>

        <nav className='bg-slate-200 border-3 p-4 rounded-md container mx-auto flex items-center justify-between'>
          <Link to="/">
            <img src={logo} alt="logo-img" className='w-14' />
          </Link>
          <div className='flex gap-5 text-black items-center'>
            {['/', '/about', '/products', '/card'].map((path) => (
              <Link 
                key={path}
                to={path}
                className={`p-3 rounded-xl ${activeLink === path ? 'bg-blue-950 text-white' : 'bg-white text-black'}`}
                onClick={() => handleLinkClick(path)}
              >
                {path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2)}
              </Link>
            ))}
          </div>
          <div className='flex gap-5 items-center'>
            <img src={moon} alt="moon" className='w-5 h-5 cursor-pointer' />
            <Link to="/card">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{products.length}</span>
              </div>
            </Link>
          </div>
        </nav>

        <main className='container mx-auto mt-[80px]'>
          <Routes>
            <Route path='/' element={<Home setActiveLink={setActiveLink} />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products />} />
            <Route 
              path='/card' 
              element={<Card products={products} updateProductQuantity={updateProductQuantity} />} 
            />
            <Route 
              path='/products/:id' 
              element={<Detailes addProductToCard={addProductToCard} />} 
            />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </div>
    );
  }

  export default App;
