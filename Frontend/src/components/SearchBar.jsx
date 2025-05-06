import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search,setSearch,setShowSearch,showSearch} = useContext(ShopContext);
    const  [visible,setVisible]=useState(false)
    // for accessing collection page
    const location = useLocation()

    useEffect(()=>{
      if (location.pathname.includes('collection')) {
        setVisible(true)
      }else{
        setVisible(false)
      }
      
    },[location])




  return showSearch&& visible?(
    <div className='   text-center'>
        <div className='inline-flex items-center justify-center border boerder-gary-400  px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>

        <input type="text"  placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm'/>
        <img className='w-4' src={assets.search_icon} alt="" />

        </div>
     <img className='inline w-3 cursor-pointer' src= {assets.cross_icon} alt="" onClick={()=>setShowSearch(false)}/>
    </div>
  ):null
}

export default SearchBar