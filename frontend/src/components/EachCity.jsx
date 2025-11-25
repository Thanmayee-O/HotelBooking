import React from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'

function EachCity() {
     const port = "http://localhost:3000"
     const [eachCity , setCity] = useState([])
     const {city} = useParams()
     const navigate = useNavigate()     

     const onGoHome = () => {
       navigate('/')
     }
    console.log(city)
     function getEachCity(){
         async function fn(){
              const data = await fetch(`${port}/hotel/${city}`)
              const response = await data.json()
              console.log(response)
              setCity(response.cities)
         }
         fn()
      }    
       useEffect(getEachCity,[city])    
  return (
    <>
     
     <button className='pt-2 pl-2 text-xl text-blue-600 font-semibold' onClick={onGoHome}>BookYourStay</button>
     <h1 className='text-blue-600 text-3xl text-center font-semibold mb-10 mt-2'>Available Hotels</h1>
     
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6' id="rooms">
      
            {eachCity.map((each , index)=>(          
          <Link 
              to={`/hotel/${each._id}`} 
              key={each._id || index}
              className='group'
            >
              <div className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col ml-2'>
                <div className='relative overflow-hidden h-60'>
                  <img 
                    src={each.image} 
                    alt={each.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300' 
                  />
                 
                </div>
                
                <div className='p-5 flex-1 flex flex-col'>
                  <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200'>
                    {each.name}
                  </h2>
                  <p className='text-gray-600 text-sm line-clamp-2 mb-4 flex-1'>
                    {each.des}
                  </p>
                  <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-100'>
                    <div className='flex items-center text-blue-600 font-semibold'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className='text-sm'>{each.city}</span>
                    </div>
                    <button className='text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200'>
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
           
       ))}
    </div>
    </>
  )
}

export default EachCity

