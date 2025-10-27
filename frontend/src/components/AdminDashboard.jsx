import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [admins , setAdmins] = useState([])
  const [logOut , setLogOut] = useState(!!Cookies.get("adminToken"))
  const [hotelDetails , setHotelDetails] = useState([])
  const navigate = useNavigate()
  
  const stats = [
    { title: "Total Users", value: 120, color: "bg-blue-500" },
    { title: "Hotels Listed", value: 45, color: "bg-green-500" },
    { title: "Bookings", value: 320, color: "bg-yellow-500" },
  ];


    
     const onClickLogOut = () => {
         Cookies.remove("adminToken")
         setLogOut(false)
         
     }
    //  const token = Cookies.get("adminToken")
    //  console.log("Token: ",token)

     const onClickLogIn = () => {
       navigate('/adminlogin')
     }
 
    
     function fn(){
        async function fun() {
            const response = await fetch('http://localhost:3000/adminroute/getadmins')
            const data = await response.json()
            console.log(data)
            setAdmins(data.admin)
        }

        fun()
     }
     useEffect(fn , [])

      const adminId = Cookies.get("adminId")
      const findAdmin = admins.find((admin => admin._id === adminId))

     console.log(adminId)

    //  function fun(){
    //    async function fn(){
    //       const response = await fetch("http://localhost:3000/hotel/adminrooms")
    //       const data = await response.json()
    //       console.log(data.admin)
    //    }
    //     fn()
    //  }

    //  useEffect(fun,[])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="text-2xl font-bold p-6">Admin Panel</div> 
        <div>
          <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-5 ${
                activeTab === "dashboard" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z"/></svg>
            </li>
          <ul>

          <div className="flex-2">
             
              <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-4${
                activeTab === "users" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("users")}
            >Users
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
            </li>
        </div>
           <li
              className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2${
                activeTab === "hotels" ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveTab("hotels")}
            >Hotels
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M80 88C80 74.7 90.7 64 104 64L536 64C549.3 64 560 74.7 560 88C560 101.3 549.3 112 536 112L528 112L528 528L536 528C549.3 528 560 538.7 560 552C560 565.3 549.3 576 536 576L104 576C90.7 576 80 565.3 80 552C80 538.7 90.7 528 104 528L112 528L112 112L104 112C90.7 112 80 101.3 80 88zM288 176L288 208C288 216.8 295.2 224 304 224L336 224C344.8 224 352 216.8 352 208L352 176C352 167.2 344.8 160 336 160L304 160C295.2 160 288 167.2 288 176zM192 160C183.2 160 176 167.2 176 176L176 208C176 216.8 183.2 224 192 224L224 224C232.8 224 240 216.8 240 208L240 176C240 167.2 232.8 160 224 160L192 160zM288 272L288 304C288 312.8 295.2 320 304 320L336 320C344.8 320 352 312.8 352 304L352 272C352 263.2 344.8 256 336 256L304 256C295.2 256 288 263.2 288 272zM416 160C407.2 160 400 167.2 400 176L400 208C400 216.8 407.2 224 416 224L448 224C456.8 224 464 216.8 464 208L464 176C464 167.2 456.8 160 448 160L416 160zM176 272L176 304C176 312.8 183.2 320 192 320L224 320C232.8 320 240 312.8 240 304L240 272C240 263.2 232.8 256 224 256L192 256C183.2 256 176 263.2 176 272zM416 256C407.2 256 400 263.2 400 272L400 304C400 312.8 407.2 320 416 320L448 320C456.8 320 464 312.8 464 304L464 272C464 263.2 456.8 256 448 256L416 256zM352 448L395.8 448C405.7 448 413.3 439 409.8 429.8C396 393.7 361 368 320.1 368C279.2 368 244.2 393.7 230.4 429.8C226.9 439 234.5 448 244.4 448L288.2 448L288.2 528L352.2 528L352.2 448z"/></svg>
            </li>
            {logOut ? <button className="p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={onClickLogOut}>LogOut
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg>
            </button> : 
            <button className="p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={onClickLogIn}>Log In
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg>
            </button> 
            
            }
            
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded shadow text-white ${stat.color}`}
                >
                  <p className="text-xl">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <table className="min-w-full bg-white shadow rounded overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                
            {admins.map((each , index)=>(
            <tr key={each._id}>
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{each.user}</td>
              <td className="py-2 px-4">{each.email}</td>
              <td className="py-2 px-4">admin</td>
            </tr>
          ))}              
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === "hotels" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Hotels</h1>
            {/* <p>Hotel management section coming soon...</p> */}
            {findAdmin && findAdmin.hotel.length > 0 ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
             {findAdmin.hotel.map((each)=>(
              
                <div key={each._id}>
                  <img src={each.image} className='h-[180px] w-[250px] rounded-sm'/>
                  <h1 className='font-bold'>{each.name}</h1>
                  <p className='line-clamp-1'>{each.des}</p>
                  <h1 className="font-semibold">{each.city}</h1>
                 
                </div>
             
             ))}
             </div>
            ) 
          
            : 
             (<div>
               <p>No hotels found..</p>
              </div>)
              }
             
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
