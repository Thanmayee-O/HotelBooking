import express from 'express'
import {getRegisterUser, registerUser,deleteAllUsers } from '../controller/registercontroller.js'


const router = express.Router()
router.post('/register',registerUser)
router.get('/register' , getRegisterUser)
router.delete('/register' , deleteAllUsers)

export default router 