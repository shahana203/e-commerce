import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useState } from 'react';
import { useEffect } from 'react';
import Title from './Title';
import ProductItems from './ProductItems';

const PopularProducts = () => {
    const {products}=useContext(ShopContext);
    const [popularProducts,setPopularProducts]=useState([])

    useEffect(()=>{
      const bestProduct=products.filter((item)=>(item.popular))
      setPopularProducts(bestProduct.slice(0,6))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'POPULAR'} text2={ 'PRODUCTS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
             popularProducts.map((item,index)=>(
                <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }

        
        </div>

    </div>

  )
}

export default PopularProducts