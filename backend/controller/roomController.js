import { RoomModel } from "../model/roommodel.js";
import { Hotelmodel } from "../model/hotelmodel.js";

export const createRoomsForHotel = async (req, res) => {
  try {
    // existing hotel creation logic
    const {hotelId} = req.params 
    const hotel = await Hotelmodel.findById(hotelId)
     
    if(!hotel){
      res.status(404).json({success : false , message : "hotel not found"})
    }
    
    const existingRooms = await RoomModel.find({hotelId})
    if (existingRooms.length > 0) {
      return res.status(400).json({ success: false, message: "Rooms already exist for this hotel" });
    }
      const roomsToCreate = Array.from({ length: 10 }, (_, i) => ({
        roomNumber: i + 1,
        hotelId,
        maxGuests: 4,
        price: hotel.price,
        bookings: []
    }));

    const createdRooms = await RoomModel.insertMany(roomsToCreate);
    return res.status(200).json({
      success: true,
      message: "10 rooms created successfully",
      totalRooms: createdRooms.length,
      availableRooms: createdRooms.length,
      rooms: createdRooms
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const bookRoom = async(req , res) => {
  try {
    const {hotelId , roomNumber , bookingInfo} = req.body 
    const room = await RoomModel.findOne({ hotelId, roomNumber, isAvailable: true });
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not available" });
    }

     room.isAvailable = false;
    room.bookings.push(bookingInfo);
    await room.save();
    return res.status(200).json({ success: true, message: "Room booked successfully", room });
  } 
  catch (error) {
    console.log(error)
     res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const getRoomsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await RoomModel.find({ hotelId });

    if (rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this hotel" });
    }
    const availableRooms = rooms.filter(r => r.isAvailable).length;
    res.status(200).json({ success: true, availableRooms});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
