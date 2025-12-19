import Logo from '../assets/Logo.jpg'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About INFINITY</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2025, This is the website developed by Ridhann.
            </p>
            <p className="text-gray-600">
              Our mission is to provide high-quality electronic products at competitive prices, 
              backed by exceptional customer service and technical support.
            </p>
          </div>
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
            <img src={Logo} alt="TechStore Logo" className="h-auto w-full object-contain rounded-lg " />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Free shipping on orders over $50</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Warranty</h3>
            <p className="text-gray-600">1-year warranty on all products</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About