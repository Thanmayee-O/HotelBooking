import React from "react";
import {useNavigate} from 'react-router-dom'


const list = [
          {
            name: "Goa",
            img: "https://r1imghtlak.mmtcdn.com/1611f3b6237111e89e9c0a4cef95d023.jpg?output-quality=75&downsize=328:180&output-format=jpg",
            desc: "SGuests can experience age-old Ayurvedic treatments, Indian Aroma Therapy and beauty treatments at the in-house J Wellness Circle.",
          },
          {
            name: "Ooty",
            img: "https://rukmini-ct.flixcart.com/q_75,w_420,h_300,fl_progressive,e_sharpen:80,c_fill,dpr_2,f_auto/ct-hotel-images/places/hotels/cms/2926/292628/images/image_292628_ed9a6a06-7220-4dab-af29-057262d70fdf.jpeg",
            desc: "The resort also faces Ooty's famous racecourse. Sterling Ooty - Elk Hill has an observatory with a day and night telescope",
          },
          {
            name: "Lonavala",
            img: "https://pix10.agoda.net/hotelImages/67266884/0/88840936cbaea750afeebe7d46b62648.jpg?ce=2&s=702x392",
            desc: "Comfortable room with all essentials for a pleasant stay.",
          },
           {
            name: "Hyderabad",
            img: "https://img.easemytrip.com/emthotel-34504/72/a/l/1124319/89274965_p.jpg",
            desc: "A French international hotel chain, part of the Accor group, offering a range of accommodations including hotels, resorts, suites, and residences.",
          },
          {
            name : "Bengaluru",
            img : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/6e/1d/4f/the-lalit-ashok.jpg?w=900&h=500&s=1",
            desc : "The LaLiT Ashok Bangalore is centrally located in Bengaluru city, adjacent to an 18-hole golf course."
          },
          {
            name : "New Delhi",
            img : "https://media.easemytrip.com/media/hotel/shl-1911613097864/common/commonmj6mfp.jpg",
            desc : "Offer expansive rooms with elegant decor, luxury suites, gourmet dining, and comprehensive services like spas, fitness centers, and concierge."
          }


  ]

const HomeRooms = () => {
   const navigate = useNavigate()
  
  function onEachRoom(city){
     navigate(`/each/${city}` , {replace:true})
  }
  

  return(
    <>
   
   <div className="py-20 bg-blue-50 animate-fadeInUp">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        Our Hotels
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {list.map((room, idx) => (
          <div
            key={room.name}
            onClick={()=>onEachRoom(room.name)}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-fadeInUp"
            style={{
              animationDelay: `${idx * 0.2 + 0.2}s`,
              animationFillMode: "both",
            }}
          >
            <img
              src={room.img}
              alt={room.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {room.name}
              </div>
              <p className="text-gray-600">{room.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
  )
};

export default HomeRooms