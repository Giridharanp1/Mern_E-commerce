import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black mb-4">INFINITY</h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Premium electronic gadgets for the modern lifestyle. 
              Quality, innovation, and customer satisfaction guaranteed.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <span className="text-sm">t</span>
              </div>
              <div className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
                <span className="text-sm">i</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Warranty</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2025 INFINITY. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer