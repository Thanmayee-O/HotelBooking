import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
function EachCity() {
     const [eachCity , setCity] = useState([])
     const {city} = useParams()
     
     
     console.log(city)
   function getEachCity(){
         async function fn(){
              const data = await fetch(`http://localhost:3000/hotel/${city}`)
              const response = await data.json()
              console.log(response)
              setCity(response.cities)
         }
         fn()
      }    
       useEffect(getEachCity,[])    
  return (
    <div className='grid grid-cols-2/3 mx-10 justify-center mt-5 mx-auto ml-12 sm:grid-cols-2 xl:grid-cols-4' id="rooms">
            {eachCity.map((each)=>(          
           <div className='h-100 w-70 rounded-lg'>
            <img src={each.image} className='h-[180px] w-[250px] rounded-sm'/>
            <h1 className='font-bold'>{each.name}</h1>
            <h1 className='line-clamp-2'>{each.des}</h1>
            <div className='flex flex-row justify-between'>
              <p className='font-bold text-left mt-2 ml-2'>{each.city}</p>
            <div className='flex flex-row mr-10 mt-2'>
            <img src="https://res.cloudinary.com/dpqs7ibuh/image/upload/v1755859191/Screenshot_2025-08-22_160925_guonve.png" alt="image" className='h-6 w-8'/>
              <p>{each.rating}</p>
            </div>
          </div>
          </div>
           
       ))}
    </div>
  )
}

export default EachCity
