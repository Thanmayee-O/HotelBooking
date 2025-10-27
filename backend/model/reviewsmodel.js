import mongoose, { mongo, Schema } from "mongoose";



const reviews = new mongoose.Schema({
     firstName : {
         type : String,
          
     },
     hotelId : 
         {type : mongoose.Schema.Types.ObjectId,
        ref : "HotelCollection",
        required : true 
        },
      userId : 
        {type : mongoose.Schema.Types.ObjectId,
        ref : "Registercollection",
        required : true 
       },
      review : {
        type : String,
        
     },
     createdAt : {
        type : Date,
        default : Date.now
     },
     rating : {
        type : String,
         
     }
})

export const Review = new mongoose.model("ReviewCollection" , reviews)