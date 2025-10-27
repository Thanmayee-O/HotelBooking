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
    
  <div className="font-sans bg-gray-50 min-h-screen relative">
    <Navbar registerFun={registerFun} loginFun={loginFun}/>
    <div>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br via-white to-blue-200 pt-32 animate-fadeIn">
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
     
      <div id="about" className="py-20 bg-white animate-fadeInUp">
    <div className="max-w-4xl mx-auto px-6 text-center animate-fadeInUp">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">About BookYourStay</h2>
      <p className="text-gray-600 text-lg">
        BookYourStay is your trusted partner for booking the finest hotels around
        the world. Our platform offers a seamless experience, exclusive deals,
        and 24/7 customer support to make your stay unforgettable.
      </p>
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




