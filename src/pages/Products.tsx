import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

interface ProductModel {
  id: number,
  title: string,
  category: string,
  price: number,
  image: string
}

const Products: React.FC = () => {

  const [product, setProduct] = useState<ProductModel[]>([]);

  const getAllProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products?limit=4");
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   getAllProduct();
  }, [])
  
  console.log(product);

  return (
    <div className='flex flex-wrap items-center justify-center gap-4 bg-slate-300 w-full min-h-screen '>
      {product.map((item, index) => (
        <ProductCard
          key={index}
          id={item.id}
          title={item.title}
          category={item.category}
          price={item.price}
          image={item.image}
          addCart={()=>{alert('handle button add cart')}}
          viewDetail={()=>{alert('handle button view detail')}}
        />
      ))};
    </div>
  )
}

export default Products