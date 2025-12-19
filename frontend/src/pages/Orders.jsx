import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const Orders = () => {
  const { user } = useOutletContext()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const res = await fetch(`https://mern-e-commerce-2-u41a.onrender.com/api/orders/${user.id}`)
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p>You need to login to view your orders.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">Order #{order._id.slice(-6)}</h3>
                  <p className="text-gray-600">Total: ${order.total}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders