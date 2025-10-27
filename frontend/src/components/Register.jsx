import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function Register() { 
    const navigate = useNavigate()
    // const [state , setState] = useState('Login')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [firstName , setFirstName] = useState('')
    const [lastName , setLastName] = useState('')
    
       
    const onChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    const onChangePassword = (e)=>{
        setPassword(e.target.value)
    }
    const onChangeLastName = (e)=>{
        setLastName(e.target.value)
    }
    const onChangeFirstName = (e)=>{
        setFirstName(e.target.value)
    }
    const navigateToLogin = ()=>{
        navigate('/login')
    }
    const goToHome = () => {
        navigate('/')
    }

    const onSubmitRegister = async(event) =>{
        event.preventDefault()
        
        
    try{
        const data = {
        firstName,
        lastName,
        email,
        password
    }
         let options = {
         method : "POST",
         headers : {
            "Content-Type" : "application/json",
             Accept : "application/json",
        },
         body : JSON.stringify(data)
    }
     const response = await fetch("http://localhost:3000/hotel/register" , options)
     const dataa = await response.json()
     console.log("Response : ",dataa)
     
    
     if(response.ok && dataa.success){
       
        // Cookies.set("userId" , dataa.addUser._id)
        // Cookies.set("email" , dataa.addUser.email)
        // console.log(userId)
        alert("Registation successfull!")
        navigate('/')
    }
    else{
        alert(dataa.message || "Registration failed")
    }
     }
     catch(e){
           console.log("Registration failed" , e)  
            alert("Registration failed, Please try again")
     }
}
        
  return (   
    <>
        <button  className='text-blue-700 text-xl font-semibold px-10 mt-3' onClick={goToHome}>BookYourStay</button>
        <form onSubmit={onSubmitRegister} className="flex flex-col gap-4 max-w-[500px] m-auto mt-2 items-start p-8 py-12 px-8 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Register 
                {/* {state === "login" ? "Login" : "Sign Up"} */}
            </p>
            <div className="w-full">
                <p>First name</p>
                <input onChange={onChangeFirstName} value={firstName} placeholder="Enter your first name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
            </div>
            <div className="w-full ">
                <p>Last Name</p>
                <input onChange={onChangeLastName} value={lastName} placeholder="Enter your last name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
            </div>
            <div className="w-full ">
                <p>Email</p>
                <input onChange={onChangeEmail} value={email} placeholder="Enter your email" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={onChangePassword} value={password} placeholder="Enter your password" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
                <p>
                    Already have an account? <span onClick={navigateToLogin} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                Create Account
            </button>
        </form>
  </>
)
 
 
 }

export default Register
