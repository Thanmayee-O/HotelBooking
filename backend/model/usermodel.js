import mongoose from 'mongoose'

const register = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
    },
    lastName : {
        type : String,
        required: true,
        
    },
    email : {
        type:String,
        required:true,
        unique :true,
        lowercase : true

    },
    password : {
        type : String,
        required : true
    },    
    hotels : [] 

})
export const User = new mongoose.model("Registercollection" , register)