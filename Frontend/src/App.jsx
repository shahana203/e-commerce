import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'


const App = () => {
  return (
    <div  className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen">
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar />
    <Routes>
<Route  path='/' element={<Home />} />
<Route  path='/collection' element={<Collection />} />
<Route  path='/contact' element={<Contact />} />
<Route  path='/about' element={<About />} />
<Route  path='/product/:productId' element={<Product />} />
<Route  path='/login' element={<Login />} />
<Route  path='/cart' element={<Cart />} />
<Route  path='/order' element={<Orders />} />
<Route  path='/placeorder' element={<PlaceOrder />} />
<Route  path='/verify' element={<Verify />} />
</Routes>
<Footer />
    </div>
    </div>
  )
}

export default App