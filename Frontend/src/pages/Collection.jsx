import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {

const {products,search,showSearch}=useContext(ShopContext)

  // for category visible
const [showFilter,setShowFilter]=useState(false);

// for displaying product
const [filterProducts,setFilterProducts]=useState([]);

// for performing catogory function
const[category,setCategory] = useState([]);

const toggleCategory = (e)=>{
  if (category.includes(e.target.value)) {
    setCategory(prev=> prev.filter(item =>item!==e.target.value))
  }
  else{
    setCategory(prev => [...prev,e.target.value])
  }
}

// for sorting
const [sortType, setSortType]=useState('relevent')

// applying filter for category
const applyFilter =()=>{
  let productsCopy= products.slice();

  // if() for search functoion
  
   if (showSearch&&search) {
    productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
   }

  if (category.length>0) {
     productsCopy= productsCopy.filter(item=>category.includes(item.category));
  } 
  setFilterProducts(productsCopy)
}


// sort products
const sortProducts =  () =>{

  let fpCopy= filterProducts.slice();
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
      break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

        default:
          applyFilter();
          break
  }
}


// useEffect(()=>{
//       setFilterProducts(products)
// },[])

useEffect(()=>{
applyFilter();
},[category,search,showSearch,products])


useEffect(()=>{
  sortProducts();
  
  },[sortType])
  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter option */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl inline-flex items-center cursor-pointer gap-2'>FILTERS <img  className={`h-3 sm:hidden ${showFilter ?  'rotate-90': ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Headphones'} onChange={toggleCategory}  />Headphones
              </p> 
              <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Cameras'} onChange={toggleCategory} />Cameras
              </p>
              <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Mobiles'} onChange={toggleCategory} />Mobiles
              </p>
              <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Speakers'} onChange={toggleCategory} />Speakers
              </p>
              <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Mouse'}  onChange={toggleCategory}/> Mouses
              </p>
              <p className='flex gap-2'>
             <input type="checkbox" className='w-3' value={'Watches'} onChange={toggleCategory} />Watches
              </p>
              </div>

        </div>
      </div>
    
{/* right side */}
<div className='flex-1'>
  <div className='flex justify-between text-base sm:text-2xl mb-4 sm:ml-30'>
    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
 {/* product sort */}
 <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
  <option value="relevent">Sort by: Relevent</option>
  <option value="low-high">Sort by: Low to High</option>
  <option value="high-low">Sort by: High to Low</option>
 </select>
  </div>
{/* map products */}

<div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
{
  filterProducts.map((item,index)=>(
    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
))
}

</div>
</div>

    </div>
  )
}

export default Collection