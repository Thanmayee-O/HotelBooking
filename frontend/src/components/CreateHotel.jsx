import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'



function CreateHotel() {
  const port = "https://hotelbooking-fcz6.onrender.com"
  const [hotelName,  setHotelName] = useState("")
  const [des, setDes] = useState("")
  const [city, setCity] = useState("")
  const [image, setImage] = useState(null)
  const [address , setAddress] = useState('')
  const [images, setImages] = useState([])
  const [price , setPrice] = useState('')
  const [hotels, setHotels] = useState([])
  const [editingHotel, setEditingHotel] = useState(null)
  
    function onChangeImages(e){
       const files = Array.from(e.target.files)
       setImages(prev => [...prev, ...files])
    }

    const adminId = localStorage.getItem("adminId")
    console.log(adminId)
    
    useEffect(() => {
      async function getData() {
        if (!adminId) return; // wait until adminId is available
        try {
          const res = await fetch(`${port}/hotel/admin/${adminId}`);
          const data = await res.json();
           console.log("Fetched hotels:", data);
          setHotels(data.hotels || []);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }, [adminId]);


    // Reset form
    const resetForm = () => {
      setHotelName("")
      setDes("")
      setCity("")
      setImage(null)
      setAddress("")
      setImages([])
      setPrice("")
      setEditingHotel(null)
      // Reset file inputs
      const imageInput = document.getElementById('image')
      const imagesInput = document.getElementById('images')
      if (imageInput) imageInput.value = ''
      if (imagesInput) imagesInput.value = ''
    }

    
    const handleEdit = (hotel) => {
      setEditingHotel(hotel)
      setHotelName(hotel.name)
      setDes(hotel.des)
      setCity(hotel.city)
      setAddress(hotel.address)
      setPrice(hotel.price)
      setImage(null)
      setImages([])
    }

    
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this hotel?")) {
        return
      }
      try {
        const token = localStorage.getItem("adminToken")
        const res = await fetch(`${port}/hotel/rooms/${id}`, {
          method : "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
       
        // Refresh hotels list
        
        console.log(data)
        if(res.ok){
          alert("Hotel deleted successfully")
          setHotels(prev => prev.filter(h => h._id !== id));
        }
        else{
          alert("data.message" || "Failed to delete hotel")
        }
      } catch (err) {
        console.error("Error deleting hotel:", err)
        alert("Failed to delete hotel")
      }
    }
    
   
    const onCreateHotel = async(event) => {
        event.preventDefault()

        const token = localStorage.getItem("adminToken")
        const adminId = localStorage.getItem("adminId")
  
        
        try {
          if (editingHotel) {
            
            const formData = new FormData()
            formData.append("name", hotelName)
            formData.append("des", des)
            formData.append("city", city)
            formData.append("address", address)
            formData.append("price", price)
            if (image) {
              formData.append("image", image)
            }
            if (images.length > 0) {
              images.forEach(img => formData.append("images", img))
            }

            const options = {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`
              },
              body: formData
            }

            const response = await fetch(`${port}/hotel/rooms/${editingHotel._id}`, options)
            const dataa = await response.json()
            console.log(dataa)

            if (dataa.message || dataa.hotel) {
              alert("Hotel updated successfully")
               const hotelId = dataa.hotel._id
              localStorage.setItem("hotelId", hotelId)

            } else {
              alert("Hotel update failed")
            }
          } else {
            
            const formData = new FormData()
            formData.append("name", hotelName)
            formData.append("des", des)
            formData.append("city", city)
            formData.append("image", image)
            formData.append("address", address)
            formData.append("price", price)
            formData.append("adminId", adminId)
            images.forEach(img => formData.append("images", img))
            
            console.log("Selected images:", images)

            const options = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`
              },
              body: formData
            }

            const response = await fetch(`${port}/hotel/create`, options)
            const dataa = await response.json()
            console.log(dataa)  
            
            if(dataa.success){
              alert("Hotel added successfully")
              localStorage.setItem("hotelId" , dataa.hotel._id)
              const hotelId = localStorage.getItem("hotelId")
               try{
                const response = await fetch(`${port}/adminroute/${hotelId}/postrooms` , 
                { 
                  method : "POST",
                  headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                  }            
                }
              )
                const data = await response.json()
                if(response.ok){
                  alert('Rooms added successfully for your hotel');
                  console.log()
                  console.log("Response:", data);
                }
                else{
                  alert(`Failed to add rooms: ${data.message}`)
                }
              }
              catch(error){
                  console.log(error)
                  alert("Something went wrong")
              }
          } else {
            alert("Hotel added failed, Hotel already added")
          }
        }

          
          resetForm()
          const res = await fetch(`${port}/hotel/admin/${adminId}`)
          const data = await res.json()
          setHotels(data.hotels || [])
        } catch (error) {
          console.log(error)
        }
    }
   

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 border border-blue-200 mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
            {editingHotel ? 'Edit Hotel' : 'Create Hotel'}
          </h1>
          
          <form onSubmit={onCreateHotel} encType="multipart/form-data">
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
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
                Select City:
              </label>
              <select  id="city" value={city} onChange={(e) => setCity(e.target.value)} className="border-1 border-gray-300 rounded p-2 w-full">
                <option value="" disabled></option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ooty">Ooty</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Lonavala">Lonavala</option>
                <option value="Goa">Goa</option>
              </select>
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
                required
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
                required
              />
            </div>
           
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-medium mb-1">
                Main Image {editingHotel && <span className="text-gray-500">(optional)</span>}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 focus:border-blue-500 rounded-lg px-3 py-2"
                required={!editingHotel}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="images" className="block text-gray-700 font-medium mb-1">
                Additional Images {editingHotel && <span className="text-gray-500">(optional)</span>}
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
                required
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className={`flex-1 py-3 rounded-lg text-white font-semibold text-lg transition-all shadow-md ${
                  hotelName && city && (!editingHotel || image) && des
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400"
                }`}
                disabled={!hotelName || !city || (!editingHotel && !image) || !des}
              >
                {editingHotel ? 'Update Hotel' : 'Create Hotel'}
              </button>
              
              {editingHotel && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Hotels List Section */}
        <div className="bg-white shadow-2xl rounded-2xl px-8 py-10 border border-blue-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Your Hotels</h2>
          
          {hotels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">City</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Address</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{hotel.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{hotel.city}</td>
                      <td className="border border-gray-300 px-4 py-2">{hotel.address}</td>
                      <td className="border border-gray-300 px-4 py-2">₹{hotel.price}</td>
                      <td className="border border-gray-300 px-4 py-2 max-w-xs truncate">{hotel.des}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(hotel)}
                            className="hover:bg-gray-100 text-white px-3 py-1 rounded transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-5' fill="gray"><path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z"/></svg>
                          </button>
                          
                          <button
                            onClick={() => handleDelete(hotel._id)}
                            className="hover:bg-gray-100 text-white px-3 py-1 rounded transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='h-5' fill="gray"><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hotels found. Create your first hotel!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateHotel;
