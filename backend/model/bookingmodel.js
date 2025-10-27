import mongoose, { Schema } from "mongoose";


const booking = new mongoose.Schema({
     userId : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Registercollection"
        }
     ],

     hotelId : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "HotelCollection"
        }
     ],
     checkIn : {
         type : Date,
         required : true 
     },
     checkOut : {
        type : Date,
        required : true 
     },
     guests : {
        type : Number,
        required : true 
     },
     totalPrice : {
        type: String,
        required : true 
     }
})

export const Bookingmodel = new mongoose.model("bookingcollection" , booking)