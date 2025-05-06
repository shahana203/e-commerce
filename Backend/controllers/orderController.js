import orderModel from "../models/orderModel.js"
import Stripe from "stripe"
import userModel from '../models/userModel.js'
import razorpay from "razorpay"

// global variables
const currency = 'inr'
const deliveryCharge =10
// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({
    key_secret:process.env.RAZORPAY_SECRET_KEY,
    key_id:process.env.RAZORPAY_KEY_ID,
})




// placing orders using COD method
const placeOrder = async (req, res) => {
    try {

        const { userId, amount, items, address } = req.body

        const oderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()

        }
        const neworder = new orderModel(oderData)
        await neworder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({ success: true, message: "Oder Placed" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// placing orders using Stripe method


const placeOrderStripe = async (req, res) => {

    try {
        const {userId,items,amount,address} = req.body
        const {origin} = req.headers ;

        
        const oderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()

        }
        const neworder = new orderModel(oderData)
        await neworder.save()

     const line_items = items.map((item)=>({
          price_data:{
            currency:currency,
            product_data:{
                name:item.name 
            },
            unit_amount:item.price*100
          },
          quantity:item.quantity
     }))
     line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges' 
            },
            unit_amount:deliveryCharge*100
          },
          quantity:1
     })
     const session = await stripe.checkout.sessions.create({
        success_url:`${origin}/verify?success=true&orderId=${neworder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${neworder._id}`,
        line_items,
        mode:'payment',
       
    
    })
    res.json({ success: true,session_url:session.url })
}
        catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
    
    }
}
// verify Stripe
const  verifyStripe = async (req,res) => {

    const {orderId,success,userId} = req.body
    try {
        if (success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({ success: true ,message:"Payment Successfull" })
}
            else{
                await orderModel.findByIdAndDelete(orderId);
                res.json({ success: false })
            }
         } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
    }
    
}


// placing orders using Razorpay method


const placeOrderRazorpay = async (req, res) => {

    try {
        const {userId,items,amount,address} = req.body

          const oderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()

        }
        const neworder = new orderModel(oderData)
        await neworder.save()

        const options ={
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:neworder._id
        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if (error) {
                console.log(error);
                return res.json({success: true, message: error })
             }
             res.json({ success: true ,order})

        })
    
    } catch (error) {
        console.log(error);
            res.json({ success: false, message: error.message })
    }
}

// verify Razorpay
const  verifyRazorpay = async (req,res) => {
    try {
       const {userId,razorpay_order_id}=req.body
       const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id)
      if (orderInfo.status==='paid') {
        await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
        await orderModel.findByIdAndUpdate(userId,{cartData:{}})
        


        res.json({ success: true, message: "Payment Successfull" })
        
      }
      else{
        res.json({ success: false, message: "Payment Failed" })
      }
       
    } catch (error) {
        
    }
}

// All Orders data for Admin panel
const allOrders = async (req, res) => {

    try {
        const orders= await orderModel.find({})
        res.json({ success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

// User Orders data for front end
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
try {
    const {orderId,status} = req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({ success:true,message:'Status Updated'})
} catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
}
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, userOrders,verifyStripe,verifyRazorpay }