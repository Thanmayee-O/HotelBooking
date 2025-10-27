import {Router} from 'express'
import { viewBookings } from '../controller/viewbookings.js'
import { authorization } from '../middleware/authorization.js'

const viewbookings = Router()

viewbookings.get('/viewbookings' , authorization , viewBookings)


export default viewbookings 