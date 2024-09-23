import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import capitalizeLetter from '../utilities/capitalizeLetter';
import ProductModel from '../interfaces/ProductModel';
import UserModel from '../interfaces/UserModel';
import { IoCart, IoLogOut, IoLogIn } from "react-icons/io5";
import { FaUserCircle, FaStore } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import React from 'react';
import Swal from 'sweetalert2';

const MyNavbar: React.FC = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  useEffect(() => {
    const handleResize = () => {setIsMobile(window.innerWidth < 769)};
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize)};
  },[]);
  
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleBarsIconClick = () => {
    toggleModal();
  };

  const [category, setCategory] = useState<[]>([]);
  const getCategory = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategory(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategory();
  },[]);

  const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]'); 
  const [cart] = useState<ProductModel[]>(cartStorage);

  const auth = localStorage.getItem('auth');
  const user: UserModel = JSON.parse(localStorage.getItem('user') || '{}');
  const [name] = useState<string>(user.name);

  const logout = () => {
    setShowModal(false);
    Swal.fire({
      title: "Are you sure want to Logout ??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#057A55",
      cancelButtonColor: "#F05252 "
    }).then((result) => {
      if(result.isConfirmed){
        localStorage.removeItem("auth");
        localStorage.removeItem("cart");
        Swal.fire({
          icon: 'success',
          title: 'Logout Successfuly',
          text: 'Thanks for Shopping at BassStore',
          position: 'center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(()=>{
          window.location.replace('/');
        });
      };    
    });
  }

  return (
    <div>
      {!isMobile ? (
        <nav className='w-full h-auto fixed top-0 shadow-md bg-slate-600 '>
          <div className='flex justify-between mx-auto items-center py-4 px-4'>
            
            {/* Brand */}
            <div className='flex flex-row'>
              <FaStore className='mt-1 mr-1 text-xl text-white' />
              <span className='text-white font-bold text-xl'>BasStore</span>
            </div>
            
            {/* Category Links */}
            <ul className='flex gap-8 md:gap-6 items-center justify-center text-center cursor-pointer'>
              {category.map((item, index) => (
                <li
                  key={index}
                  className='font-semibold text-gray-300 hover:text-white text-md'
                >
                  <Link to={`/product/category/${item}`}>{capitalizeLetter(item)}</Link>
                </li>
              ))}
            </ul>
            
            {/* Page Links */}
            <ul className='flex text-white gap-6 items-center cursor-pointer'>

              {/* Products */}
              <li className='font-semibold text-gray-300 hover:text-white text-md'>
                <Link to='/' className='flex flex-row' onClick={()=>setShowModal(false)}>
                  <FaBagShopping className='mt-0.5 mr-1.5 text-lg' /> Products
                </Link>
              </li>

              {/* Carts */}
              <li className='font-semibold text-gray-300 hover:text-white text-md'>
                <Link to='/cart' className='flex flex-row'>
                  <IoCart className='mr-1 mt-0 text-2xl' /> 
                  {cart.length}
                </Link>
              </li>
              
              {auth ? (
                <React.Fragment>
                  <li className='font-semibold text-gray-300 hover:text-white text-md'>
                    <div className='flex flex-row'>
                      <FaUserCircle className='text-md mt-1 mr-1.5' />
                      {name}
                    </div>
                  </li>
                  <li className='font-semibold text-gray-300 hover:text-white text-md'>
                    <button 
                      className='flex flex-row'
                      type='button'
                      onClick={logout}
                    >
                      <IoLogOut className='mt-0 mr-1 text-2xl'/> Logout
                    </button>
                  </li>
                </React.Fragment>
              ) : (
                <li className='font-semibold text-gray-300 hover:text-white text-md'>
                  <Link to='/login' className='flex flex-row'>
                    <IoLogIn className='mt-0 mr-1 text-2xl' />Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className='h-auto py-4 px-4 bg-slate-700 fixed top-0 w-full'>
          <div className='mx-auto flex justify-between items-center'>

            {/* Brand */}
            <div className='flex flex-row'>
              <FaStore className='mt-1 mr-1 text-xl text-white' />
              <span className='text-white font-bold text-xl'>BasStore</span>
            </div>

            {/* Menubar */}
            <div className='flex justify-end items-center gap-6 text-white cursor-pointer'>
              <FaBars onClick={handleBarsIconClick} className="text-white cursor-pointer" />
            </div>

          </div>
          {showModal && (
            <div className='fixed inset-0 flex justify-center items-center'>

              <div className='absolute inset-0 bg-gray-700'>
                <FaTimes
                  className="absolute top-6 right-4 text-white cursor-pointer"
                  onClick={toggleModal}
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div className='relative bg-gray-700 w-full'>
                
                {/* Pages Link */}
                <div className='flex flex-col gap-6 items-center mb-6'>
                  
                  {/* Products */}
                  <Link 
                    to={'/'} 
                    className='flex flex-row font-semibold text-gray-300 hover:text-white text-lg'
                  >
                    <FaBagShopping className='mt-0.5 mr-1.5' /> Products
                  </Link>

                  {/* Cart */}
                  <Link 
                    to={'/cart'} 
                    className='flex flex-row font-semibold text-gray-300 hover:text-white text-lg'
                  >
                    <IoCart className='mt-1 mr-1.5 text-xl'/> {cart.length}
                  </Link>

                  {/* User & Login */}
                  {auth ? (
                    <React.Fragment>
                      <div className='flex flex-row font-semibold text-gray-300 hover:text-white text-lg'>
                        <FaUserCircle className='text-md mt-1 mr-1.5' /> {name}
                      </div>
                      <button
                        type='button'
                        onClick={logout}
                        className='flex flex-row font-semibold text-gray-300 hover:text-white text-lg'
                      >
                        <IoLogOut className='mt-1 mr-1 text-xl'/> Logout
                      </button>
                    </React.Fragment>
                  ) : (
                    <Link 
                      to={'/login'}
                      className='flex flex-row font-semibold text-gray-300 hover:text-white text-lg'
                    >
                      <IoLogIn className='mt-1 mr-1 text-xl' />Login
                    </Link>
                  )}

                </div>

                {/* Category Links */}
                <div className='flex flex-col gap-6 items-center'>
                  {category.map((item, index) => (
                    <span
                      key={index}
                      className='font-semibold text-gray-300 hover:text-white text-lg'
                    >
                      <Link to={`/product/category/${item}`}>{capitalizeLetter(item)}</Link>
                    </span>
                  ))}
                </div>

              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  )
};

export default MyNavbar;