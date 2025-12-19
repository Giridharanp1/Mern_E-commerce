import { useState, useEffect } from 'react'

const Admin = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders from admin panel...')
      const res = await fetch('http://localhost:3001/api/orders/all')
      const data = await res.json()
      console.log('Raw orders data:', data)
      
      if (!data || data.length === 0) {
        console.log('No orders found in database')
        setOrders([])
        return
      }
      
      const ordersWithUsers = await Promise.all(
        data.map(async (order) => {
          try {
            const userRes = await fetch(`http://localhost:3001/api/users/${order.userId}`)
            const userData = await userRes.json()
            return { ...order, userEmail: userData.email || 'Unknown' }
          } catch {
            return { ...order, userEmail: 'Unknown' }
          }
        })
      )
      console.log('Orders with user data:', ordersWithUsers)
      setOrders(ordersWithUsers)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchOrders()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin - Order Management</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No orders found. Orders will appear here after customers place them.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.userEmail}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => updateStatus(order._id, 'pending')}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, 'delivered')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Admin