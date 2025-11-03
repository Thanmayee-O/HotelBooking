import { hotelAdmin } from "../model/hoteladmin.js";
import { Hotelmodel } from "../model/hotelmodel.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()

export const createAdminRegister = async(req , res)=>{
    const {user , email , password} = req.body
    try{
        const adminEmail = await hotelAdmin.findOne({email})
        if(adminEmail){
            return res.status(400).json({success : false , message : "Email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newAdmin = new hotelAdmin({
                user,
                email,
                password : hashedPassword
        })
        await newAdmin.save();
        res.status(201).json({success : true , message : "Admin registed successfully" , newAdmin})
        console.log("registered")
    }
    catch(error){  
        console.log(error)  
        res.status(500).json({success : false , message : "Internal server error"});
    }


}


export const createAdminLogin = async(req , res)=>{
    const {email , password} = req.body 
    
    try{
        const admin = await hotelAdmin.findOne({email});
        if(!admin){
             return res.status(401).json({success : false , message : "Invalid username or password" })
        }
        if(!(await bcrypt.compare(password , admin.password))){
            return res.status(401).json({success : false , message : "Invalid username or password" })
        }
        const token = jwt.sign({adminId : admin._id} , process.env.ADMIN_SECRET , {expiresIn : "24h"})
        res.status(200).json({success : true , message : "Login successfull"  , token , admin})
        console.log(email , "this is token" , token)
        console.log(email)
    }
    catch(err){
        res.status(500).json({err : "internal error server"})
        
    }
}



export const getAdmins = async(req , res)=>{
    try{
        const admin = await hotelAdmin.find().populate('hotel');
        res.status(200).json({message : "fetched the details",admin})
    }catch(err){
        console.log(err)
        res.status(500).json({err : "Internal server error"});
    }
}

export const deleteAdmin = async(req , res)=>{
       const {id} = req.params 
     try {
        const admin = await hotelAdmin.findByIdAndDelete(id)
        if(!admin){
            res.status(404).json({success : false , message : "Admin not found"})
        }
        res.status(200).json({success : true , message : "Admin deleted successfully"})

     } catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : "Internal server error"})
     }
}

export const deleteAdmins = async(req , res)=>{
    try {
        const removeAdmins = await hotelAdmin.deleteMany({})
        res.status(200).json({success : true , message : "Admins deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : "Internal server error"})
    }
}


