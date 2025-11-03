import mongoose from "mongoose";
import { Bookingmodel } from "../model/bookingmodel.js";
import { Hotelmodel } from "../model/hotelmodel.js";
import { hotelAdmin } from "../model/hoteladmin.js";


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


// GET /bookings/admin/:adminId
export const getAdminBookings = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Find admin and get their hotel IDs
    const admin = await hotelAdmin.findById(adminId).populate("hotel");
    const hotelIds = admin.hotel.map(h => h._id);

    // Get bookings for those hotels
    const bookings = await Bookingmodel.find({ hotelId: { $in: hotelIds } })
      .populate("userId")   // optional: show who booked
      .populate("hotelId"); // optional: show hotel details

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
