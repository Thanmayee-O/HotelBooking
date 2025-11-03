import express from "express";
import { bookRoom, createRoomsForHotel, deleteRoomByHotel, deleteRooms, getRoomsByHotel } from "../controller/roomController.js";
import { authorization, verifyToken } from "../middleware/authorization.js";

const roomsroute = express.Router();

// Admin can view all rooms of a hotel
roomsroute.get("/:hotelId/getrooms", verifyToken, getRoomsByHotel);
roomsroute.post('/:hotelId/postrooms' , createRoomsForHotel)
roomsroute.post('/bookroom' ,authorization, bookRoom)
roomsroute.delete('/deleterooms' , deleteRooms)
roomsroute.delete('/:id/deletehotelroom' , deleteRoomByHotel)
export default roomsroute;
