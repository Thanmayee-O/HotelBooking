import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
function Login(props) {
  const port = "http://localhost:3000"
  const navigate = useNavigate()
  const location = useLocation()

  const [errorMsg, setErrorMsg] = useState('')
  const [state, setState] = useState('login')
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [showPass, setShowPass] = useState(false)
  const [click, setClick] = useState(true)

  const navigatetoRegister = () => {
    navigate('/register', { state: location.state })
  }
  const goToHome = () => {
    navigate('/')
  }
  const onChanges = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onShowPassword = () => {
    setShowPass(prev => !prev)
  }
  const payBut = () => {
    setClick(false)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form)
    }
    const response = await fetch(`${port}/hotel/login`, options)
    const dataa = await response.json()
    // console.log(dataa)

    if (dataa.token) {
      Cookies.set("jwtToken", dataa.token, { expires: 1 })
      // console.log(dataa.token)
    }
    if (dataa.getEmail?._id) {
      Cookies.set("userId", dataa.getEmail._id, { expires: 1 })
    }
    if (dataa.getEmail?.email) {
      Cookies.set("email", dataa.getEmail.email, { expires: 1 })
    }
    if (dataa.getEmail?.firstName) {
      Cookies.set("name", dataa.getEmail.firstName, { expires: 1 })
    }
    if (response.ok) {
      alert("Login successful!")
      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { state: location.state });
    }
    else {
      setErrorMsg(dataa.error)
    }

  }


  const isModal = typeof props.setLogin === 'function'

  return (
    <>
      <div className={isModal ? 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn' : 'min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-slate-50 pt-24 pb-12 px-4'}>
        {/* Full-screen Background & Navbar details (only if not a modal inside Home) */}
        {!isModal && (
          <>
            {/* Top Navbar matching the rest of the website */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md h-16 w-full fixed top-0 left-0 z-30 flex items-center px-6 justify-between animate-fadeInDown">
              <button 
                className="flex items-center gap-2 text-white hover:text-blue-100 text-xl font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                onClick={goToHome}
              >
                <span className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg border border-white/20 shadow-inner">🏨</span>
                <span>BookYourStay</span>
              </button>
              <div className="hidden sm:block text-white/95 text-sm font-semibold tracking-wide">
                Welcome to BookYourStay
              </div>
            </div>

            {/* Light hotel/travel-themed background */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.35] z-0 scale-105 transition-transform duration-1000"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80')` }}
            />
            {/* Soft white/light-blue overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-blue-50/70 to-white/80 backdrop-blur-[2px] z-0" />
            
            {/* Animated soft gradient blobs */}
            <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-200/30 blur-[80px] animate-pulse z-0" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[15%] right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-100/30 blur-[80px] animate-pulse z-0" style={{ animationDuration: '12s' }} />
          </>
        )}

        {/* Modal Close Button (only if modal inside Home) */}
        {isModal && (
          <button 
            onClick={() => props.setLogin(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full border border-slate-200 transition-all duration-200 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Form Card */}
        <form 
          onSubmit={onSubmit} 
          className="relative z-10 flex flex-col gap-5 w-full max-w-[400px] bg-white border border-slate-100 shadow-2xl p-8 sm:p-10 text-slate-600 rounded-2xl animate-fadeInUp"
          style={{ animationDuration: '0.6s' }}
        >
          <div className="text-center mb-2">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to continue your booking
            </p>
          </div>

          <div className="w-full">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
            <input 
              onChange={onChanges} 
              name="email" 
              value={form.email} 
              placeholder="name@example.com" 
              className="bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl w-full p-3 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300" 
              type="email" 
              required 
            />
          </div>

          <div className="w-full">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Password</label>
            <div className='relative w-full'>
              <input 
                onChange={onChanges} 
                name="password" 
                value={form.password} 
                placeholder="••••••••" 
                className="bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl w-full p-3 pr-11 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300" 
                type={showPass ? "text" : "password"} 
                required 
              />
              <button 
                type="button"
                onClick={onShowPassword} 
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200'
              >
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-slate-500">
              New user?{' '}
              <span 
                onClick={navigatetoRegister} 
                className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition-colors duration-200"
              >
                Create account
              </span>
            </span>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs flex items-center gap-2 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit" 
            onClick={payBut}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/10 transition-all duration-300 active:scale-[0.98] cursor-pointer mt-2 flex items-center justify-center gap-2"
          >
            {!click ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login


