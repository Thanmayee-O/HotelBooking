import express from 'express'
import { createUser, getUser } from '../controller/logincontroller.js'

const route = express.Router()

route.post('/login' , createUser)
route.get('/login' , getUser)



export default route 