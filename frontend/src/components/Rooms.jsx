import React from 'react'
import { useEffect , useState} from 'react'
import { Calendar } from 'primereact/calendar';
import { useNavigate , Link, useParams} from 'react-router-dom';   
import { ClipLoader } from "react-spinners";


function Rooms() {
    const port = "https://hotelbooking-fcz6.onrender.com"
     const navigate = useNavigate()
     const [rooms ,setRooms] = useState([])
     const [search , setSearch] = useState('')
     const [detailRooms , setDetailRooms] = useState('')
     const [loading , setLoading] = useState(false)
   
    const onGoHome = () =>{
       navigate('/')
    }
    const onChangeSearch = (e) =>{
          setSearch(e.target.value)
    }
    const searchResults = rooms.filter((eachRoom)=>{
        return eachRoom.name.toLowerCase().includes(search.toLowerCase())
    })

    

   function getData(){
      async function fn(){
        try{
            setLoading(true)
           const data = await fetch(`${port}/hotel/rooms`)
           const response = await data.json()
           console.log(response)
           setRooms(response.hotels)
        }
        catch(error){
           console.log(error)
        }
        finally{
          setLoading(false)
        }
      }
      fn()
   }    
    


  useEffect(getData,[])
   
  return (
    loading ?  
      (  
     <div className="flex justify-center items-center min-h-screen bg-white">
        <ClipLoader color="#2563eb" size={50} />
      </div>
      ):

      ( 
      <>
        <div className='animate-fadeInDown min-h-screen bg-gray-50'>
          
          <div className='bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg'>
              <div className='container mx-auto px-4 py-6'>
                <div className='flex flex-col sm:flex-row items-center justify-between'>
                  <button 
                    className='text-xl font-bold text-white mb-4 sm:mb-0 hover:text-blue-200 transition-colors duration-200' 
                    onClick={onGoHome}
                  >
                    🏨 BookYourstay
                  </button>
                  <h1 className='text-lg sm:text-3xl md:text-4xl font-bold text-white text-center'>Choose Your Perfect Stay</h1>
                  <div className='hidden sm:block w-24'></div>
                </div>
              </div>
          </div>

        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='relative'>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input 
                type="search" 
                placeholder="Search hotels by name..." 
                className='w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md' 
                value={search} 
                onChange={onChangeSearch}
              />
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 pb-12'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' id="rooms">
            {searchResults.length === 0 ? (
              <div className='col-span-full text-center py-16'>
                <p className='text-gray-500 text-lg'>No rooms found. Try a different search.</p>
              </div>
            ) : (
              searchResults.map((each, index) => (
                <Link 
                  to={`/hotel/${each._id}`} 
                  key={each._id || index}
                  className='group'
                >
                  <div className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col'>
                    <div className='relative overflow-hidden h-56'>
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
              ))
            )}
          </div>
        </div>
        </div>
       </>
      )

    
    
  )
  
}

export default Rooms
