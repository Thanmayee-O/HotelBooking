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
  <nav className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg fixed w-full z-50 top-0 left-0 animate-fadeInDown">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to='/' className="flex items-center space-x-2 group">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white group-hover:text-blue-200 transition-colors duration-200">
            <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
            <path fillRule="evenodd" d="M20.25 10.332v9.918h-7.5v-5.508a3 3 0 00-3 0v5.508h-7.5V10.332c0-.299.065-.59.192-.849L12 15.88l7.058-6.397a2.25 2.25 0 00.192.849zm-7.5 0v5.508a3 3 0 003.75 2.645v4.272a.75.75 0 01-.75.75H3a.75.75 0 01-.75-.75v-4.272a3 3 0 001.5-2.645V10.332a2.25 2.25 0 01.442-1.355l6-5.432 6 5.432a2.25 2.25 0 01.442 1.355z" clipRule="evenodd" />
          </svg>
          <span className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-200">
            BookYourStay
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link 
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
            to='/'
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          >
            About
          </a>
          <Link 
            to='/rooms' 
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          >
            Rooms
          </Link>
          <Link 
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
            to='/viewbookings'
          >
            View Bookings
          </Link>
          {login ? 
            <button 
              className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
              onClick={onLogout}
            >
              Logout
            </button> : 
            <button 
              className="text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 font-medium" 
              onClick={onLogin}
            >
              Login
            </button> 
          }
        </div>

        {/* Register Button - Desktop */}
        <Link 
          className="hidden lg:block bg-white text-blue-600 px-6 py-2.5 rounded-full shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-200 font-semibold transform hover:scale-105" 
          onClick={onRegister} 
          to='/register'
        >
          Register 
        </Link>

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
            className="block text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
            to='/'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="block text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <Link 
            to='/rooms' 
            className="block text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Rooms
          </Link>
          <Link 
            className="block text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
            to='/viewbookings'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            View Bookings
          </Link>
          {login ? 
            <button 
              className="block w-full text-left text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
              onClick={() => {
                onLogout()
                setIsMobileMenuOpen(false)
              }}
            >
              Logout
            </button> : 
            <button 
              className="block w-full text-left text-white hover:bg-blue-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium" 
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