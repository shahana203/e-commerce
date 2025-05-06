import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='mt-22'>
     <div className=' flex flex-col sm:flex-row border border-gray-400 radius-30 '>
         <img  className='w-full sm:w-1/2 ' src={assets.hero_img} alt="" />
         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative bg-no-repeat bg-center bg-cover' style={{ backgroundImage: `url(${assets.login})` }}>
        <div className='absolute inset-0 bg-white opacity-30 z-0'></div>


         <div className='text-black relative z-10 text-center'>
    <div className='flex items-center gap-2'>
             <p className='font-medium text-sm md:text'></p>
            
          </div>
          <h1 className=' prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed mt-30' >Discover More,<br />Shop with ease</h1> 

         
          <div className='flex jestify-center items-center gap-2 '>
        
         
           <Link to={'/collection'}> <button className='font-semibold text-sm md:text-base px-6 py-2 bg-black text-white rounded-full w-full md:w-48 md:ml-20 mt-30 md:mb-6 ml-8'>Explore Now</button></Link>
         </div>
       
       </div>
      
    </div>
    </div>
    </div>
  )
}

export default Hero 