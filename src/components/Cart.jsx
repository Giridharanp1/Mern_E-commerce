import { useNavigate } from 'react-router-dom'

const Cart = ({ items, onClose, onRemove, onUpdateQuantity, user }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth')
    } else {
      navigate('/checkout')
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total: ${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                  {user ? 'Checkout' : 'Login to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart