import jwt from "jsonwebtoken"
import { hotelAdmin } from "../model/hoteladmin.js";
import dotenv from 'dotenv'
import {User} from '../model/usermodel.js'

dotenv.config()

export const authorization = async(req , res , next) =>{
     
     try{

      const accessToken = req.header("Authorization")?.replace("Bearer " , "");
      if(!accessToken){
        res.status(401).json({error : "No token generated"})
     }

       const decode = jwt.verify(accessToken, process.env.SECRET_CODE)
      //   req.userId = await User.findById(decode.id);
      //  const user = await User.findOne({ email: decode.email });
       const user = await User.findById(decode.id) 

       if (!user) {
            return res.status(404).json({ message: "User not found" });
       }
      req.user = user;
      next()        
     }
     catch(e){
       console.log(e)   
       res.status(401).json({message : "Invalid token"})
     }
}


export const verifyToken = async(req , res , next)=>{
   const token = req.header("Authorization")?.replace("Bearer " , "");
   console.log(token)
   if(!token){
       return res.status(401).json({error : "Token is required"});
   }
   try{
      const decode = jwt.verify(token , process.env.ADMIN_SECRET)
      const admin = await hotelAdmin.findById(decode.adminId);
      
      if(!admin){
         return res.status(400).json({error : "Admin not found"})

      }      
      req.adminId = admin._id 
      next()
   }
   catch(err){
      console.log(err)
      res.status(500).json({err : "internal token"})
   }
}