import express from 'express';
import { registerUser, loginUser,adminLogin, getProfile ,updateProfile, logout} from '../controllers/userController.js';
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/getProfile ', getProfile);
userRouter.post('/updateProfile ', updateProfile);
userRouter.post('/logout ', logout);




export default userRouter;
