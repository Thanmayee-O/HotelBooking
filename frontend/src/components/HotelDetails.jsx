import React, { useEffect } from 'react'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




const settings = {
  dots: true,            
  infinite: true,        
  speed: 500,            
  slidesToShow: 1,      
  slidesToScroll: 1,     
  autoplay: true,       
  autoplaySpeed: 3000,   
  responsive: [          
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};


function HotelDetails(props) {
    const {totalPrice, setTotalPrice} = props
    const [details , setDetails] = useState({})
    const [reviewList , setReviewList] = useState([])
    const [review , setReview] = useState('')
    const [guests , setGuests] = useState('')
    
    const [rating, setRating] = useState('')

    const {id} = useParams()
    const navigate = useNavigate()
    // console.log(id)
    const [checkIn , setCheckIn] = useState('')
    const [checkOut , setCheckOut] = useState('')

    const today = new Date().toISOString().split("T")[0];
    
    const onChangeCheckIn = (e) =>{
        setCheckIn(e.target.value)
    }
    const onChangeCheckOut = (event) =>{
      setCheckOut(event.target.value)
    }
    const onSuccess = () =>{
        navigate('/success')
    }
    const onChangeReview = (e) => {
      setReview(e.target.value)
    }
    const onChangeGuests = (e) =>{
      setGuests(e.target.value)
    }
    const onChangeRating = (e) => {
      setRating(e.target.value)
    }
     const onKeyDown = (e) => {
        if (e.key==="Enter"){
            onAddReviews(e)
        }
    }
    const onClickBack = () =>{
        navigate('/rooms')
    }
     
       
        function func(){
          async function hoteldetails(){
            const response = await fetch(`http://localhost:3000/hotel/review/${id}`)
            const jsonData = await response.json()
            console.log(jsonData.reviews)
            setReviewList(jsonData.reviews)
            
        }
        hoteldetails()
    }
    useEffect(func , [id])

    const onAddReviews = async(event) => {
        event.preventDefault() 

        const token = Cookies.get("jwtToken")
        
         if (!token) return alert("Please login first");

         const userId = Cookies.get("userId")
         
      //   const newReview = {
      //   id : reviewList.length + 1,
      //   review,
      // }
      // setReviewList(prev => [...prev , newReview])
      // setReview('')

        const response = await fetch("http://localhost:3000/hotel/review" , {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
             Accept : "application/json",
             Authorization : `Bearer ${token}`
          },
          body : JSON.stringify({
            review,
            hotelId : id,
            userId, 
            createdAt : new Date(),
            rating
          })
        })
        const data = await response.json()
          if (data.success && data.review) {
              // Update frontend instantly without reloading
             setReviewList((prev) => [...prev, data.review]);
             setReview("");
             setRating('')
            } else {
              console.error("Error adding review:", data.message);
            }
        };
     

      function fun(){
            async function hoteldetails(){
            const response = await fetch(`http://localhost:3000/hotel/rooms/${id}`)
            const jsonData = await response.json()
            console.log(jsonData.hotel.images)
            setDetails(jsonData.hotel)
            console.log(jsonData)
        }
        hoteldetails()
    }
    useEffect(fun , [id])
     
      const onBooking = async(e) =>{
            
           e.preventDefault()

           const token = Cookies.get("jwtToken")
           if (!token) return alert("Please login first");
          
          //  const userId = Cookies.get("userId")
          //   if (!userId) { 
          //       alert("Please login first");
          //       return;
          //   } 
         const response = await fetch('http://localhost:3000/hotel/userbooking' , {
            method : "POST",  
            headers : {
              "Content-Type" : "application/json",
               Accept : "application/json",
               Authorization : `Bearer ${token}`
            },
            body : JSON.stringify({
               hotelId : id,
              //  userId,
               checkIn,
               checkOut, 
               guests 
            })
         })
           const data = await response.json()
           console.log(data)

           if (!checkIn || !checkOut || !guests || !details.price) {
              alert("Please select all fields.");
              return 
            }
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const days = Math.ceil((checkOutDate - checkInDate) / (1000*60*60*24)) + 1
            const tp = parseInt(details.price) * parseInt(guests) * parseInt(days)
            setTotalPrice(tp)
            console.log("total price : ",tp) 
           
          //  if (!checkIn || !checkOut || !guests || !details.price) {
          //     alert("Please select dates and number of guests first.");
          //     return 
          //   }
            
      
          
            // Navigate only if booking ID is valid
  
         navigate(`/payment/${data.booking._id}`)
      }


    
  return (
    <>
    <div className='flex flex-row text-blue-700 ml-3 bg-gray-50 pt-5 pb-1'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-7 w-7 pt-1 pr-1 pl-2' fill="blue">
      <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z"/></svg>
    <button className='text-lg' onClick={onClickBack}>Back</button>
    </div>
    <div className='bg-gray-50 pt-4 pb-8'>
       <div className='container mx-auto px-4'>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
           
           {/* Left Side - Hotel Info */}
           <div className='lg:col-span-2'>
             {/* Hotel Header */}
             <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
               <div className='flex items-start justify-between mb-4'>
                 <div className='flex-1'>
                   <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>{details.name}</h1>
                   <div className='flex items-center gap-2 mb-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                     </svg>
                     <p className='text-gray-700'>{details.address}</p>
                   </div>
                 </div>
                 <div className='ml-4 flex flex-col items-end'>
                   <div className='flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full mb-2'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400">
                       <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                     </svg>
                     <span className='text-blue-700 font-bold'>{details.rating}</span>
                   </div>
                   <span className='text-sm text-gray-600'>Excellent</span>
                 </div>
               </div>
               <p className='text-gray-600 leading-relaxed'>{details.des}</p> 
             </div>

             {/* Image Slider */}
             <div className='mb-6'>
               <div className='rounded-xl overflow-hidden shadow-lg'>
                 <Slider {...settings}>
                   {details.images && details.images.map((each, index) => (
                     <div key={index}>
                       <img src={each} alt={`Hotel ${index + 1}`} className='w-full h-96 md:h-[500px] object-cover' />
                     </div>
                   ))}
                 </Slider>            
               </div>
             </div>

             {/* Reviews Section */}
             <div className='bg-white rounded-xl shadow-md p-6'>
               <div className='flex items-center justify-between mb-5'>
                 <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-blue-600">
                     <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.529C.993 2.755 1 4.396 1 4.5v10.5c0 1.104.864 2 1.93 2H6c-.027-.132-.066-.265-.115-.395-.432-.604-1.79-1.636-2.936-1.726v-9.5c1.704-.585 3.489-1.052 5.269-1.354.518-.089.971-.154 1.366-.2a67.728 67.728 0 01.426-.017h.004c.017 0 .035 0 .052.001.017-.001.035-.001.052-.001h.004a67.728 67.728 0 01.426.017c.395.046.848.111 1.366.2 1.78.302 3.565.77 5.269 1.354v9.5c-1.146.09-2.504 1.122-2.936 1.726-.05.13-.088.263-.115.395h3.07c1.066 0 1.93-.896 1.93-2V4.5c0-.104-.007-1.745-1.429-1.971C14.43 2.18 12.236 2 10 2z" clipRule="evenodd" />
                     <path d="M10 16.5V10h-1v6.5c0 .276.224.5.5.5H10v-1h.5a.5.5 0 01.5.5v.5h1v-.5a.5.5 0 01.5-.5H13v-1h-.5z" />
                   </svg>
                   Reviews ({reviewList?.length || 0})
                 </h2>
               </div>

               {/* Add Review Form */}
               <div className='p-4 bg-gray-50 rounded-xl mb-5 border border-gray-100'>
                 <div className='flex flex-col gap-3'>
                   <div className='flex gap-2'>
                     <input 
                       type="text" 
                       placeholder='Share your experience...' 
                       value={review} 
                       onChange={onChangeReview} 
                       onKeyDown={onKeyDown} 
                       className='flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700' 
                     /> 
                     <input 
                       onChange={onChangeRating} 
                       value={rating} 
                       type="number" 
                       min="1" 
                       max="5" 
                       placeholder='Rating'
                       className='w-24 px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700' 
                     /> 
                   </div>
                   <button 
                     onClick={onAddReviews} 
                     className='px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm'
                   >
                     Add Review
                   </button> 
                 </div>
               </div>
               {/* Reviews List */}
               <div className='space-y-4 max-h-96 overflow-y-auto px-1'>
                 {reviewList && reviewList.length > 0 ? (
                   reviewList.map((each, index) => (
                     <div key={each._id || index} className='pb-4 border-b border-gray-100 last:border-0'>
                       <div className='flex items-start gap-3'>
                         <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0'>
                           {each.userId?.firstName?.[0] || "A"}
                         </div>
                         <div className='flex-1'>
                           <div className='flex items-center justify-between mb-1'>
                             <h3 className='font-semibold text-gray-900'>{each.userId?.firstName || "Anonymous"}</h3>
                             <div className='flex items-center gap-0.5'>
                               {[...Array(5)].map((_, i) => (
                                 <svg 
                                   key={i} 
                                   xmlns="http://www.w3.org/2000/svg" 
                                   viewBox="0 0 20 20" 
                                   fill={i < (each.rating || 0) ? "currentColor" : "none"} 
                                   className={`w-4 h-4 ${i < (each.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                                 >
                                   <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                 </svg>
                               ))}
                             </div>
                           </div>
                           <p className='text-gray-600 leading-relaxed'>{each.review}</p>
                         </div>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className='text-center text-gray-400 py-8'>
                     <p className='mb-2'>No reviews yet</p>
                     <p className='text-sm'>Be the first to review!</p>
                   </div>
                 )}
               </div>
             </div>
           </div>
          
           {/* Right Side - Booking Card */}
           <div className='lg:col-span-1'>
             <div className='bg-white rounded-xl shadow-lg p-6 sticky top-1 border border-gray-100'>
               {/* Price Header */}
               <div className='mb-6 pb-6 border-b border-gray-200'>
                 <div className='flex items-baseline gap-2 mb-3'>
                   <span className='text-4xl font-bold text-gray-900'>${details.price}</span>
                   <span className='text-gray-500'>/ night</span>
                 </div>
                 {totalPrice > 0 && (
                   <div className='p-3 bg-blue-50 rounded-lg border border-blue-100'>
                     <div className='flex justify-between items-center'>
                       <span className='text-gray-700 font-medium'>Total Price:</span>
                       <span className='text-2xl font-bold text-blue-600'>${totalPrice}</span>
                     </div>
                   </div>
                 )}
               </div>

               {/* Booking Form */}
               <form onSubmit={onBooking} className='space-y-4'>
                 <div>
                   <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Check-In Date
                   </label>
                   <input 
                     type="date" 
                     value={checkIn} 
                     min={today} 
                     onChange={onChangeCheckIn}
                     className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700'
                   />
                 </div>

                 <div>
                   <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Check-Out Date
                   </label>
                   <input 
                     type='date' 
                     value={checkOut} 
                     min={checkIn || today} 
                     onChange={onChangeCheckOut}
                     className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700'
                   />
                 </div>

                 <div>
                   <label className='block text-sm font-semibold text-gray-700 mb-2'>
                     Number of Guests
                   </label>
                   <input 
                     type="number" 
                     min="1" 
                     max="4" 
                     onChange={onChangeGuests} 
                     value={guests}
                     placeholder="Select guests"
                     className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700'
                   />
                 </div>
                 
                 <button 
                   type="submit"
                   className='w-full py-3.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2'
                 >
                   Reserve Now
                 </button>
               </form>
               
               <div className='mt-6 pt-4 border-t border-gray-200'>
                 <p className='text-xs text-gray-500 text-center flex items-center justify-center gap-1'>
                   <span>🔒</span>
                   <span>Free cancellation up to 24 hours before</span>
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>    
   </> 
  )
}

export default HotelDetails
