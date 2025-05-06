import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItems from './ProductItems'

const RelatedProducts = ({category})=> {

    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(() => {
      if (products.length>0) {
        let productsCopy=products.slice();
        productsCopy=productsCopy.filter((item)=>category=== item.category)

        setRelated(productsCopy.slice())
      }
    }, [products])
    
  return (

    <div className='my-24'>
        
        <div className='text-center text-3xl py-2'>
            <Title  text1={'RELATED'} text2={'PRODUCTS'} />

        </div>

        <div className='grid grid-cols-2 sm:grid-cols3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item,index)=>(
                <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
        </div>
   </div>
  )
}

export default RelatedProducts