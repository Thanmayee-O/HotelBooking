import mongoose from "mongoose";
import { hotelAdmin } from "../model/hoteladmin.js";
import { Hotelmodel} from "../model/hotelmodel.js";
import {v2 as cloudinary} from 'cloudinary'
import cloudinaryconnection from "../cloudinary.js";
import { RoomModel } from "../model/roommodel.js";


export const createRoom = async(req , res)=>{
  
     try{
       
        await cloudinaryconnection()

        const {name , des , city , price , address} = req.body
        const adminId = req.adminId 
        console.log("Body:" , req.body)

        
        const image = req.files["image"] ? req.files["image"][0] : null;
        const images = req.files["images"] || []
        console.log(images)
        console.log(image)

        // console.log(image)
        if(!name || !des || !city || !adminId || !image || !price || !address ||!images){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingHotel = await Hotelmodel.findOne({ name: name, city: city });
    if (existingHotel) {
      return res.status(400).json({ message: "Hotel already exists" });
    }

      const result = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      });
        const imageUrls = []

        if (images.length > 0) {
      for (const img of images) {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image", 
        });
        imageUrls.push(result.secure_url);
      }
    }
        
        // const image = req.file? req.file.filename : undefined;
        const admin = await hotelAdmin.findById(adminId)
        if(!admin){
            return res.status(404).json({message:"admin not found"})
        }
        const hotel = new Hotelmodel({
            name , image : result.secure_url , des ,city ,  admin:adminId, price , address, images: imageUrls,
            date :  Date.now()
        })

        const savedHotel = await hotel.save()        
        admin.hotel.push(savedHotel)
        
        await admin.save()
        return res.status(200).json({success : true , message:"Hotel added successfully" , hotel})
        
    }catch(error){
            console.log(error)
            res.status(500).json("Internal server error")
    }
}

export const getHotels = async (req, res) => {
  try {
    
    const hotels = await Hotelmodel.find().populate("admin", "user email");
    res.status(200).json({
      message: "Fetched all hotels successfully",
      hotels
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};

export const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotelmodel.findById(id).populate("admin", "user email");

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json({
      message: "Fetched hotel successfully",
      hotel
    });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};



// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    await cloudinaryconnection()
    
    const { id } = req.params;  // hotel id from URL
    const { name, des , city , address , price } = req.body;
    
    // Get files from req.files object
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const additionalImages = req.files["images"] || [];

    // Find the hotel and check if it exists
    const hotel = await Hotelmodel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Update fields if provided
    if (name) hotel.name = name ;
    if (des) hotel.des = des;
    if (city) hotel.city = city;
    if (address) hotel.address = address
    if (price) hotel.price = price 

    // Handle main image upload
    if (imageFile) {
      const result = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      hotel.image = result.secure_url;
    }

    // Handle additional images upload
    if (additionalImages && additionalImages.length > 0) {
      const imageUrls = [];
      for (const img of additionalImages) {
        const result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image", 
        });
        imageUrls.push(result.secure_url);
      }
      
      // Append new images to existing ones
      if (hotel.images && hotel.images.length > 0) {
        hotel.images = [...hotel.images, ...imageUrls];
      } else {
        hotel.images = imageUrls;
      }
    }
    
    const updatedHotel = await hotel.save();

    res.status(200).json({
      message: "Hotel updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};


export const deleteHotels = async(req , res)=>{
  try {
      const removeHotels = await Hotelmodel.deleteMany({}) 
      res.status(200).json({success : true , message : "hotels deleted successfully"})
   } 
  catch (error) {
    console.log(error)
    
    res.status(400).json({success : false , message : "hotels deletetion failed"})
  }
}

export const deleteOneHotel = async(req , res)=>{
     const {id} = req.params 
     console.log(id) 
  try{

    const deleteHotel = await Hotelmodel.findByIdAndDelete(id)
    if(!deleteHotel){
      return res.status(404).json({success : false , message : "hotel not found, deletion failed"})
    }
    const updating = await hotelAdmin.updateMany(
      { hotel : id },             // find admins that have this hotel
      { $pull: { hotel: id } }   // remove it from their hotels array
    );
    console.log("update result:", updating);
    return res.status(200).json({success : true , message:"hotel deleted successfully"})
  }
  catch(error){
    console.log(error)
    
    return res.status(400).json({success : false , message : "hotels deletetion failed"})
  }
}

export const getHotelsByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = id;
    
    const hotels = await Hotelmodel.find({ admin: adminId }).populate("admin", "user email");
    
    res.status(200).json({
      message: "Fetched hotels successfully",
      hotels
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ err: "Internal server error" });
  }
};

