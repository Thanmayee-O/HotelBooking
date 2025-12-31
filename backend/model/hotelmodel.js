import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true 
    },
    images : {
        type : [String],
        default : []
    },
    des : {
        type : String,
        required : true 
    },
    city : {
        type : String,
        required : true 
    },
    price: {
        type :String,
         
    },
    address : {
            type: String,
    },
    
    admin : [
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : 'admincontroller'
        }
    ],
    
    availableRooms: {
    type: Number,
    default: 10, 
    },
    
})

export const Hotelmodel = new mongoose.model("HotelCollection" , hotelSchema)