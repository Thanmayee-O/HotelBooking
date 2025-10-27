import {useState} from 'react'

function CreateHotelDetails() {
  const [hotelname,  setHotelname] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")
  const [img3, setImg3] = useState("")
  const [img4, setImg4] = useState("")
  const [img5, setImg5] = useState("")
  const [des , setDes] = useState("")

  function nameInput(e){
      setHotelname(e.target.value)
  }
  function addressInput(e){
      setAddress(e.target.value)
  }
  function cityInput(e){
      setCity(e.target.value)
  }
  function img1Input(e){
    setImg1(e.target.value)
  }
  function img2Input(e){
    setImg2(e.target.value)
  }
  function img3Input(e){
    setImg3(e.target.value)
  }
  function img4Input(e){
    setImg4(e.target.value)
  }
  function img5Input(e){
    setImg5(e.target.value)
  }
  function description(e){
    setDes(e.target.value)
  }

  function createHotel(e){
      e.preventDefault()
      const url = "http://localhost:3000/"
      const opt = {
          method: "POST",
          headers: {
              "content-Type" : "application/json",
              Accept: "application/json"
          }
      }
      const response = fetch(url, opt)
      const jsonResponse = response.json()
      console.log(jsonResponse)
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <form className='flex flex-col justify-center items-start border-3 border-gray-200 rounded-xl p-12' onSubmit={createHotel}>
        <h1 className='text-3xl font-bold self-center text-gray-500 mb-6'>Create Hotel</h1>
        <div className='flex flex-row justify-around items-start'>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='hotelname' className='font-semibold text-gray-500'>Hotel Name</label>
            <input value={hotelname} type='text' placeholder='Enter Hotel Name' onChange={nameInput} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='hotelname' />
          </div>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='address' className='font-semibold text-gray-500'>Address</label>
            <input value={address} type='text' placeholder='Enter Address' onChange={addressInput} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='address' />
          </div>
        </div>
        <div className='flex flex-row justify-around items-start'>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='city' className='font-semibold text-gray-500'>City</label>
            <input value={city} type='text' placeholder='Enter City' onChange={cityInput} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='city' />
          </div>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='img1' className='font-semibold text-gray-500'>Image 1</label>
            <input value={img1} type='text' placeholder='Enter Image 1' onChange={img1Input} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='img1' />
          </div>
        </div>
        <div className='flex flex-row justify-around items-start'>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='img1' className='font-semibold text-gray-500'>Image 2</label>
            <input value={img2} type='text' placeholder='Enter Image 2' onChange={img2Input} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='img2' />
          </div>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='img1' className='font-semibold text-gray-500'>Image 3</label>
            <input value={img3} type='text' placeholder='Enter Image 3' onChange={img3Input} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='img3' />
          </div>
        </div>
        <div className='flex flex-row justify-around items-start'>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='img1' className='font-semibold text-gray-500'>Image 4</label>
            <input value={img4} type='text' placeholder='Enter Image 4' onChange={img4Input} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='img4' />
          </div>
          <div className='flex flex-col mx-2 my-1'>
            <label htmlFor='img1' className='font-semibold text-gray-500'>Image 5</label>
            <input value={img5} type='text' placeholder='Enter Image 5' onChange={img5Input} className='my-1 border-3 border-gray-600 rounded-md px-6 py-1' id='img5' />
          </div>
        </div>
        <div className=' flex flex-col self-center'> 
          <label htmlFor='des' className='font-semibold text-gray-500'>Description</label>
          <textarea id="des" name="message" value={des} onChange={description} placeholder='About the hotel and rooms' rows="4" cols="54" className='my-1 border-3 border-gray-600 rounded-md px-6 py-1'/>
        </div>
        <button className={`self-center mt-8 text-white px-5 py-2 rounded-full shadow font-semibold ${hotelname==="" || address==="" || city==="" || img1==="" || img2==="" || img3==="" ||img4==="" || img5==="" ? "bg-gray-500" : "bg-blue-600"}`} type='submit'>Add Hotel</button>
      </form>
    </div>
  )
}

export default CreateHotelDetails