import { useState } from 'react'
import Cookies from 'js-cookie'


function CreateHotel() {
  const [hotelName,  setHotelName] = useState("")
  const [des, setDes] = useState("")
  const [city, setCity] = useState("")
  const [image, setImage] = useState(null)
  const [address , setAddress] = useState('')
  const [images, setImages] = useState([])
  const [price , setPrice] = useState('')
    // function onChangeHotelName(e){
    //     setHotelName(e.target.value)
    // }
    // function onChangeCity(e){
    //     setCity(e.target.value)
    // }
    // function onChangeAddress(e){
    //     setAddress(e.target.value)
    // }
    // function onChangeDes(e){
    //     setDes(e.target.value)
    // }
    function onChangeImages(e){
       const files = Array.from(e.target.files)
       setImages(prev => [...prev, ...files])
    }


    const onCreateHotel = async(event) => {
        event.preventDefault()

        const token = Cookies.get("adminToken")
        const adminId = Cookies.get("adminId")
        console.log(adminId)
        const formData = new FormData();
        formData.append("name" , hotelName)
        formData.append("des" , des)
        formData.append("city" , city)
        formData.append("image" , image)
        formData.append("address" , address)
        formData.append("price" , price)
        formData.append("adminId" , adminId)
        images.forEach(img => formData.append("images" , img))
        
        console.log("Selected images:", images);

        

        // for(let i=0;i<6;i++){
        //   formData.append("images[]" , images[i])
        // }
       try {
         const options = {
            method : "POST",
            headers : {
               Authorization : `Bearer ${token}`
            },
            body : formData
        }
        const response = await fetch("http://localhost:3000/hotel/create" , options)
        const dataa = await response.json()
        console.log(dataa)  
        
        if(response.ok){
             alert("Hotel added successfully")
        }
        else{
          alert("hotel added failed , Hotel already added")
        }
       }
       
       
       catch (error) {
          console.log(error)
       }   

  }
   

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={onCreateHotel}
        encType="multipart/form-data"
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl px-8 py-10 border border-blue-200"
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Create Hotel
        </h1>

      
        <div className="mb-4">
          <label htmlFor="hotelname" className="block text-gray-700 font-medium mb-1">
            Hotel Name
          </label>
          <input
            id="hotelname"
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            placeholder="Enter hotel name"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
          />
        </div>

        
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
          />
        </div>

     
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
          />
        </div>
         <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
            Price 
          </label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all"
          />
        </div>
       
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
            Main Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 focus:border-blue-500 rounded-lg px-3 py-2"
          />
        </div>

       
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-medium mb-1">
            Additional Images
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={onChangeImages}
            className="w-full border border-gray-300 focus:border-blue-500 rounded-lg px-3 py-2"
          />
        </div>

       
        <div className="mb-6">
          <label htmlFor="des" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="des"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            rows="5"
            placeholder="Brief description about the hotel..."
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 outline-none transition-all resize-none"
          ></textarea>
        </div>

        
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all shadow-md ${
            hotelName && city && image && des
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!hotelName || !city || !image || !des}
        >
          Create Hotel
        </button>
      </form>
    </div>
  );
}

export default CreateHotel;
