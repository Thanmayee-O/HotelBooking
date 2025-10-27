import mongoose from "mongoose";
import { Bookingmodel } from "../model/bookingmodel.js";
import { Hotelmodel } from "../model/hotelmodel.js";


export const viewBookings = async(req , res)=>{
    try {
        const getBookings = await Bookingmodel.find({userId : req.user._id}).populate("userId").populate("hotelId")
        console.log(req.user._id)
        
        
        if(!getBookings || getBookings.length === 0){
            return res.status(404).json({success : false , message : "bookings are not found"})
        }
        
        res.status(200).json({success : true , message : "bookings fetched successfully" , getBookings})
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : "Internal server error"})
    }
}