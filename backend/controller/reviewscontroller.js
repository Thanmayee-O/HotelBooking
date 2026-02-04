import { Review } from "../model/reviewsmodel.js";



export const postReview = async(req , res)=>{
    
    const {hotelId , review , createdAt , rating  } = req.body 
    
    
   try{
      const newReview = new Review({
        hotelId,
        userId : req.user._id,
        review,
        createdAt,
        rating,
        
      })
      await newReview.save() 
      await newReview.populate("userId" , "firstName email")
      return res.status(201).json({success : true , message : "Review added successfully" , review : newReview})
    } 
   catch (error) {
        console.log(error)
        res.status(500).json({success : false , message : "Internal server error"})

   }

    
}

export const getReviews = async (req, res) => {
  try {
    const { id } = req.params; // hotelId
    const reviews = await Review.find({ hotelId: id }).sort({ createdAt: -1 }).populate("userId","firstName email")
    console.log("fetched review : ",reviews)
    res.status(200).json({ reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};


export const deleteAllReviews = async(req , res) => {
    try {
        const removeReviews = await Review.deleteMany({}) 
        res.status(200).json({success : true , message : "reviews deleted successfully"})
     } 
    catch (error) {
      console.log(error)
      res.status(400).json({success : false , message : "reviews deletetion failed"})
    }
  
}
export const deleteById = async(req,res)=>{
    const {id} = req.params 

  try {
    if(!id){
      res.status(404).json({success:false , message : "id not found"})
    }
    const deleteReview = await Review.findByIdAndDelete(id);
    res.status(200).json({success : true , message : "review deleted successfully" , deleteReview})

    
  } catch (error) {
     console.log(error)
     res.status(500).json({success : false , message : "Internal server error"})
  }
}