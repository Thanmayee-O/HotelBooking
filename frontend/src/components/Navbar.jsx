import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { useState } from "react";

const Navbar = (props) => {
      const navigate = useNavigate()  
    
    const {registerFun , loginFun} = props
    const [login , setLogin] = useState(!!Cookies.get("jwtToken"))
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    const onRegister = ()=>{
      registerFun()
      navigate('/register')

    }
    const onLogin = ()=>{
      loginFun()
      navigate('/login')
      
    }
    const onLogout = () => {
      
      setLogin(Cookies.remove("jwtToken"))
      console.log("Cookies: ",Cookies.get("jwtToken"))
    }
   
   return(
  <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md fixed w-full z-50 top-0 left-0 animate-fadeInDown">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to='/' className="flex items-center space-x-3 group">
          
          <span className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-200">
            BookYourStay
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link 
            className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
            to='/'
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          >
            About
          </a>
          <Link 
            to='/rooms' 
            className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          >
            Rooms
          </Link>
          <Link 
            className="text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
            to='/viewbookings'
          >
            View Bookings
          </Link>
          
        </div>

        {/* Register Button - Desktop */}
        {/* <Link 
          className="hidden lg:block bg-white text-blue-600 px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105" 
          onClick={onRegister} 
          to='/register'
        >
          Register 
        </Link> */}
        {login ? 
            <button 
              className="hidden lg:block bg-white text-blue-600 px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105" 
              onClick={onLogout}
            >
              Logout
            </button> : 
            <button 
              className="hidden lg:block bg-white text-blue-600 px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105" 
              onClick={onLogin}
            >
              Login
            </button> 
          }

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="py-4 space-y-2">
          <Link 
            className="block text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
            to='/'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="block text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <Link 
            to='/rooms' 
            className="block text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Rooms
          </Link>
          <Link 
            className="block text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
            to='/viewbookings'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            View Bookings
          </Link>
          {login ? 
            <button 
              className="block w-full text-left text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
              onClick={() => {
                onLogout()
                setIsMobileMenuOpen(false)
              }}
            >
              Logout
            </button> : 
            <button 
              className="block w-full text-left text-white hover:bg-blue-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
              onClick={() => {
                onLogin()
                setIsMobileMenuOpen(false)
              }}
            >
              Login
            </button> 
          }
          <Link 
            className="block w-full bg-white text-blue-600 text-center px-4 py-3 rounded-full shadow-md hover:bg-blue-50 transition-all duration-200 font-semibold mt-2" 
            onClick={() => {
              onRegister()
              setIsMobileMenuOpen(false)
            }} 
            to='/register'
          >
            Register 
          </Link>
        </div>
      </div>
    </div>
  </nav>
   )
  };

export default Navbar