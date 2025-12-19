const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const authAPI = {
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      return res.json()
    } catch (error) {
      console.error('Login error:', error)
      return { error: 'Login failed' }
    }
  }
}

export const cartAPI = {
  add: async (userId, product) => {
    try {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, product })
      })
      return res.json()
    } catch (error) {
      console.error('Add to cart error:', error)
      return []
    }
  },
  
  remove: async (userId, productId) => {
    const res = await fetch(`${API_BASE}/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId })
    })
    return res.json()
  },
  
  update: async (userId, productId, quantity) => {
    const res = await fetch(`${API_BASE}/cart/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId, quantity })
    })
    return res.json()
  },
  
  clear: async (userId) => {
    const res = await fetch(`${API_BASE}/cart/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    return res.json()
  }
}

export const productAPI = {
  seed: async (products) => {
    const res = await fetch(`${API_BASE}/products/seed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    })
    return res.json()
  }
}

export const orderAPI = {
  create: async (userId, items, total, shippingAddress, paymentInfo) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items, total, shippingAddress, paymentInfo })
    })
    return res.json()
  }
}