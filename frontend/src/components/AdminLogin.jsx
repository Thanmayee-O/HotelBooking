import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


function AdminLogin() {
    const port = "http://localhost:3000"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg , setErrorMsg] = useState(null)
    
    const navigate = useNavigate()
    function onChangeEmail(e){
        setEmail(e.target.value)
    }
    function onChangePassword(e){
        setPassword(e.target.value)
    }
    const goToHome = () => {
      navigate('/admindashboard')
    }
    const onNavigateToRegister = () => {
        navigate('/adminregister')
    }
    
    const adminLogin = async(event) =>{
        event.preventDefault()

        try {
           const data = {
                email,
                password
           }
           const options = {
              method : "POST",
              headers :{
                "Content-Type" : "application/json",
                 Accept : "application/json",
                 
              },
              body : JSON.stringify(data)
           } 
           const response = await fetch(`${port}/adminroute/login` , options)
           const dataa = await response.json()
           console.log(dataa)
        //    console.log("adminid: ",dataa.admin)
            
           
           if(dataa.token){
              localStorage.setItem("adminToken" , dataa.token)
              console.log(dataa.token)
           }
           if(response.ok){
              alert("Login successfull")
              navigate('/admindashboard')
            }
           else{
              setErrorMsg(dataa.message || "Invalid login credentials")
           }

           if (dataa.admin?._id) {
                 localStorage.setItem("adminId", dataa.admin._id)
           }   
           if(dataa.admin?.email){
                localStorage.setItem("adminEmail" , dataa.admin.email)
                
           }
           localStorage.getItem('adminId' , adminId)
           localStorage.getItem('adminEmail' , adminEmail)
           console.log(adminEmail)
           console.log(adminId)
        } 

        catch (error) {
            console.log(error)
            
        }
    }

  return (
    <>
    <button className='text-blue-700 text-xl font-semibold px-10 my-4' onClick={goToHome}>BookYourStay</button>
     <div>
        <form onSubmit={adminLogin} className="flex flex-col gap-4 mx-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">Admin</span> Login
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
                    Create an account? <span  onClick={onNavigateToRegister} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
                {errorMsg && <p className='text-red-500'>*{errorMsg}</p>}
             

            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer" >
                {/* {state === "register" ? "Create Account" : "Login"} */}Login
            </button>

        </form>

     </div>
    
      </>
  
  )
  }



export default AdminLogin