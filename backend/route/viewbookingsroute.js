import {Router} from 'express'
import { viewBookings , getAdminBookings} from '../controller/viewbookingsController.js'
import { authorization} from '../middleware/authorization.js'

const viewbookings = Router()

viewbookings.get('/viewbookings' , authorization , viewBookings)
viewbookings.get("/viewbookings/admin/:adminId",  getAdminBookings)
export default viewbookings 