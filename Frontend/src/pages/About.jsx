import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
     
     <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'}  text2={'US'}/>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.blog4} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Welcome to Emmilee, your one-stop destination for high-quality products at unbeatable prices. We are passionate about delivering the latest and most reliable gadgets—from smartphones and laptops to smart home devices and accessories.</p>
      <p>At Emmilee, customer satisfaction is our top priority. We ensure fast delivery, secure payments, and friendly support to make your shopping experience smooth and enjoyable. Whether you're a tech enthusiast or shopping for essentials, Emmilee brings innovation right to your doorstep.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>our mission is to empower every individual with access to cutting-edge electronic products that enhance daily life. We are committed to providing top-quality technology, exceptional service, and a seamless online shopping experience. Through innovation, trust, and affordability, we aim to become a trusted name in the electronics market — delivering value, performance, and satisfaction to every customer.</p>

      </div>
    </div>
       <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
         </div>
         <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border border-gray-400 px-10 md:px-20 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Quality Assurance: </b>
         <p className='text-gray-600' >we are committed to delivering only the highest quality electronic products to our customers. From the latest gadgets to everyday tech essentials, our products go through strict quality checks to ensure performance, safety, and durability.</p>
          </div>

          <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Convenience: </b>
         <p className='text-gray-600' >we prioritize your time and comfort. Our platform is designed to make shopping simple — from a clean, easy-to-navigate interface to fast search and secure checkout.  With quick delivery options and real-time order tracking, we bring convenience right to your doorstep.</p>
          </div>

          <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
         <b>Exceptional Customer Service: </b>
         <p className='text-gray-600  ' >Our friendly and knowledgeable customer service team is always ready to assist you — whether you have questions before purchase or need help after.  ensuring a smooth and satisfying experience every time you shop with us.

</p>
          </div>

         </div>
         <NewsLetter />
    </div>
  )
}

export default About