import { Router } from "express";
import { postReview , getReviews, deleteAllReviews, deleteById} from "../controller/reviewscontroller.js";
import { authorization } from "../middleware/authorization.js";



const reviewroute = Router()

reviewroute.post('/review' ,authorization, postReview)
reviewroute.get('/review/:id' , getReviews)
reviewroute.delete('/review' , deleteAllReviews)
reviewroute.delete('/deletereview/:id' , authorization , deleteById)
export default reviewroute  