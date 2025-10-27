import mongoose from "mongoose";


const hoteladmin = new mongoose.Schema({
    user : {
        type : String,
        required : true 
    },
    email : {
        type : String, 
        required : true,
        unique : true 
    },
    password : {
         type : String, 
        required : true,
    },
    hotel: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'HotelCollection'
        }
    ]

    

})

export const hotelAdmin = new mongoose.model("admincontroller" , hoteladmin)