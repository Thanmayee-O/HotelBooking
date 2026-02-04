import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function Login(props) { 
    const port = "https://hotelbooking-fcz6.onrender.com"
    const navigate = useNavigate()

    const [errorMsg , setErrorMsg] = useState('')
    const [state , setState] = useState('login')
    const [form , setForm] = useState({
      email : "",
      password : ""
    })
    const [showPass , setShowPass] = useState(false)
    const [click , setClick] = useState(true)
   
    const navigatetoRegister = () =>{
         navigate('/register')
    }
    const goToHome = () =>{
      navigate('/')
    }
    const onChanges = (e) =>{
      setForm(prev => ({...prev , [e.target.name] : e.target.value}))
    }
    const onShowPassword = () =>{
      setShowPass(prev=>!prev)
    }
    const payBut = () => {
      setClick(false)
    }
    const onSubmit = async(event)=>{
        event.preventDefault()
        let options = {
            method : "POST",
            headers : {
              "Content-Type" : "application/json",
              "Accept" : "application/json"             
            },
            body : JSON.stringify(form)
        }
      const response = await fetch(`${port}/hotel/login`, options)
      const dataa = await response.json()
      // console.log(dataa)

      if(dataa.token){
        Cookies.set("jwtToken" , dataa.token , {expires : 1})
        // console.log(dataa.token)
      }
      if (dataa.getEmail?._id){
          Cookies.set("userId" , dataa.getEmail._id, {expires : 1})
      }
     if(dataa.getEmail?.email){
        Cookies.set("email" , dataa.getEmail.email , {expires : 1})
     }
     if(dataa.getEmail?.firstName){
        Cookies.set("name", dataa.getEmail.firstName , {expires:1})
     }
      if(response.ok){
        alert("Login successful!")
        navigate('/')
      }
      else{
        setErrorMsg(dataa.error)
      }

}
    
          
  return (
    <>
    <div className='h-100 '>
      <button className='text-blue-700 text-xl font-semibold px-10 my-4' onClick={goToHome}>BookYourStay</button>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 mx-auto mt-30 sm:mt-3 xl:mt-9  items-start p-8 py-12  w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Login
            </p>
            <div className="w-full">
                <p>Email</p>
                <input onChange={onChanges} name="email" value={form.email} placeholder="Enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <div className='relative w-full'>
                <input onChange={onChanges} name="password" value={form.password} placeholder="Enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type={showPass ?"text" : "password"} required />
                {showPass ? 
                <button onClick={onShowPassword} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
           </button>:
                <button onClick={onShowPassword} className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                  </button>
               }
               </div> 

            </div>
                <p>
                    Create an account? <span onClick={navigatetoRegister} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
             {errorMsg && (<p className='text-red-500'>*{errorMsg}</p>)}

            <button
               type="submit" onClick = {payBut}
               className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            {click ? "Login" : "Logging in....."}
          </button>
        </form>
     </div>
    </>
  )
}

export default Login
