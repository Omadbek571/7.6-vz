import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../axios';

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/i;
    return regex.test(password);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    // Username
    if (nameRef.current.value.length < 3) {
      setErrorName('Username xato, 3 ta so\'zdan ko\'proq yozing');
      nameRef.current.focus();
      nameRef.current.style.outlineColor = 'red';
      return false;
    } else {
      nameRef.current.style.outlineColor = 'black';
      setErrorName('');
    }
    
    // Email
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail('Email xato');
      emailRef.current.focus();
      emailRef.current.style.outlineColor = 'red';
      return false;
    } else {
      setErrorEmail('');
      emailRef.current.style.outlineColor = 'black';
    }
    
    // Password
    // if (!validatePassword(passwordRef.current.value)) {
    //   setErrorPassword('Password kamida 6 ta harf va raqamdan iborat bo\'lishi kerak');
    //   passwordRef.current.focus();
    //   passwordRef.current.style.outlineColor = 'red';
    //   return false;
    // } else {
    //   setErrorPassword('');
    //   passwordRef.current.style.outlineColor = 'black';
    // }

    return true;
  }

  function handleRegister(e) {
    e.preventDefault();
    const valid = validate();
    if (!valid) return;

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: nameRef.current.value,
    };

    http
      .post('auth/local/register', user) 
      .then((data) => {
        if (data.status === 200) {
          formRef.current.reset();
          navigate('/login');
        }
      })
      .catch((error) => {
        alert(error.response.data.error.message);
      });
  }

  return (
    <div>
      <div className='flex justify-center items-center mt-[10%] text-[#394E6A]'>
        <form
          className='flex flex-col w-96 p-5 rounded-xl shadow-xl gap-6'
          ref={formRef}
        >
          <h2 className='text-3xl font-bold text-center'>Register</h2>
          <div className='username'>
            <label htmlFor='name'>Username</label>
            {errorName && <p className='text-red-700 mb-[-5px]'>{errorName}</p>}
            <input
              ref={nameRef}
              type='text'
              className='input input-bordered w-full bg-white mt-2 border-2'
              id='name'
            />
          </div>
          <div className='email'>
            <label htmlFor='email'>Email</label>
            {errorEmail && (
              <p className='text-red-700 mb-[-5px]'>{errorEmail}</p>
            )}
            <input
              ref={emailRef}
              type='email'
              className='input input-bordered w-full bg-white mt-2 border-2'
              id='email'
            />
          </div>
          <div className='Password'>
            <label htmlFor='password'>Password</label>
            {errorPassword && (
              <p className='text-red-700 mb-[-5px]'>{errorPassword}</p>
            )}
            <input
              ref={passwordRef}
              type='password'
              className='input input-bordered w-full bg-white mt-3 border-2'
              id='password'
            />
          </div>
          <button
            onClick={handleRegister}
            className='bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600'
          >
            REGISTER
          </button>
          <p className='text-center'>
            Already a member? <Link to='/login' className='text-blue-500'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
