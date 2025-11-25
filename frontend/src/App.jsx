import { BrowserRouter, Routes , Route} from "react-router-dom"
import NotFound from "./components/NotFound"
import Rooms from "./components/Rooms"
import Login from "./components/Login"
import Home from "./components/Home"
import AdminRegister from "./components/AdminRegister"
import AdminLogin from "./components/AdminLogin"
import Register from "./components/Register"
import CreateHotel from "./components/CreateHotel"
import HotelDetails from "./components/HotelDetails"
import SucessfulPage from "./components/SucessfulPage"
import Payment from "./components/Payment"
import ViewBookings from "./components/ViewBookings"
import { useState } from "react"
import AdminDashboard from "./components/AdminDashboard"
import EachCity from "./components/EachCity"
import HomeRooms from "./components/HomeRooms"


function App(){
  const [totalPrice , setTotalPrice] = useState(0)

 return(
  
  <>
   <BrowserRouter>
     <Routes>
      <Route path='/admindashboard' element={<AdminDashboard></AdminDashboard>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/homerooms' element={<HomeRooms></HomeRooms>}/>
      <Route path='/rooms' element={<Rooms/>}/>
      <Route path='/adminregister' element={<AdminRegister/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/hotel/:id' element={<HotelDetails totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>}/>
      <Route path='/success' element={<SucessfulPage/>}/>
      <Route path='/createhotel' element={<CreateHotel/>}/>
      <Route path='/payment/:bookingid' element={<Payment totalPrice={totalPrice}/>}/>
      <Route path='/viewbookings' element={<ViewBookings></ViewBookings>}/>
      <Route path='/each/:city' element={<EachCity/>}/>
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




