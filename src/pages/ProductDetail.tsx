import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import ProductDetailCard from '../components/ProductDetailCard';
import ProductModel from '../interfaces/ProductModel';
import Swal from 'sweetalert2';

const ProductDetail: React.FC = () => {

  const {id} = useParams<{id: string}>();  
  const [title, setTitle] = useState<string>('');
  const [category, setcategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');

  const [product, setProduct] = useState<ProductModel[]>([]);
  const cartStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductModel[]>(cartStorage);

  const auth = localStorage.getItem('auth');
  
  const fetchData = useCallback( async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setTitle(response.data['title']);
      setcategory(response.data['category']);
      setDescription(response.data['description']);
      setPrice(response.data['price']);
      setImage(response.data['image']);
    } catch (error) {
      console.error(error)
    }
  },[id]);

  const getProduct = useCallback( async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  },[id]);
  
  const addCart = (product: ProductModel) => {
    if(auth){
      setCart([...cart, {...product}]);
      Swal.fire({
        icon: 'success',
        title: 'Successfuly add product to cart',
        text: 'Please check your selected product in Shopping Cart',
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        backdrop: `
           rgba(0, 0, 0, 0.49)
        `,
        timerProgressBar: true
      }).then(() => {
        window.location.reload();
      });
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'We are sorry',
        text: 'Please Login first to add the product to cart',
        position: 'center',
        showConfirmButton: true,
        showCancelButton: true
      }).then((result) => {
        if(result.isConfirmed){
          window.location.replace('/login');
        }
      });
    }
  }

  useEffect(()=>{
    fetchData();
  },[fetchData]);
  
  useEffect(() => {
    getProduct();
  },[getProduct]);

  useEffect(()=>{
   localStorage.setItem('cart', JSON.stringify(cart));
  },[cart]);

  return (   
    <React.Fragment>
      <Navbar/>
      <div className='w-full min-h-screen px-4 py-6 bg-gray-100 mt-[60px]'>
        <ProductDetailCard
          title={title}
          category={category}
          description={description}
          price={price}
          image={image}
          addCart={()=>addCart(product)}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductDetail