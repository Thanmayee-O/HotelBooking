import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function Login(props) { 
    const port = "http://localhost:3000"
   const navigate = useNavigate()

    const [errorMsg , setErrorMsg] = useState('')
    const [state , setState] = useState('login')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
   
    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    const onChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const navigatetoRegister = () =>{
         navigate('/register')
    }
    const goToHome = () =>{
      navigate('/')
    }

    const onSubmit = async(event)=>{
        event.preventDefault()
        const data = {
         email,
         password
      } 
      let options = {
          method : "POST",
          headers : {
             "Content-Type" : "application/json",
             "Accept" : "application/json"             
          },
          body : JSON.stringify(data)
      }
      const response = await fetch(`${port}/hotel/login`, options)
      const dataa = await response.json()
      console.log(dataa)

      if(dataa.token){
        Cookies.set("jwtToken" , dataa.token , {expires : 1})
        console.log(dataa.token)
      }
      if (dataa.getEmail?._id){
          Cookies.set("userId" , dataa.getEmail._id, {expires : 1})
          console.log("userid : " ,dataa.getEmail._id)
      }
     if(dataa.getEmail?.email){
        Cookies.set("email" , dataa.getEmail.email , {expires : 1})
        console.log("email: ", dataa.getEmail.email)
     }
     if(dataa.getEmail?.firstName){
        Cookies.set("name", dataa.getEmail.firstName , {expires:1})
        console.log("name: " , dataa.getEmail.firstName)
     }
      if(response.ok){
        alert("Login successfull!")
        // Cookies.set("details" , dataa.getEmail._id , {expires : 1})
        // console.log(dataa.getEmail._id)
        navigate('/')
      }
      else{
        setErrorMsg(dataa.error)
      }

}
    
          
  return (
    <>
    <div className='h-100 '>
     {/* <form onSubmit={onSubmit} className='flex flex-col'>
         <h1 className='text-center font-bold text-blue-700 text-xl'>Login</h1>
        <label htmlFor="email" className='mt-1 text-blue-700 pt-1 font-semibold'>Email</label>
        <input type="email" value={email} onChange={onChangeEmail} className='border-2 rounded-sm mt-1 w-[20vw]'/>
        <label htmlFor="password" className='mt-2 text-blue-700 pt-1 font-semibold'>Password</label>
        <input type="password" value={password} onChange={onChangePassword} className='border-2 rounded-sm mt-1'/>
        <button type="submit" className={`rounded-md px-2 py-2 mt-4 ${password === "" || email==="" ? "bg-gray-200" : "bg-blue-700 text-[#ffffff]"}`}>Login</button>
      </form> */}
      <button className='text-blue-700 text-xl font-semibold px-10 my-4' onClick={goToHome}>BookYourStay</button>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 mx-auto mt-30 sm:mt-3 xl:mt-9  items-start p-8 py-12  w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Login
                {/* {state === "login" ? "Login" : "Sign Up"} */}
            </p>
            <div className="w-full">
                <p>Email</p>
                <input onChange={onChangeEmail} value={email} placeholder="Enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={onChangePassword} value={password} placeholder="Enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
                <p>
                    Create an account? <span onClick={navigatetoRegister} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
             {errorMsg && (<p className='text-red-500'>*{errorMsg}</p>)}

            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer" >
                {/* {state === "register" ? "Create Account" : "Login"} */}Login
            </button>
        </form>
     </div>
    </>
  )
}

export default Login
