import { Hotelmodel} from "../model/hotelmodel.js";



export const getCity = async(req , res)=>{
    const {city} = req.params
    try{
        const cities = await Hotelmodel.find({city : {$regex : city , $options : "i"}}) 
        res.status(200).json({cities})
    }
    catch(err){
         res.status(500).json({error : "Failed to retrieve the data"})
    }
}

