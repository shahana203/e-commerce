import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { useNavigate } from 'react-router-dom';


const Product = () => {
 
  const {productId}=useParams();
  const {products,currency,addToCart,token}=useContext(ShopContext)
  const[productData,setProductData] =useState(false);
  const [image,setImage]=useState('')
  const [selectedColor, setSelectedColor] = useState(null);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!token) {
      
        navigate('/login');
      
    } else {
      addToCart(productData._id, selectedColor);
    }
  };
  
  


  const fetchProductData = async () => {
    products.map((item)=>{
       if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        
        return null;

       }
    })
  }

  useEffect(()=>{
     fetchProductData();
  },[productId])


  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 flex-col sm:flex-row'>

      

      {/* product img */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
         {
          productData.image.map((item,index)=>(
            
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />

          ))
         }
        
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt="" />

        </div>
      </div>

      {/* product info */}

      <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>
          
          </div>
        <p className='mt-5 text-3xl font-medium '>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          <p>Select Colour</p>
          <div className='flex space-x-2 '>
          {productData.colors.map((color, index) => (
        <button
          key={index}
          style={{ backgroundColor: color }}
          className={`w-6 h-6 rounded-full cursor-pointer focus:outline-none ${
            selectedColor === color ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
          }`} onClick={() => setSelectedColor(color)}
        
        />
      ))}
          </div>

        </div>
         <button    onClick={handleAddToCart}className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
        <hr className='mt-8 sm:w-4/5  border-gray-300' />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
          <p>100% original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p> Easy retun and exchange policy within 7 days.</p>
{/* onClick={()=>addToCart(productData._id,selectedColor)}  */}
        </div>
      </div>
      </div>
     {/* description & review */}
     <div className='mt-20'>
      <div className='flex'>
        <b className='border border-gray-200 px-5 py-3 text-sm '>Description</b>
      <p className='border  border-gray-200 px-5 py-3 text-sm '>Reviews(122)</p>
      </div>
      <div className='flex flex-col gap-4 border  border-gray-200 px-6 py-6 text-sm text-gray-500'>
      <p>
      Discover the latest in electronics at Emmilee. — from smart gadgets and cameras to wearables and accessories. Quality tech, trusted brands, and unbeatable prices, all delivered fast to your doorstep.Designed with style and functionality in mind, each product is built using durable materials and advanced features. Enjoy seamless performance, long-lasting battery life, and compatibility with your devices.
      </p>
      <p>
      we bring you the latest technology from trusted brands with reliable delivery and customer support you can count on.
      </p>
      </div>
    
     </div>
{/* display related products   */}
   <RelatedProducts  category={productData.category}/>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product