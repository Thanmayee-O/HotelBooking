import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hotelId: 
   
    { type: mongoose.Schema.Types.ObjectId,
      ref: "HotelCollection",
    }
  
  ,
 roomNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  maxGuests: {
    type: Number,
    default: 4,
  },
 bookings: [
  { 
  bookingId: {type : mongoose.Schema.Types.ObjectId, ref: "BookingCollection" } , 
  checkIn:Date , 
  checkOut : Date
}
]
});

export const RoomModel = mongoose.model("RoomCollection", roomSchema);
