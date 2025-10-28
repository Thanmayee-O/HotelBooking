import { BrowserRouter, Routes , Route} from "react-router-dom"
import NotFound from "./components/NotFound"
import Rooms from "./components/Rooms"
import Bookings from "./components/Bookings"
import Login from "./components/Login"
import Home from "./components/Home"
import AdminRegister from "./components/adminRegister"
import AdminLogin from "./components/AdminLogin"
import Register from "./components/Register"
import CreateHotel from "./components/CreateHotel"
import HotelDetails from "./components/HotelDetails"
import SucessfulPage from "./components/SucessfulPage"
import CreateHotelDetails from "./components/CreateHotelDetails"
import Payment from "./components/Payment"
import ViewBookings from "./components/ViewBookings"
import { useState } from "react"
import AdminDashboard from "./components/AdminDashboard"
import EachCity from "./components/EachCity"
import Sample from "./components/sample"

function App(){
  const [totalPrice , setTotalPrice] = useState(0)

 return(
  
 
 
  <>
   <BrowserRouter>
   
    <Routes>
      <Route path='/sample' element={<Sample></Sample>}/>
    <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/' element={<Home/>}/>
     <Route path='/rooms' element={<Rooms/>}/>
     <Route path='/bookings' element={<Bookings/>}/>
     <Route path='/:city' element={<EachCity/>}/>
     {/* <Route path='/:id' element={<EachHotel/>}/> */}
     <Route path='/adminregister' element={<AdminRegister/>}/>
     <Route path='/adminlogin' element={<AdminLogin/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/hotel/:id' element={<HotelDetails totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
     <Route path='/success' element={<SucessfulPage/>}/>
     <Route path='/createhotel' element={<CreateHotel/>}/>
     <Route path='/createhoteldetails' element={<CreateHotelDetails/>}/>
     <Route path='/payment/:bookingid' element={<Payment totalPrice={totalPrice}/>}/>
     <Route path='/viewbookings' element={<ViewBookings></ViewBookings>}/>
    <Route path='*' element={<NotFound/>}/>
   </Routes>
   </BrowserRouter> 
  
   {/* <AdminRegister /> */}
   {/* <AdminLogin /> */}
    {/* <PostHotelDetails /> */}
</>
 )
}

export default App 




