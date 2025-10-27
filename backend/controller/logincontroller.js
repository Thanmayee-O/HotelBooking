import { User } from "../model/usermodel.js";
import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const createUser = async (req , res)=>{
    const {email , password} = req.body 
    dotenv.config()
    try{
        const getEmail = await User.findOne({email})
        if(!getEmail){
            return res.status(400).json({error : "User not found"})
        }
        const checkUserPassword = await bcrypt.compare(password , getEmail.password)
        if(!checkUserPassword){
            return res.status(400).json({error : "Password does not match"})
        }
       
    const token = jwt.sign(
        { 
        id:getEmail._id , email, password},
        process.env.SECRET_CODE,
        {expiresIn : "24h"}
    )
    return res.status(200).json({message : "Login successful" , token , getEmail});

}
    catch(err){
        res.status(500).json({error : "login failed"})
        console.log(err)
    }
}

export const getUser = async(req , res)=>{
    try{
        const user = await User.find()
        res.status(200).json({user})
        
    }
    catch(err){
         res.status(500).json({error : "Failed to retrieve the data"})
         console.log(err)
    }
}
// export const deleteUser = async(req , res)=>{
//     try{
//         const {id} = req.params.id 
//         const user = await User.deleteOne({email : "donkey@gmail.com"})
//         if(!id){
//              res.status(200).json({message : "user deleted successfully"} )
//         }
//         res.status(400).json({message : "user not found"})
        
//     }
//     catch(err){
//         res.status(500).json({
//             error : "Failed to delete the user" 
//         })
//     }

// }
