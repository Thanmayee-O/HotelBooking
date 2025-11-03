// import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [admins , setAdmins] = useState([])
  
//   const [logOut , setLogOut] = useState(!!localStorage.getItem("adminToken"))
//   const [bookings , setBookings] = useState([]) 
//   const navigate = useNavigate()
//   const [loading , setLoading] = useState(false)
  
//   const stats = [
//     { title: "Total Users", value: 120, color: "bg-blue-500" },
//     { title: "Hotels Listed", value: 45, color: "bg-green-500" },
//     { title: "Bookings", value: 320, color: "bg-yellow-500" },
//   ];


    
//      const onClickLogOut = () => {
//          localStorage.removeItem("adminToken")
//          setLogOut(false)
         
//      }
//     //  const token = Cookies.get("adminToken")
//     //  console.log("Token: ",token)

//      const onClickLogIn = () => {
//        navigate('/adminlogin')
//      }
 
//       const adminId = localStorage.getItem("adminId")
//       const findAdmin = admins.find((admin => admin._id === adminId))
//       const adminEmail = localStorage.getItem("adminEmail")
//       console.log(adminEmail)
//       // console.log(findAdmin)
//      console.log("Adminid: " ,adminId)
//       useEffect(() => {
//         async function fetchAdmins() {
//           try {
//             const res = await fetch('http://localhost:3000/adminroute/getadmins');
//             const data = await res.json();
//             setAdmins(data.admin || []);
//           } catch (err) {
//             console.error('Error fetching admins:', err);
//           }
//         }
//         fetchAdmins();
//       }, []); 

//       useEffect(() => {
//     if (!adminId) return;
//       async function fetchBookings() {
//         try {
//           setLoading(true)
//           const res = await fetch(`http://localhost:3000/hotels/viewbookings/admin/${adminId}`);
//           const data = await res.json();
//           if (data.success) {
//             console.log(data.bookings)
//             setBookings(data.bookings || []);
//           }
//         } catch (err) {
//           console.error('Error fetching bookings:', err);
//         }
//         finally{
//           setLoading(false)
//         }
//       }
//       fetchBookings();
//     }, [adminId]);

      
     

     
    

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className='w-64 bg-gray-800 text-white flex flex-col fixed inset-y-0 left-0 transform'>
//         <div className="text-2xl font-bold p-6">Admin Panel</div> 
        
//         <div>
          
//           <li
//               className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-5 ${
//                 activeTab === "dashboard" ? "bg-gray-700" : ""
//               }`}
//               onClick={() => setActiveTab("dashboard")}
//             >Dashboard
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128zM534.6 214.6C547.1 202.1 547.1 181.8 534.6 169.3C522.1 156.8 501.8 156.8 489.3 169.3L384 274.7L326.6 217.4C314.1 204.9 293.8 204.9 281.3 217.4L185.3 313.4C172.8 325.9 172.8 346.2 185.3 358.7C197.8 371.2 218.1 371.2 230.6 358.7L304 285.3L361.4 342.7C373.9 355.2 394.2 355.2 406.7 342.7L534.7 214.7z"/></svg>
//             </li>
//           <ul>

//           <div className="flex-2">
//              <li
//               className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-4${
//                 activeTab === "users" ? "bg-gray-700" : ""
//               }`}
//               onClick={() => setActiveTab("bookings")}
//             >Bookings 
//              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
//             </li>
//         </div>
//            <li
//               className={`p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2${
//                 activeTab === "hotels" ? "bg-gray-700" : ""
//               }`}
//               onClick={() => setActiveTab("hotels")}
//             >Hotels
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M80 88C80 74.7 90.7 64 104 64L536 64C549.3 64 560 74.7 560 88C560 101.3 549.3 112 536 112L528 112L528 528L536 528C549.3 528 560 538.7 560 552C560 565.3 549.3 576 536 576L104 576C90.7 576 80 565.3 80 552C80 538.7 90.7 528 104 528L112 528L112 112L104 112C90.7 112 80 101.3 80 88zM288 176L288 208C288 216.8 295.2 224 304 224L336 224C344.8 224 352 216.8 352 208L352 176C352 167.2 344.8 160 336 160L304 160C295.2 160 288 167.2 288 176zM192 160C183.2 160 176 167.2 176 176L176 208C176 216.8 183.2 224 192 224L224 224C232.8 224 240 216.8 240 208L240 176C240 167.2 232.8 160 224 160L192 160zM288 272L288 304C288 312.8 295.2 320 304 320L336 320C344.8 320 352 312.8 352 304L352 272C352 263.2 344.8 256 336 256L304 256C295.2 256 288 263.2 288 272zM416 160C407.2 160 400 167.2 400 176L400 208C400 216.8 407.2 224 416 224L448 224C456.8 224 464 216.8 464 208L464 176C464 167.2 456.8 160 448 160L416 160zM176 272L176 304C176 312.8 183.2 320 192 320L224 320C232.8 320 240 312.8 240 304L240 272C240 263.2 232.8 256 224 256L192 256C183.2 256 176 263.2 176 272zM416 256C407.2 256 400 263.2 400 272L400 304C400 312.8 407.2 320 416 320L448 320C456.8 320 464 312.8 464 304L464 272C464 263.2 456.8 256 448 256L416 256zM352 448L395.8 448C405.7 448 413.3 439 409.8 429.8C396 393.7 361 368 320.1 368C279.2 368 244.2 393.7 230.4 429.8C226.9 439 234.5 448 244.4 448L288.2 448L288.2 528L352.2 528L352.2 448z"/></svg>
//             </li>
            
