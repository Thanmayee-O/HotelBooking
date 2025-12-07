import React, { useState } from "react";
import Navbar from "./Navbar";
import HomeRooms from "./HomeRooms";
import Login from './Login'
import BookNow from "./Register";
import Register from "./Register";

const Home = () =>{
     
    const [register , setRegister] = useState(false)
    const [login , setLogin] = useState(false)
    
    const registerFun = ()=>{
      setRegister(true)
      setLogin(false)
    }
    const loginFun = () =>{
      setLogin(true)
      setRegister(false)
    }
  return(
    
  <div className="font-pt-sans bg-gray-50 min-h-screen relative">
    <Navbar registerFun={registerFun} loginFun={loginFun}/>
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  to-blue-200 pt-32 animate-fadeIn">
    <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/26/fe/d9/26fed92debb8545b462cc4475e7c98c7.jpg')] bg-cover bg-center opacity-40"></div>
    <div className="relative z-10 text-center max-w-2xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 drop-shadow animate-slideInDown">
        Discover Your Next <span className="text-blue-600">Stay</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fadeInUp">
        Book luxury hotels at the best prices. Experience comfort, elegance,
        and world-class service.
      </p>
      
    </div>
  </div>
     <div className="absolute top-[6%] left-[33%]">
        {register && <Register setRegister={setRegister}/>}
       </div>
      <div className="absolute top-[9%] left-[35%]">
        {login && <Login setLogin={setLogin}/>}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 animate-fadeUp mt-8" id="about">
        <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
            <img className="max-w-md w-full object-cover rounded-2xl"
                src="https://i.pinimg.com/736x/42/fc/9a/42fc9a8383520d0c0ef509074c493623.jpg"
                alt="image" />
      </div>

        <div className="text-sm text-slate-600 max-w-lg">
            <h1 className="text-xl uppercase font-semibold text-slate-700">What we do?</h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
            <p className="mt-8 text-md"><span className="font-bold text-md">BookYourStay</span> is an innovative hotel booking platform designed to make finding and reserving accommodation simple, fast, and reliable </p>
            <p className="mt-4">With an easy-to-use interface, real-time availability, and secure booking options, BookYourStay ensures a smooth experience for every user. Hotel owners can manage rooms, pricing, and availability effortlessly through the admin dashboard, while guests can explore detailed hotel descriptions, images, and reviews before booking.</p>
            <p className="mt-4">Whether you’re traveling for business or leisure, BookYourStay makes your hotel search smarter, your booking quicker, and your stay more comfortable.</p>
            
        </div>
    </div>

      <HomeRooms/>
      </div>
      
    <style>
      {`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
          0% { opacity: 0; transform: translateY(-50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
        .animate-fadeInDown { animation: fadeInDown 1s ease forwards; }
        .animate-slideInDown { animation: slideInDown 1s ease forwards; }
        .animateregister-fadeInDown { animation : fadeInDown 0.3s ease forwards;}
      `}
      
    </style>
  </div>

   
  )
}

export default Home 




