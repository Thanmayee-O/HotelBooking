import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from "react-spinners";
import ScrollReveal from './ScrollReveal';

const cityImages = {
  Goa: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  Ooty: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  Lonavala: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1600&q=80",
  Hyderabad: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=1600&q=80",
  Bengaluru: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
  "New Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80"
}

function EachCity() {
  const port = "https://hotelbooking-l4ia.onrender.com"
  const [eachCity, setCity] = useState([])
  const { city } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const onGoHome = () => {
    navigate('/')
  }
  
  function getEachCity() {
    async function fn() {
      try {
        setLoading(true)
        const data = await fetch(`${port}/hotel/${city}`)
        const response = await data.json()
        console.log(response)
        setCity(response.cities || [])
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fn()
  }
  
  useEffect(getEachCity, [city])

  const filteredHotels = eachCity.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.des.toLowerCase().includes(search.toLowerCase())
  )

  return (
    loading ?
      (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <ClipLoader color="#2563eb" size={50} />
        </div>
      ) :
      (
        <div className="min-h-screen bg-slate-50 pb-16">
          {/* Navigation Breadcrumbs & Header Bar */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <button 
                className="flex items-center gap-2 text-white hover:text-blue-100 text-xl font-bold transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                onClick={onGoHome}
              >
                <span className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg border border-white/20 shadow-inner">🏨</span>
                <span>BookYourStay</span>
              </button>
              <div className="flex items-center gap-2 text-sm text-blue-100 font-medium">
                <span className="cursor-pointer hover:text-white transition-colors" onClick={onGoHome}>Home</span>
                <span>/</span>
                <span className="text-blue-200/80">Hotels</span>
                <span>/</span>
                <span className="text-white font-semibold">{city}</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Section (Light Theme) */}
          <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-slate-200">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.2] transition-transform duration-1000 scale-105"
              style={{ backgroundImage: `url('${cityImages[city] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80"}")` }}
            />
            
            {/* Glowing particle effect in the hero */}
            <div className="absolute top-[20%] left-[20%] w-[200px] h-[200px] rounded-full bg-blue-400/20 blur-[80px]" />
            <div className="absolute bottom-[20%] right-[20%] w-[250px] h-[250px] rounded-full bg-indigo-400/20 blur-[80px]" />

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto flex flex-col items-center">
              <ScrollReveal delay={0}>
                <span className="bg-blue-600/10 text-blue-700 text-xs font-bold tracking-widest uppercase py-1 px-3.5 rounded-full mb-3 border border-blue-200/50 shadow-sm">
                  Destinations
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
                  Explore <span className="text-blue-600 font-extrabold">{city}</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 max-w-xl font-medium leading-relaxed">
                  Find and book the perfect hotel or luxury resort for your next memorable getaway in {city}.
                </p>
              </ScrollReveal>

              {/* Embedded Search bar in Hero */}
              <ScrollReveal delay={0.3} className="mt-8 w-full max-w-md">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={`Search hotels in ${city}...`}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl text-slate-800 placeholder-slate-400 shadow-md transition-all duration-300 outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  Available Accommodations
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showing {filteredHotels.length} luxury spots matching your filters
                </p>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Hotels Found</h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-2">
                  We couldn't find any hotels matching "{search}" in {city}. Try modifying your spelling or search terms.
                </p>
                <button 
                  onClick={() => setSearch('')}
                  className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/10 cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="rooms">
                {filteredHotels.map((each, index) => (
                  <ScrollReveal
                    key={each._id || index}
                    delay={(index % 3) * 0.08}
                    className="h-full"
                  >
                    <Link
                      to={`/hotel/${each._id}`}
                      className="group"
                    >
                      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                        <div className="relative overflow-hidden h-64">
                          <img
                            src={each.image}
                            alt={each.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-1 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-blue-400">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{each.city}</span>
                          </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                            {each.name}
                          </h3>
                          <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed flex-1">
                            {each.des}
                          </p>
                          
                          <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
                            <div className="flex items-center text-blue-600 font-semibold text-sm">
                              <span>Verified Stay</span>
                            </div>
                            <span className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                              View details
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      )
  )
}

export default EachCity

