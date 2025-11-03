import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from 'js-cookie'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Payment(props) {
  const port = "http://localhost:3000"
  const {totalPrice} = props
  const {bookingid} = useParams()
  const navigate = useNavigate()
  const today = new Date().toISOString().split("T")[0];
  const [cardHolder , setCardHolder] = useState('')
  const [cardNum , setCardNum] = useState('')
  const [expiryDate , setExpiryDate] = useState(today)
  const [click, setClick] = useState(true)
  // const [cvv , setCvv] = useState('')
  
    
  
      const onChangeCardHolder = (e) => {
        setCardHolder(e.target.value)
      }
      const onChangeCardNum = (e) => {
        setCardNum(e.target.value)
      }
      const onChangeExpiryDate = (e) => {
        setExpiryDate(e.target.value)
      }
    
        const onSubmitPayment = async(e) => {
           e.preventDefault()
           if(!cardNum || !cardHolder){
                alert("Enter valid details")
                return 
           }

            const token = Cookies.get("jwtToken"); // if you require auth
            const email = Cookies.get("email")
            
            const date = new Date().toISOString();
      
            const payload = { bookingId : bookingid, date, cardNum ,amount:totalPrice , cardHolderName : cardHolder, cardExpMonth: new Date(expiryDate).getMonth() + 1,cardExpYear: new Date(expiryDate).getFullYear()};
           
           const response = await fetch(`${port}/hotel/payment`, {
             method : "POST",
             headers : {
                "Content-Type" : "application/json",
                 Accept : "application/json",
                 Authorization : `Bearer ${token}`
             },
             body : JSON.stringify(payload)
           })
           const data = await response.json()
           navigate('/success')
          //  try {
          //     navigate('/success')
          //     console.log(data.transactionId)
          //  } catch (error) {
          //      `Error: ${data.message || "Something went wrong"}`;
          //  }
          //  console.log("Total Price in Payment page:", totalPrice);

        }
        function payBut(){
          setClick(false)
        }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Payment Details
        </h2>

        <form className="space-y-4" onSubmit={onSubmitPayment}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={onChangeCardHolder}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Card Number</label>
            <input
              type="password"
              value={cardNum}
              maxLength = "4"
              onChange={onChangeCardNum}
              placeholder="Enter the last four digits"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={onChangeExpiryDate}
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">CVV</label>
              <input
                type="password"
                value={cvv}
                onChange={onChangeCvv}
                placeholder="***"
                maxLength="3"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div> */}
          </div>

          <div>
            <p className="block text-sm text-gray-600 mb-1">Amount</p>
            <p>{totalPrice}</p>
          </div>

          <button
            type="submit" onClick = {payBut}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {click ? "Pay Now" : "Proccessing....."}
          </button>
           
        </form>
      </div>
    </div>
  );
}


export default Payment