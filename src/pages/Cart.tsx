import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ProductModel from '../interfaces/ProductModel';
import Swal from 'sweetalert2';

const Cart: React.FC = () => {
  
  let number = 1;
  
  const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductModel[]>(cartStorage);
  
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))  
  },[cart]);

  const removeCart = (id: number) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure to remove the product ??',
      showConfirmButton: true,
    }).then((result)=>{
      if(result.isConfirmed){
        setCart((oldCart) => {
          return oldCart.filter((cart) => cart.id !== id)
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
          icon: 'success',
          title: 'Successfuly Remove Product',
          position: 'center',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(()=>{
          window.location.reload();
        });
      };
    });
  };

  return (
    <React.Fragment>
      <Navbar/>
      <div className='w-full min-h-screen px-4 py-8 bg-white mt-[60px]'>
        
        {/* Table */}
        <div className='overflow-hidden shadow-md rounded-lg '>
          <table className='table-auto w-full text-left'>
            <thead className='bg-cyan-600'> 
              <tr>
                <td className='border text-center font-bold p-4 text-gray-300'>No.</td>
                <td className='border text-center font-bold p-4 text-gray-300'>Image</td>
                <td className='border text-center font-bold p-4 text-gray-300'>Title</td>
                <td className='border text-center font-bold p-4 text-gray-300'>Category</td>
                <td className='border text-center font-bold p-4 text-gray-300'>Price</td>
                <td className='border text-center font-bold p-4 text-gray-300'>Actions</td>
              </tr>
            </thead>
            <tbody className=' text-gray-500'>
              {cart.map((item, idx) => (
                <tr className='py-1' key={idx}>
                  <td className='py-1 border text-center p-4'>{number++}</td>
                  <td className='py-1 border text-center p-4'>
                    <img src={item.image} alt={item.title} width={70} height={70} className='mx-auto' />
                  </td>
                  <td className='py-1 border text-center p-4'>{item.title}</td>
                  <td className='py-1 border text-center p-4'>{item.category}</td>
                  <td className='py-1 border text-center p-4'>$ {item.price}</td>
                  <td className='py-1 border text-center p-4'>
                    <button
                      className='rounded-xl px-3 py-2 font-semibold text-sm text-white bg-orange-600 hover:bg-orange-700'
                      onClick={()=>removeCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Cart;