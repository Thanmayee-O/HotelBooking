import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Sample = () => {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({ name: "", city: "", price: "", address: "" });
  const [editingHotel, setEditingHotel] = useState(null);

  // ✅ Get adminId from cookies (set when login)
  const adminId = Cookies.get("adminId");

  // Fetch hotels of that admin
  const fetchHotels = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/hotel/admin/${adminId}`, {
        withCredentials: true, // important when CORS credentials enabled
      });
      setHotels(res.data.hotels || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    if (adminId) fetchHotels();
  }, [adminId]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHotel) {
        // update hotel
        await axios.put(`http://localhost:3000/hotel/${editingHotel._id}`, form, {
          withCredentials: true,
        });
      } else {
        // create hotel
        await axios.post(
          "http://localhost:3000/hotel/create",
          { ...form, adminId },
          { withCredentials: true }
        );
      }
      setForm({ name: "", city: "", price: "", address: "" });
      setEditingHotel(null);
      fetchHotels();
    } catch (err) {
      console.error("Error saving hotel:", err);
    }
  };

  // Edit hotel
  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setForm({
      name: hotel.name,
      city: hotel.city,
      price: hotel.price,
      address: hotel.address,
    });
  };

  // Delete hotel
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/hotel/${id}`, { withCredentials: true });
      fetchHotels();
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        {editingHotel ? "Edit Hotel" : "Add New Hotel"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          background: "#f7f7f7",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <input
          name="name"
          placeholder="Hotel Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price per Night"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingHotel ? "Update Hotel" : "Create Hotel"}
        </button>

        {editingHotel && (
          <button
            type="button"
            onClick={() => {
              setEditingHotel(null);
              setForm({ name: "", city: "", price: "", address: "" });
            }}
            style={{
              background: "gray",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3 style={{ textAlign: "center" }}>Your Hotels</h3>
      <table
        border="1"
        width="100%"
        cellPadding="8"
        style={{ borderCollapse: "collapse", textAlign: "center" }}
      >
        <thead>
          <tr style={{ background: "#e6e6e6" }}>
            <th>Name</th>
            <th>City</th>
            <th>Price</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.price}</td>
                <td>{hotel.address}</td>
                <td>
                  <button
                    onClick={() => handleEdit(hotel)}
                    style={{
                      background: "orange",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hotels found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sample;
