import React from 'react'
import { useNavigate } from 'react-router-dom'

function SucessfulPage() {
    const navigate = useNavigate()

    const returnHome = () =>{
        navigate('/')
    }

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
       <img src="https://img.freepik.com/premium-vector/check-icon_789244-128.jpg?semt=ais_hybrid&w=740&q=80" className='h-70 w-70'/>
       <h1 className='text-2xl font-bold'>Booked Successfully!</h1>
       <p className='text-lg mt-2'>Thank you for booking.</p>
       <button className='border-1 bg-[#005AC5] px-2 py-2 rounded-lg text-[white] mt-1' onClick={returnHome}>Return to home</button>
    </div>
  )
}

export default SucessfulPage
