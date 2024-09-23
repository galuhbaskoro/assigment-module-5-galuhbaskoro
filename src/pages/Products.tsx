import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import ProductModel from '../interfaces/ProductModel';
import Navbar from '../components/Navbar';
import capitalizeLetter from '../utilities/capitalizeLetter';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {

  const [product, setProduct] = useState<ProductModel[]>([]);

  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products?limit=20");
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   getAllProduct();
  }, [])
  
  return (   
    <React.Fragment>
      <Navbar/>
      <div className='w-full min-h-screen px-4 py-6 bg-gray-100 mt-[60px]'>
        <div 
          className='flex flex-wrap gap-6 justify-center'
        >
          {product.map((item, index) => (
            <ProductCard
              key={index}
              id={item.id}
              title={item.title}
              category={capitalizeLetter(item.category)}
              price={item.price}
              image={item.image}
              viewDetail={()=>{navigate(`/product/detail/${item.id}`)}}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products