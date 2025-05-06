import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/Shopcontext';
import axios from 'axios'
import { toast } from "react-toastify";



const Login = () => {

  const [currentState, setCurrentState] = useState('Login');

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  
  
  // const location = useLocation();
  // const from = location.state?.from || '/';





  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // for backend functionalities
    try {


      if (currentState === 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }


      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
        
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
// redirecting home page if sigin

useEffect(()=>{
if (token) {
  navigate('/')

} else {
  
}
},[token])



  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-4">
          <p className="text-3xl font-semibold text-black">{currentState}</p>
        </div>
  
        {currentState === 'Login' ? '' : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Name"
            required
          />
        )}
  
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          required
        />
  
        <input
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
        />
  
        <div className="w-full flex justify-between text-sm text-gray-600">
          <p className="hover:underline cursor-pointer">Forgot your password?</p>
          {currentState === 'Login' ? (
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">
              Login here
            </p>
          )}
        </div>
  
        <button className="bg-black text-white w-full font-medium py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 mt-2">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  </div>
  
  
  
  
  
  
  
  
  
    // <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
  //     <div className='inline-flex items-center gap-2 mb-2 mt-10'>
  //       <p className=' text-3xl'>{currentState}</p>
  //       {/* <hr className='border-none h-[1.5px] w-8 bg-gray-800' /> */}

  //     </div>
  //     {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Name' required />}
  //     <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Email' required />
  //     <input onChange={(e) => setpassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800 rounded-lg' placeholder='Password' required />
  //     <div className='w-full flex justify-between text-sm mt-[-8px]'>
  //       <p>Forgot your password?</p>
  //       {
  //         currentState === 'Login'
  //           ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
  //           : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
  //       }

  //     </div>
  //     <button className='bg-black  text-white font-light px-8 py-2 mt-4'> {currentState === 'Login' ? 'Sign In' : 'Sign Up'} </button>

  //   </form>
  )
}

export default Login