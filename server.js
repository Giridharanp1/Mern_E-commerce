import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from './User.js'
import Product from './Product.js'
import Order from './Order.js'
import Contact from './Contact.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/infinity-store')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err))

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'INFINITY Store API Server Running', status: 'OK' })
})

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ success: false, message: 'Email already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword, name })
    await user.save()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' })
    res.json({ success: true, token, user: { id: user._id, email: user.email, name: user.name }, cart: user.cart })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Cart routes
app.post('/api/cart/add', async (req, res) => {
  try {
    const { userId, product } = req.body
    const user = await User.findById(userId)
    const existing = user.cart.find(item => item.productId === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      user.cart.push({ productId: product.id, quantity: 1, name: product.name, price: product.price })
    }
    await user.save()
    res.json(user.cart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/cart/remove', async (req, res) => {
  const { userId, productId } = req.body
  const user = await User.findById(userId)
  user.cart = user.cart.filter(item => item.productId !== productId)
  await user.save()
  res.json(user.cart)
})

app.post('/api/cart/update', async (req, res) => {
  const { userId, productId, quantity } = req.body
  const user = await User.findById(userId)
  const item = user.cart.find(item => item.productId === productId)
  if (item) item.quantity = quantity
  await user.save()
  res.json(user.cart)
})

app.post('/api/cart/clear', async (req, res) => {
  try {
    const { userId } = req.body
    console.log('Clearing cart for user:', userId)
    const user = await User.findById(userId)
    user.cart = []
    await user.save()
    console.log('Cart cleared successfully')
    res.json({ success: true, cart: [] })
  } catch (error) {
    console.error('Clear cart error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Product routes
app.post('/api/products/seed', async (req, res) => {
  const products = req.body
  await Product.deleteMany({})
  await Product.insertMany(products)
  res.json({ message: 'Products seeded' })
})

// Order routes
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total, shippingAddress, paymentInfo } = req.body
    console.log('Creating order:', { userId, items, total })
    
    if (!userId || !items || items.length === 0) {
      return res.json({ success: false, message: 'Missing required fields' })
    }
    
    const order = new Order({ userId, items, total, shippingAddress, paymentInfo, status: 'pending' })
    await order.save()
    console.log('Order saved:', order)
    res.json({ success: true, order })
  } catch (error) {
    console.error('Order creation error:', error)
    res.json({ success: false, message: error.message })
  }
})

app.get('/api/orders/all', async (req, res) => {
  try {
    console.log('Fetching all orders for admin')
    const orders = await Order.find().sort({ createdAt: -1 })
    console.log('Found orders:', orders.length)
    res.json(orders)
  } catch (error) {
    console.error('Fetch all orders error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/orders/:userId', async (req, res) => {
  try {
    console.log('Fetching orders for user:', req.params.userId)
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 })
    console.log('Found orders:', orders.length)
    res.json(orders)
  } catch (error) {
    console.error('Fetch orders error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    await Order.findByIdAndUpdate(req.params.id, { status })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({ email: user.email, name: user.name })
  } catch (error) {
    res.status(404).json({ error: 'User not found' })
  }
})

// Contact routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body)
    await contact.save()
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Server running on port 3001'))