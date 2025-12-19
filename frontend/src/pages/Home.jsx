import { Link } from 'react-router-dom'
import Poster from '../assets/poster.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <img src={Poster} alt="INFINITY Poster" className="rounded-lg shadow-lg mx-auto" />
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-emerald-500">INFINITY</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your one-stop destination for premium electronic gadgets
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/products" 
              className="block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              to="/about" 
              className="block border border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-500 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home