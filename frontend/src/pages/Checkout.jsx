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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted')
    console.log('User:', user)
    console.log('Cart items:', cartItems)
    
    if (!user || !cartItems.length) {
      alert('Please login and add items to cart')
      return
    }
    
    try {
      console.log('Sending order request...')
      const response = await fetch('https://mern-e-commerce-2-u41a.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          total,
          shippingAddress: { address: orderData.address, city: orderData.city, zipCode: orderData.zipCode },
          paymentInfo: { cardNumber: orderData.cardNumber, expiryDate: orderData.expiryDate }
        })
      })
      const result = await response.json()
      console.log('Order response:', result)
      
      if (result.success) {
        console.log('Clearing cart...')
        const clearResponse = await fetch('https://mern-e-commerce-2-u41a.onrender.com/api/cart/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        })
        const clearResult = await clearResponse.json()
        console.log('Clear cart response:', clearResult)
        
        if (clearResult.success) {
          handleOrderComplete()
        }
        alert('Order placed successfully!')
        navigate('/orders')
      } else {
        console.log('Order failed with result:', result)
        alert('Order failed: ' + (result.message || result.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Error placing order: ' + error.message)
    }
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
              <div key={item.productId || item.id} className="flex justify-between py-2 border-b">
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