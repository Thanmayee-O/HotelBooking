import { Payment } from "../model/paymentmodel.js";
import { Bookingmodel } from "../model/bookingmodel.js";
import {User} from '../model/usermodel.js'
import nodemailer from 'nodemailer'

export const PaymentController = async(req , res)=>{

  try{            
     const { bookingId, cardHolderName, date, cardNum ,cardExpMonth, cardExpYear} = req.body;
     const checkBooking = await Bookingmodel.findById(bookingId)
     if (!checkBooking){
      return res.status(404).json({error: "Booking not found"})
     }
     const amount = checkBooking.totalPrice

     const cardnum = Number(cardNum);
    // if (Number.isNaN(cardnum) || cardnum <= 0) {
    //   return res.status(400).json({ error: 'Invalid amount' });
    // }

      const payment = new Payment({
        cardHolderName,
        amount ,
        cardnum,
        cardExpMonth,
        cardExpYear,
        date 
      });
      await payment.save();

      const user = await User.findById(checkBooking.userId)
      if(!user){
        return res.status(404).json({success : false , message : "User not found"})
      }
      console.log("Email:", process.env.EMAIL_USER);
      console.log("Pass:", process.env.EMAIL_PASS ? "Loaded" : "NOT Loaded");
     
        const transporter = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 587,
           secure: false,
          service : "gmail",
          auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        })
      console.log("User ID:", checkBooking.userId);
      console.log("Users email: ",user.email)
      
      const dateOptions = new Date()
      const formattedDate = dateOptions.toString().slice(0,10)
      const mailOptions = {
            from : process.env.EMAIL_USER,
            to : user.email,
            subject : "Your payment is successfull",
             html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Hi ${user.firstName},</h2>
            <p>Thank you for your payment of ₹${amount}.</p>
            <p>Your booking has been successfully confirmed for ${formattedDate}.</p>
            <p>We look forward to having you with us!</p>
            <br/>
            <p>Warm regards,<br/><b>Hotel Booking Team</b></p>
            </div>`
         }

          try {
            await transporter.sendMail(mailOptions)
            console.log("Email sent sucessfully to: ",user.email)
          } catch (error) {
            console.log("Email sending failed: ",error.message)
          }
        
         return res.status(201).json({success : true , message : "Payment done successfully", transactionId: payment._id,payment})
     }
   
  catch(error){
    console.log(error)
    res.status(500).json({success : false , message : "Internal server error"})
  }
}



export const deletePayments = async(req , res)=>{
   try{
    const removePayment = await Payment.deleteMany({})
    res.status(200).json({success : true , messaage : "deleted the payments"})
   }
   catch(error){
     res.status(500).json({success : false , message : "deletion failed"})
   } 

}