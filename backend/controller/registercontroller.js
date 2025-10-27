import bcrypt from 'bcryptjs'
import { User } from '../model/usermodel.js'

export const registerUser = async (req , res)=>{
    

    try{
        const {firstName , lastName , email , password} = req.body

        if(!firstName || !lastName || !email || !password){
            return res.json({message : "All fields are required"})
        }
        const user = await User.findOne({email})
        if(user){
            res.status(400).json({error : "The user already exists"})
        }
        const hashed = await bcrypt.hash(password , 10)
        const newUser = {firstName,lastName,email,password : hashed}
        const addUser = new User(newUser)    //adding a new user to a db 
        await addUser.save()
        res.status(201).json({message : "User has created successfully" , addUser})
        
    }
    catch(e){
        res.status(500).json({error : e.message})
    }
}
export const getRegisterUser = async (req , res)=>{
    
    try{
        const getUser = await User.find()
        res.status(200).json({message : "Retireved the user" , getUser})
        
    }
    catch(err){
        res.status(500).json({message : "Failed to retrieve the user"})
    }
}

// export const deleteUser = async(req , res)=>{
//     const {id} = req.params;
//     try{
//         const deleteUser = await User.findOneAndDelete({"_id " : id});
//         res.status(200).json({message : "Deleted user successfully" , deleteUser})
//     }
//     catch(err){
//         res.status(500).json({err})
//     }
// }


export const deleteAllUsers = async(req , res)=>{
    try{
        const deleteUser = await User.deleteMany({});
        res.status(200).json({message : "Deleted user successfully" , deleteUser})
    }
    catch(err){
        res.status(500).json({err})
    }
}