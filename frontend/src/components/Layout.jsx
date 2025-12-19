import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'
// import { authAPI, cartAPI, productAPI, orderAPI } from '../services/api'

const Layout = () => {
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [user, setUser] = useState(null)

  const addToCart = async (product) => {
    if (user) {
      try {
        const response = await fetch('http://localhost:3001/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, product })
        })
        const updatedCart = await response.json()
        if (updatedCart && !updatedCart.error) {
          setCartItems(updatedCart)
        }
      } catch (error) {
        console.error('Add to cart error:', error)
      }
    } else {
      // Fallback for non-logged users
      setCartItems(prev => {
        const existing = prev.find(item => item.productId === product.id)
        if (existing) {
          return prev.map(item => 
            item.productId === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return [...prev, { productId: product.id, quantity: 1, name: product.name, price: product.price }]
      })
    }
  }

  const removeFromCart = async (id) => {
    if (user) {
      try {
        const response = await fetch('http://localhost:3001/api/cart/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: id })
        })
        const updatedCart = await response.json()
        setCartItems(updatedCart)
      } catch (error) {
        console.error('Remove from cart error:', error)
      }
    }
  }

  const updateQuantity = async (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    if (user) {
      try {
        const response = await fetch('http://localhost:3001/api/cart/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, productId: id, quantity })
        })
        const updatedCart = await response.json()
        setCartItems(updatedCart)
      } catch (error) {
        console.error('Update cart error:', error)
      }
    }
  }

  const handleLogin = (userData, cartData) => {
    setUser(userData)
    setCartItems(cartData || [])
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleOrderComplete = () => {
    setCartItems([])
  }

  // Seed products on component mount
  // useState(() => {
  //   const seedProducts = async () => {
  //     const products = [
  //       { id: 1, name: "iPhone 15 Pro", price: 999, category: "Smartphones" },
  //       { id: 2, name: "MacBook Air M2", price: 1199, category: "Laptops" },
  //       { id: 3, name: "AirPods Pro", price: 249, category: "Audio" },
  //       { id: 4, name: "iPad Pro", price: 799, category: "Tablets" }
  //     ]
  //     await productAPI.seed(products)
  //   }
  //   seedProducts()
  // }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(!showCart)}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        <Outlet context={{ addToCart, handleLogin, cartItems, user, handleOrderComplete }} />
      </main>
      <Footer />
      {showCart && (
        <Cart 
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          user={user}
        />
      )}
    </div>
  )
}

export default Layout