import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"
import Loader from "./Loader";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [errorMsg , setErrorMsg] = useState('')
  const [loading , setLoading] = useState(true)
       
       const jwt = Cookies.get("jwtToken")
       console.log(jwt)
       
      function fun(){
          async function fn(){
            const opt = {
              method: "GET",
              headers:{
                "Content-Type" : "application/json",
                Accept : "application/json",
                Authorization : `Bearer ${jwt}`
              }
            }
            const response = await fetch('http://localhost:3000/hotels/viewbookings', opt)
            const data = await response.json()
            console.log(data)
            
             
            if(!data.success){
              setErrorMsg("Bookings not found")
              setBookings([])
              
            } 
            else{
              setBookings(data.getBookings)
              setErrorMsg("")
            }
            setLoading(false)
          }
          fn()
      }
     useEffect(fun , [])
   
     if(loading){
        return(
          <Loader loading={loading}/>
        )
     }
   

  return (
    <>
    {errorMsg ? 
    <div className="text-center font-semibold text-2xl flex flex-row justify-center items-center h-screen">
      <p>Oops! bookings are not found</p>
    </div>
      :
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((each) => (
          <div
            key={each._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <img
              src={each.hotelId[0]?.image}
              alt="Hotel"
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {each.hotelId[0]?.name}
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Check-In:</strong> {each.checkIn.toString().slice(0,10)}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Check-Out:</strong> {each.checkOut.toString().slice(0,10)}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              <strong>Guests:</strong> {each.guests}
            </p>
            <p
              className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                each.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : each.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {each.status}
            </p>
          </div>
          
        ))}
      </div>
    </div>
   }
     </> 
  );

};

export default ViewBookings;
