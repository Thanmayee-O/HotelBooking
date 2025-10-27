import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectdb } from './config/logindb.js'
import route from './route/loginroute.js'
import routes from './route/hotelroute.js'
import cors from 'cors'
import router from './route/registeroute.js'
import citiesroute from './route/citiesroute.js'
import reviewroute from './route/reviewroute.js'
import adminRoute from './route/adminroute.js'
import cloudinaryconnection from './cloudinary.js'
import bookingroute from './route/bookingroute.js'
import paymentRoute from './route/paymentroute.js'
import viewbookings from './route/viewbookings.js'
import roomsroute from './route/roomsroute.js'

const app = express()

 
dotenv.config()



app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors())


cloudinaryconnection()

const port = process.env.PORT || 8000
const URI = process.env.MONGO_URI 

async function start(){
    try{
        await connectdb(URI)
        app.listen(port,()=>{
        console.log("Server has started at port num 3000")
        }) 
    }
    catch(err){
        console.log("Connection failed")
        console.log(err)
    }
}

start()

app.use('/hotel' , route)
app.use('/hotel', routes)
app.use('/hotel' , router)
app.use('/hotel',citiesroute)
app.use('/adminroute' , adminRoute)
app.use('/hotel' , bookingroute)
app.use('/hotel' , reviewroute)
app.use('/hotel' , paymentRoute)
app.use('/hotels' , viewbookings)
app.use('/adminroute' ,roomsroute)