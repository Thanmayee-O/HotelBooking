import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'

function AdminRegister() {
    const [username,  setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    function onChangeUserName(e){
        setUsername(e.target.value)
    }
    function onChangeEmail(e){
        setEmail(e.target.value)
    }
    function onChangePassword(e){
        setPassword(e.target.value)
    }
    const goToHome =  () => {
        navigate('/')
    }
    const onNavigateToLogin = () => {
      navigate('/adminlogin')
    }
    const adminRegister = async(event) => {
          event.preventDefault()
          try {
             const data = {
                user:username,
                email,
                password
             }
             let options = {
                 method : "POST",
                 headers : {
                    "Content-Type" : "application/json",
                     Accept : "application/json"
                 },
                 body : JSON.stringify(data)
             }
             const response = await fetch("http://localhost:3000/adminroute/register" , options)
             const dataa = await response.json()
             console.log("response : " , dataa)

             if(response.ok){
                alert("Registration successfull")
             }

          } 
          
          catch (error) {
              console.log(error)
          }

    }

  return (
    <div >
      <button className='text-blue-700 text-xl font-semibold px-10 mt-3' onClick={goToHome}>BookYourStay</button>
        <form onSubmit={adminRegister} className="flex flex-col gap-4 max-w-[500px] m-auto mt-2 items-start p-8 py-12 px-8 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">Admin</span> Register 
                {/* {state === "login" ? "Login" : "Sign Up"} */}
            </p>
            <div className="w-full">
                <p>User name</p>
                <input onChange={onChangeUserName} value={username} placeholder="Enter your name" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
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
                    Already have an account? <span onClick={onNavigateToLogin} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                Create Account
            </button>
        </form>
    </div>
  )
}

export default AdminRegister