import { Router } from "express";
import { deleteBookings, postBooking } from "../controller/bookingcontroller.js";
import { authorization } from "../middleware/authorization.js";
const bookingroute = Router()

bookingroute.post('/userbooking' , authorization ,  postBooking)
bookingroute.delete('/userbooking' , deleteBookings)

export default bookingroute
