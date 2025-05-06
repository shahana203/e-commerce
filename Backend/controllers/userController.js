import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

// Signup
const registerUser = async (req, res) => {
  try {
    const { name,email, password} = req.body;

    //  check user exist or not

    const exists =await userModel.findOne({email})
    if (exists) {
      return res.json({success:false,message:"User already exists"})
    }
    //validating email format and password
      if (!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter valid email"})
      }

      if (password.length<8) {
        return res.json({success:false,message:"Please enter strong password"})
      }
      // hashing password

      const salt=await bcrypt.genSalt(10)
      const hashedPassword= await bcrypt.hash(password,salt)

      // create user

      const newUser= new userModel({
        name,
        email,
        password:hashedPassword,
      })
      // save user
      const user= await newUser.save()

      const token= createToken(user._id)

      res.json({success:true,token})
 
  } catch (error) {

    console.log(error);
    res.json({success:false,message:error.message})
    
  }
};

// Login
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.json({ success:false,message: 'Invalid credentials' });

    

    const token = createToken(user._id);
     res.json({ success:true ,token, user });
  } catch (err) {
     res.status(500).json({ message: 'Login error', error: err.message });
   }
};

// Get Profile
 const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.json(user);
 };

// Update Profile
 const updateProfile = async (req, res) => {
   const { name, mobile, address } = req.body;
   const user = await userModel.findByIdAndUpdate(
     req.user.userId,
     { name, mobile, address },
     { new: true }
   ).select('-password');
   res.json(user);
 };

// Logout (frontend clears token)
 const logout = (req, res) => {
    res.json({ message: 'Logout successful' });
 };


const adminLogin=async (req,res) => {
  try {
    const {email,password} =req.body
    if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
       }
       else{
        res.json({success:false,message:'Invalid credentials'})
       }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}



export {loginUser,registerUser,adminLogin,getProfile,logout,updateProfile}