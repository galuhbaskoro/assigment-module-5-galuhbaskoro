import { useFormik } from 'formik'
import * as Yup from "yup";
import React from 'react'
import UserModel from '../interfaces/UserModel'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';

const Register: React.FC = () => {

  const navigate = useNavigate();

  const formik = useFormik<UserModel>({
    initialValues: {
      email: '',
      name: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required').min(5,'Email minimal 5 character'),
      name: Yup.string().required('Username is required').min(5, 'Username minimal 5 character'),
      password: Yup.string().required('Password id required').min(5, 'Password minimal 5 charracter and should be contain a letters, number, and symbols')
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values, {setSubmitting}) => {
      setTimeout(()=>{
        handleSubmit(values);
        setSubmitting(false);
      }, 400)
    }
  });

  const handleSubmit =  (values:UserModel) => {
    localStorage.setItem('user', JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password
      })
    )

    if(values){
      Swal.fire({
        icon: 'success',
        title: 'Your Account Successfuly Created',
        text: 'Please continue Login with your account',
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
          navigate('/login');
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Register failed',
        text: 'Please check your credential data',
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }

  return (
    <React.Fragment>
      <div className='w-full min-h-screen items-center px-4 py-6 bg-gray-100'>
        <div className='flex flex-col w-full px-0 py-6'>

          {/* Brand & Title */}
          <div className='flex flex-row mx-auto'>
            <FaStore className='mt-1 mr-1 text-2xl text-slate-700'/>
            <span className='text-2xl font-bold text-slate-700 text-center mb-1'>
              BasStore
            </span>
          </div>
          <h1 className='text-xl font-medium text-slate-500 text-center mb-4'>
            Create your account
          </h1>

          <form
            className="mx-auto w-full md:w-1/4 p-8 bg-white border border-gray-200 rounded-lg shadow-md"
            onSubmit={formik.handleSubmit} 
          >

            {/* Name */}
            <div className="mb-3">
              <label 
                htmlFor="name" 
                className="text-md font-medium text-gray-700">
                Name
              </label>
              <input 
                id="name" 
                name="name" 
                type="text"
                placeholder="your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg block 
                w-full p-2"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label 
                htmlFor="email" 
                className="text-md font-medium text-gray-700">
                Email
              </label>
              <input 
                id="email" 
                name="email" 
                type="email"
                placeholder="your active email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg block 
                w-full p-2"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label 
                htmlFor="password" 
                className="mb-2 text-md font-medium text-gray-700">
                Password
              </label>
              <input 
                id="password" 
                name="password" 
                type="password"
                placeholder="Your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-md rounded-lg block 
                w-full p-2"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
              )}
            </div>

            {/* Button */}
            <div className='mt-5'>
              <button
                type="submit" 
                disabled={formik.isSubmitting}
                className="px-4 py-2 w-full text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 border border-transparent rounded-lg shadow-sm "
              >
                Register
              </button>
            </div>

            {/* Text */}
            <p className='text-sm text-blue-400 cursor-pointer hover:text-blue-700 hover:underline text-center mt-4'>
              <Link to='/login'>
                Already have account, please Login  here
              </Link>
            </p>

            <p className='text-sm text-blue-400 cursor-pointer hover:text-blue-700 hover:underline text-center mt-1'>
              <Link to='/'>
                Back to Home page
              </Link>
            </p>

          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Register