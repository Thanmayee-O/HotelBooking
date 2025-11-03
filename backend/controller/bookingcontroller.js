import { Bookingmodel } from "../model/bookingmodel.js";
import mongoose from "mongoose";
import { Hotelmodel } from "../model/hotelmodel.js";
import { User } from "../model/usermodel.js";
import { RoomModel } from "../model/roommodel.js";

export const postBooking = async(req , res)=>{
    try{

        const userId = req.user._id; 
        const {hotelId , checkIn , checkOut , guests} = req.body 

         const hotel = await Hotelmodel.findById(hotelId);
            if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
        
        const start = new Date(checkIn)
        const end = new Date(checkOut)

        // const days = Math.ceil((end - start) / (1000*60*60*24)) + 1
        // const totalPrice = hotel.price * guests * days 

    
        // const booking = new Bookingmodel({
        //     hotelId,userId,checkIn,checkOut,guests,totalPrice 
        // })
         const rooms = await RoomModel.find({ hotelId });
        let assignedRoom = null;

    for (const room of rooms) {
      let available = true;
      for (const booking of room.bookings) {
        if (!(end <= booking.checkIn || start >= booking.checkOut)) {
          available = false;
          break;
        }
      }
      if (available) {
        assignedRoom = room;
        break;
      }
    }

    if (!assignedRoom) {
      return res.status(400).json({ success: false, message: "No rooms available for these dates" });
    }
  
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalPrice = assignedRoom.price * guests * days;

    // Save booking
    const booking = new Bookingmodel({
      hotelId,
      userId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });
    await booking.save();

    
    assignedRoom.bookings.push({ bookingId: booking._id, checkIn: start, checkOut: end });
    hotel.availableRooms -= 1;
    await assignedRoom.save();
        
        res.status(200).json({success : true , message : "hotel booked successfully", booking })
     }

    catch(error){
        console.log(error)
         res.status(500).json({success : false , message : "Internal server error"} , error)
    }
}

export const getBooking = async(req , res) => {

     const {id} = req.params 
     try{
        const getBookings = await Bookingmodel.findById(id)
        if(!getBookings){
             res.status(404).json({success : false , message : "Booking slot not found"})
        }
        res.status(200).json({success : true , message : "Booking slot retrieved successfully"})
     }
     catch(error){
        console.log(error)
        res.status(500).json({sucess : false , message : "Internal server error"})
     }

}

export const getAllBookings = async(req , res) => {
    try {
        const getAllBookings = await Bookingmodel.find()
        if(!getAllBookings){
            res.status(404).json({success : false , message : "failed to retrived"})
        }
        res.status(200).json({success : true , message : "Your bookings retrieved successfully"})
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({sucess : false , message : "Internal server error"})
    }
}

export const deleteBooking = async(req , res)=>{
    const {id} = req.params 
    try {
        const deleteBooking = await Bookingmodel.findByIdAndDelete(id)
        if(!deleteBooking){
            res.status(404).json({success : false , message : "Booking is not found, cancellation failed"})
        }
        res.status(200).json({success : true , message : "Your booking cancelled successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({sucess : false , message : "Internal error server"})
    }
}

export const deleteBookings = async(req , res)=>{
    try {
        const removeBooking = await Bookingmodel.deleteMany({})
        res.status(200).json({success : true , message : "delete all bookings successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({sucess : false , message : "Internal error server"})
    }
}