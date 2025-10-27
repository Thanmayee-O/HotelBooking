import mongoose from "mongoose";

const payments = new mongoose.Schema({
    amount : {
        type : Number,
        required:true  

    },
    date : {
        type : String,
        required:true  
             
    },
    cardHolderName : {
        type : String,
        required:true  
        
    },
    cardnum : {
        type : String,
        required : true 
    },
    cardExpMonth : {
        type : String,
        required: true 
    },
    cardExpYear : {
        type : String,
        required: true 
    }
})

export const Payment = new mongoose.model("paymentCollection" , payments)