//             <div className="flex flex-row">
            
//             {logOut ? <button className="py-3.5 px-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={onClickLogOut}>LogOut
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg>
//             </button> : 
//             <button className="p-4 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={onClickLogIn}>Log In
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6" fill="currentColor"><path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z"/></svg>
//             </button> 
//            }
//             </div>
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
      
//       <main className="flex-1 bg-gray-100 p-6">
        
//         {activeTab === "dashboard" && (
//           <div>
//             <div className="flex flex-row justify-end">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-6 mt-3 ml-3 border-2 rounded-xl p-1" fill="black"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
//             <p className="pt-3 pl-2">{adminEmail}</p>
//           </div>
//             <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className={`p-6 rounded shadow text-white ${stat.color}`}
//                 >
//                   <p className="text-xl">{stat.title}</p>
//                   <p className="text-3xl font-bold">{stat.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {activeTab === "bookings" && (
//           loading ? 
//             <div className="flex justify-center items-center min-h-screen bg-white">
//               <ClipLoader color="#2563eb" size={50} />
//             </div>
//              : 
//           <div>
//            <h2 className="text-center text-2xl font-semibold">Bookings for Your Hotels</h2>
//                   {bookings.length > 0 ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
//                   {bookings.map((booking) => (
//                     <div
//                       key={booking._id}
//                       className="bg-white rounded-2xl shadow-md overflow-hidden p-4"
//                     >
//                       <img
//                         src={
//                           booking.hotelId[0]?.image?.startsWith("http")
//                             ? booking.hotelId[0].image
//                             : `http://localhost:5000/${booking.hotelId[0]?.image}`
//                         }
//                         alt={booking.hotelId[0]?.hotelName}
//                         className="w-full h-48 object-cover rounded-lg mb-3"
//                       />

                      
//                       <h2 className="text-lg font-semibold mb-2 text-gray-800">
//                         {booking.hotelId[0]?.hotelName}
//                       </h2>

                      
//                       {booking.userId?.map((user) => (
//                         <p key={user._id} className="text-gray-700 font-medium">
//                           {user.firstName} {user.lastName} booked this hotel
//                         </p>
//                       ))}


//                       <div className="text-sm text-gray-500 mt-2">
//                         <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
//                         <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
//                         <p>Total Price: ₹{booking.totalPrice}</p>
//                       </div>
//                     </div>
//                   ))}
//                     </div>

//                   ) : (
//                     <p>No bookings yet.</p>
//                   )}
//           </div>
          
//         )}
       
//         {activeTab === "hotels" && (
//           loading ? 
//             <div className="flex justify-center items-center min-h-screen bg-white">
//               <ClipLoader color="#2563eb" size={50} />
//             </div>
//              : 
//           <div>
//              <div className="flex flex-row justify-end">
//         <button 
//           onClick={() => navigate('/createhotel')}
//           className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
//         >
//           + Add new hotel
//         </button>
//         </div>
//             <h1 className="text-3xl font-bold mb-6">Hotels</h1>
            
//             {findAdmin && findAdmin.hotel.length > 0 ? (
//            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
//              {findAdmin.hotel.map((each)=>(
              
//                 <div key={each._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                   <img src={each.image} className='h-[180px] w-full object-cover'/>
//                   <div className="p-4">
//                     <h1 className='font-bold text-lg'>{each.name}</h1>
//                     <p className='line-clamp-1 text-gray-600 my-2'>{each.des}</p>
//                     <h1 className="font-semibold text-blue-600">{each.city}</h1>
//                   </div>
//                 </div>
             
//              ))}
//              </div>
//             ) 
          
