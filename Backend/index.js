import express from 'express';
import cors from'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// dotenv.config();
// app config
const app = express();
connectDB();
connectCloudinary();

// middleware
const cors = require('cors');

const allowedOrigins = [
  'https://e-commerce-admin-lc3xnl75u-shahana203s-projects.vercel.app',
  'https://e-commerce-frontend-nine-ruddy.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests

// app.use(cors());


app.use(express.json());



// api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);




app.get("/",(req,res) =>{
res.send("welcome.....")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
