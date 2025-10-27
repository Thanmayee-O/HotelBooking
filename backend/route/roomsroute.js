import express from "express";
import { bookRoom, createRoomsForHotel, getRoomsByHotel } from "../controller/roomController.js";
import { authorization, verifyToken } from "../middleware/authorization.js";

const roomsroute = express.Router();

// Admin can view all rooms of a hotel
roomsroute.get("/:hotelId/getrooms", verifyToken, getRoomsByHotel);
roomsroute.post('/:hotelId/postrooms' , createRoomsForHotel)
roomsroute.post('/bookroom' ,authorization, bookRoom)
export default roomsroute;
