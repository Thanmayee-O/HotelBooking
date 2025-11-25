import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ViewBookings = () => {
    const port = "https://hotelbooking-fcz6.onrender.com"
    const [bookings, setBookings] = useState([]);
    const [errorMsg , setErrorMsg] = useState('')
    const [loading , setLoading] = useState(false)
       
  const navigate = useNavigate()
       const jwt = Cookies.get("jwtToken")
       console.log(jwt)
       
      function fun(){
        async function fn(){
            try{
              setLoading(true)
            const opt = {
              method: "GET",
              headers:{
                "Content-Type" : "application/json",
                Accept : "application/json",
                Authorization : `Bearer ${jwt}`
              }
            }
            const response = await fetch(`${port}/hotels/viewbookings`, opt)
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
            
          
          }
          catch(error){
           console.log(error)
         }
         finally{
            setLoading(false)
         }          
        }
        fn()
      }
     useEffect(fun , [jwt])
   
    function onClickBack(){
        navigate('/')
    }

  return (
    loading ? 
      <div className="flex justify-center items-center min-h-screen bg-white">
          <ClipLoader color="#2563eb" size={50} />
      </div>
   : 
    <>
    {errorMsg ? 
    <div className="text-center font-semibold text-2xl flex flex-row justify-center items-center h-screen">
      <p>Oops! bookings are not found</p>
    </div>
      :
      
      <>
       <div className='flex flex-row text-blue-700 ml-3 bg-gray-100 pt-5 pb-1'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-7 w-7 pt-1 pr-1 pl-2' fill="blue">
      <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
    <button className='text-lg' onClick={onClickBack}>Back</button>
    </div>
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
              className="w-full h-50 object-cover rounded-xl mb-4"
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
            {/* <p
              className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                each.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : each.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {each.status}
            </p> */}
          </div>
          
        ))}
      </div>
    </div>
    </>
   }
     </> 
  );

};

export default ViewBookings;
