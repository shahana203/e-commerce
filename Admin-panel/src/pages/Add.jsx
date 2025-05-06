import React, { useState } from 'react'
import { assets } from '../assets/assets'
import  axios  from 'axios';
import { backendUrl} from '../App' ;
import { toast } from 'react-toastify';

const Add = ({token}) => {

const [image1,setImage1]= useState(false)
const [image2,setImage2]= useState(false)
const [image3,setImage3]= useState(false)
const [image4,setImage4]= useState(false)

const [name,setName]= useState('')
const [description,setDescription]= useState('')
const [price,setprice]= useState('')
const [category,setCategory]= useState('Headphones')
const [popular,setPopular]= useState(false)

const [colorInput, setColorInput] = useState("");
const [colors, setColor] = useState([]);

const onSubmitHandler= async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("category",category)
    formData.append("popular",popular)
    formData.append("colors", JSON.stringify(colors));
    
    image1 && formData.append("image1",image1)
    image2 && formData.append("image2",image2)
    image3 && formData.append("image3",image3)
    image4 && formData.append("image4",image4)

    // send formdata to backend
    const response =await  axios.post(backendUrl + '/api/product/add',formData,{headers:{token}})
   if (response.data.success) {
    toast.success(response.data.message)
    setName('')
    setDescription('')
    setImage1(false)
    setImage2(false)
    setImage3(false)
    setImage4(false)
    setprice('')
    setColor([])

   }else{

    toast.error(response.data.message)
   }
    

  } catch (error) {
    console.log(error);
    toast.error(error.message)
    
  }
}
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3' >
        <div>
          <p className='mb-2'> Upload Image</p>
         
          <div className='flex gap-2'>
             <label htmlFor="image1">
              <img   className='w-20'src={!image1 ?  assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=> setImage1(e.target.files[0])} type="file"  id='image1' hidden/>
            </label>

            <label htmlFor="image2">
              <img className='w-20' src={!image2 ?  assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input  onChange={(e)=> setImage2(e.target.files[0])} type="file"  id='image2' hidden/>
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ?  assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=> setImage3(e.target.files[0])}  type="file"  id='image3' hidden/>
            </label>
            <label htmlFor="image4">
              <img  className='w-20' src={!image4 ?  assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=> setImage4(e.target.files[0])} type="file"  id='image4' hidden/>
            </label>

          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content  here' required />
        </div>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Headphones">Headphones</option>
              <option value="Cameras">Cameras</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Speakers">Speakers</option>
              <option value="Mouses">Mouses</option>
              <option value="Watches">Watches</option>
            </select>
          </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=> setprice(e.target.value)} value={price}className='w-full px-3 py-2 sm:w-[120px]' type="Number"  placeholder='100'/>
        </div>
        </div>

        <div>
  <p className='mb-2'>Product colours</p>
  <input
    onChange={(e) => setColorInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && colorInput.trim() !== "") {
        e.preventDefault();
        setColor([...colors, colorInput.trim()]);
        setColorInput("");
      }
    }}
    value={colorInput}
    className='w-full max-w-[500px] px-3 py-2'
    type="text"
    placeholder='Enter a color and press Enter'
  />

  {/* Show added colors */}
  <div className="mt-2 flex flex-wrap gap-2">
    {colors.map((col, idx) => (
      <span key={idx} className="px-2 py-1 bg-gray-200 rounded">
        {col}
      </span>
    ))}
  </div>
</div>


       <div className='flex gap-2 mt-2'>
        <input onChange={()=> setPopular(prev => !prev)} checked={popular} type="checkbox" id='popular' />
        <label className='cursor-pointer' htmlFor="popular">Add to popular products</label>
       </div>

       <button className='w-28 py-3 mt-4 cursor-pointer bg-black text-white' type="submit">ADD</button>
      </form>
    </div>
  )
}

export default Add