//             : 
//              (<div>
//                <p>No hotels found..</p>
//               </div>)
//               }
             
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);
const BookingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6V4h16v2H4zm0 2h16v12H4V8zm8 2v8h2v-8h-2z" />
  </svg>
);
const HotelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 21h18v-2H3v2zm2-4h2V5H5v12zm4 0h2v-6H9v6zm4 0h2V9h-2v8zm4 0h2V3h-2v14z" />
  </svg>
);
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 17l5-5-5-5v3H3v4h7v3zm9-14H11v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
  </svg>
);
const LoginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 17l5-5-5-5v3H3v4h7v3zm1-14h8a2 2 0 012 2v14a2 2 0 01-2 2h-8v-2h8V5h-8V3z" />
  </svg>
);

const AdminDashboard = () => {
  const port = "http://localhost:3000"
  const [activeTab, setActiveTab] = useState("dashboard");
  const [admins, setAdmins] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("adminToken"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const stats = [
    { title: "Total Users", value: 120, color: "bg-blue-500" },
    { title: "Hotels Listed", value: 45, color: "bg-green-500" },
    { title: "Bookings", value: 320, color: "bg-yellow-500" },
  ];

  const adminId = localStorage.getItem("adminId");
  const adminEmail = localStorage.getItem("adminEmail");
  const findAdmin = admins.find((admin) => admin._id === adminId);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/adminlogin");
  };

  const handleLogin = () => navigate("/adminlogin");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  
  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await fetch(`${port}/adminroute/getadmins`);
        const data = await res.json();
        setAdmins(data.admin || []);
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    }
    fetchAdmins();
  }, []);

  
  useEffect(() => {
    if (!adminId) return;
    async function fetchBookings() {
      try {
        setLoading(true);
        const res = await fetch(`${port}/hotels/viewbookings/admin/${adminId}`);
        const data = await res.json();
        if (data.success) setBookings(data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [adminId]);

 
  const renderDashboard = () => (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className={`p-6 rounded-lg shadow text-white ${stat.color}`}>
            <p className="text-xl">{stat.title}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hotel Bookings</h1>
      {loading ? (
        <Spinner />
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow overflow-hidden hover:-translate-y-1 transition-transform">
              <img
                src={
                  booking.hotelId[0]?.image?.startsWith("http")
                    ? booking.hotelId[0].image
                    : `http://localhost:5000/${booking.hotelId[0]?.image}`
                }
                alt={booking.hotelId[0]?.hotelName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{booking.hotelId[0]?.hotelName}</h2>
                {booking.userId?.map((user) => (
                  <p key={user._id} className="text-gray-700 font-medium">
                    {user.firstName} {user.lastName} booked this hotel
                  </p>
                ))}
                <div className="text-sm text-gray-500 mt-2">
                  <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p>Total Price: ₹{booking.totalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      )}
    </div>
  );

  const renderHotels = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Hotels</h1>
        <button
          onClick={() => navigate("/createhotel")}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Hotel
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : findAdmin && findAdmin.hotel.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {findAdmin.hotel.map((hotel) => (
            <div key={hotel._id} className="bg-white rounded-lg shadow overflow-hidden hover:-translate-y-1 transition-transform">
              <img src={hotel.image} alt={hotel.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <p className="text-gray-600 my-2 line-clamp-2">{hotel.des}</p>
                <p className="font-semibold text-blue-600">{hotel.city}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">You haven’t listed any hotels yet.</p>
      )}
    </div>
  );

  
  const SidebarLink = ({ icon, text, tabName }) => (
    <li
      onClick={() => handleTabClick(tabName)}
      className={`mx-3 my-2 p-3 flex items-center gap-3 rounded-lg cursor-pointer transition-colors ${
        activeTab === tabName ? "bg-blue-600" : "hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{text}</span>
    </li>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between w-64 bg-gray-800 text-white fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</div>
        <ul className="flex-grow">
          <SidebarLink icon={<DashboardIcon />} text="Dashboard" tabName="dashboard" />
          <SidebarLink icon={<BookingIcon />} text="Bookings" tabName="bookings" />
          <SidebarLink icon={<HotelIcon />} text="Hotels" tabName="hotels" />
        </ul>
        <div className="p-4 border-t border-gray-700">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 transition-colors"
            >
              <LogoutIcon /> Log Out
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-500 transition-colors"
            >
              <LoginIcon /> Log In
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="bg-white shadow p-4 flex justify-between items-center lg:justify-end">
          {/* Hamburger for mobile */}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
              {adminEmail ? adminEmail.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="hidden sm:block text-gray-700 font-medium">{adminEmail}</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "bookings" && renderBookings()}
          {activeTab === "hotels" && renderHotels()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
