import { User } from "../model/usermodel.js";
import { Hotelmodel } from "../model/hotelmodel.js";

export const addingController = async(req , res)=>{

   try{   
    const {id} = req.params
    const {email} = req

    const findRoom = await Hotelmodel.findById(id);
    const data = await User.find({email})

    data.hotels.push(findRoom)
    await data.save()

    res.status(200).json({message : "rooms added successfully"})
    }
    
    catch(e){
        res.status(500).json({e : "rooms added failed"})
    }

}


