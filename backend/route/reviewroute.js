import { Router } from "express";
import { postReview , getReviews, deleteAllReviews , } from "../controller/reviewscontroller.js";
import { authorization } from "../middleware/authorization.js";



const reviewroute = Router()

reviewroute.post('/review' ,authorization, postReview)
reviewroute.get('/review/:id' , getReviews)
reviewroute.delete('/review' , deleteAllReviews)
export default reviewroute  