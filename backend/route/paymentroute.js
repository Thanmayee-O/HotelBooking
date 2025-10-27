import { Router } from "express";
import { deletePayments, PaymentController } from "../controller/PaymentController.js";


const paymentRoute = Router()

paymentRoute.post('/payment' , PaymentController)
paymentRoute.delete('/payment' , deletePayments)

export default paymentRoute

