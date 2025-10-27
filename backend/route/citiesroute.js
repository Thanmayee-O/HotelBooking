import { Router } from "express";
import {getCity} from "../controller/citiesController.js";


const citiesroute = Router()

citiesroute.get('/:city' , getCity)


export default citiesroute