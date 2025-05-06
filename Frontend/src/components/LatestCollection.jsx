import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title';
import ProductItems from './ProductItems';

const LatestCollection = () => {

const {products} = useContext(ShopContext);
 const[latestProducts,setLatestProducts] =useState([])

 useEffect(()=>{
    setLatestProducts(products.slice(0,10));
 },[products])


  return (

    <div  >
    {/* <div className='text-center py-8 text-3xl'> */}
    <div className="text-center pt-6  pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 text-xl sm:text-2xl md:text-3xl">

     <Title text1={'NEW'} text2={'ARRIVALS'}/>
     <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
     {/* rendering products */}
     <div className='grid grid-cols-2 sm:grid-cols3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProducts.map((item,index)=>(
                <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }

     </div>
    </div>

  )
}

export default LatestCollection