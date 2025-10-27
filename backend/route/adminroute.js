import { Router } from "express";
import { createAdminLogin, createAdminRegister , deleteAdmin, getAdmins , deleteAdmins} from "../controller/adminregcontroller.js";


const adminRoute = Router();

adminRoute.post('/register' , createAdminRegister)
adminRoute.post('/login'  , createAdminLogin)
adminRoute.get('/getadmins' , getAdmins)
adminRoute.delete("/delete" , deleteAdmin)
adminRoute.delete("/deleteadmins" , deleteAdmins)


export default adminRoute 