import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'


const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setcartData] = useState([]);


  useEffect(() => {

    if (products.length > 0) {

      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {

          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              colors: item,
              quantity: cartItems[items][item]
            })
          }
        }

      }
      setcartData(tempData);

    }




  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />

      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>

                    <div className='flex items-center gap-5 mt-2'>
                      <p> {currency}{productData.price}</p>


                    </div>

                    <div>

                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: item.colors }}
                        ></div>
                        <p className="text-sm text-gray-500">Color: {item.colors}</p>
                      </div>

                    </div>



                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.colors, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-2 sm:px-3 py-1' />
                <img onClick={() => updateQuantity(item._id, item.colors, 0)} src={assets.bin_icon} alt="" className='w-4 mr-4 sm:w-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full  sm:w-[450px]'>

          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/placeorder')} className='bg-black text-white text-sm my-8  px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>

          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Cart