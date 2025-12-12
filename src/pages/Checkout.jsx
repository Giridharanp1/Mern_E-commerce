import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Checkout = () => {
  const { cartItems, user, handleOrderComplete } = useOutletContext()
  const [orderData, setOrderData] = useState({
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleOrderComplete()
    alert('Order placed successfully!')
    navigate('/')
  }

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value })
  }

  if (!user) {
    navigate('/auth')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg pt-4">
              <span>Total: ${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shipping & Payment</h2>
            
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={orderData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={orderData.city}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={orderData.zipCode}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={orderData.cardNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={orderData.expiryDate}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={orderData.cvv}
                onChange={handleChange}
                required
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout