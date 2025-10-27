import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'


dotenv.config()

const cloudinaryconnection = async()=>{
       cloudinary.config({
          cloud_name : process.env.CLOUDINARY_NAME,
          api_key : process.env.CLOUDINARY_API_KEY,
          api_secret : process.env.CLOUDINARY_SECRET_KEY
       })
}

console.log({
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY ? "✅ Loaded" : "❌ Missing",
});
export default cloudinaryconnection