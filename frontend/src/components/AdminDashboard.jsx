


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
  const port = "https://hotelbooking-fcz6.onrender.com"
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
                    : `https://hotelbooking-fcz6.onrender.com/${booking.hotelId[0]?.image}`
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
