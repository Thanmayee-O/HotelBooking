import {Router} from 'express'
import { createRoom, updateHotel , getHotelById , getHotels , deleteHotels, deleteOneHotel, getHotelsByAdmin} from '../controller/hotelController.js'
import {  verifyToken } from '../middleware/authorization.js'
import upload from '../middleware/multer.js'

const routes = Router()

// route.get('/rooms' , getRoom)


routes.post("/create", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 } 
  ]), verifyToken, createRoom);
// routes.get('/rooms' , getRoom)
routes.put('/rooms/:id' , upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 } 
  ]), verifyToken , updateHotel)   
routes.get('/rooms', getHotels);
routes.get('/adminrooms' ,  verifyToken  , getHotels)
routes.get("/rooms/:id", getHotelById);
routes.get("/admin/:id", getHotelsByAdmin);
routes.delete('/rooms' , deleteHotels);
routes.delete('/rooms/:id' , deleteOneHotel)
export default routes