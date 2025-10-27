import { Router } from 'express'
import nodemailer from 'nodemailer'
import { Payment } from '../model/paymentmodel.js';
import { User } from './model/usermodel.js';



export const sendEmail = async(req , res)=>{

        try {      
           const {userId , amount} = req.body 

           if(!userId || !amount){
               res.status(404).json({success : false , message : "user and amount are required"})
           }

           const user = await User.find({userId});
           if(!user) {
              res.status(404).json({success : false , message : "user not found"})
           }
                  const payment = new Payment({
                        user: user._id,
                        amount
                      });
                      await payment.save();


           const transporter = nodemailer.createTransport({
                service: "gmail", 
           auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
           }) 
           const populatedPayment = await User.find(id).populate("user" , "firstName email");
         const mailOptions = {
            from : process.env.EMAIL_USER,
            to : user.email,
            subject : "Your payment is successfull",
             html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Hi ${populatedPayment.user.firstName},</h2>
            <p>Thank you for your payment of ₹${amount}.</p>
            <p>Your booking has been successfully confirmed for ${date}.</p>
            <p>We look forward to having you with us!</p>
            <br/>
            <p>Warm regards,<br/><b>Hotel Booking Team</b></p>
            </div>`
         }
           console.log("Email user:", process.env.EMAIL_USER);
           console.log("Email pass length:", process.env.EMAIL_PASS?.length);
         try {
           await transporter.sendMail(mailOptions);
           console.log("Email sent to the user sucessfully: " , populatedPayment.user.email )
         }
         catch(error){
               console.error("Email sending failed:", error.message);
          }    
        res.status(200).json({success : true , message : "Payment saved and email is sent successfully!" , transactionId: Payment.transactionId  })
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to process payment"});
        }
}


export default email 
