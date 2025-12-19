import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.jpg'

const Header = ({ cartCount, onCartClick, user, onLogout }) => {
  return (
    <header className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-black text-gray-900 tracking-tight hover:text-emerald-500 transition-colors">
            <img src={Logo} alt="INFINITY Logo" className="w-10 h-10 rounded-full object-cover" />
            <span>INFINITY</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group">
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
            <Link to="/about" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
                <Link to="/admin" className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">Admin</Link>
                <button onClick={onLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/auth" className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">Login</Link>
            )}
            
            <button 
              onClick={onCartClick}
              className="relative bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header