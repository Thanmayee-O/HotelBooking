import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EachHotel() {
    const [hotel , setHotel] = useState(null)
    const {id} = useParams()
   function eachHotel(){
          async function fn(){
                const data = await fetch(`http://localhost:3000/hoteldetails/${id}`)
                const response = await data.json() 
                setHotel(response.data)
                console.log(response)
        }
     fn()
   }
   useEffect(eachHotel , [id])
  return (
    <div>
       <div className='grid grid-cols-2/3 mx-10 justify-center mt-5 mx-auto ml-12 sm:grid-cols-2 xl:grid-cols-4' id="rooms">
           <div className='h-100 w-70 rounded-lg'>
            {/* <img src={hotel.image} className='h-[180px] w-[250px] rounded-sm'/> */}
            <h1 className='font-bold'>{hotel.name}</h1>
            
            <h1 className='line-clamp-2'>{hotel.des}</h1>
            <div className='flex flex-row justify-between'>
              <p className='font-bold text-left mt-2 ml-2'>{hotel.city}</p>
            <div className='flex flex-row mr-10 mt-2'>
            <img src="https://res.cloudinary.com/dpqs7ibuh/image/upload/v1755859191/Screenshot_2025-08-22_160925_guonve.png" alt="image" className='h-6 w-8'/>
              <p>{hotel.rating}</p>
            </div>
          </div>
          </div>
           
      
    </div>
    </div>
  )
}

export default EachHotel
