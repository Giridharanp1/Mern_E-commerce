import { Link, useOutletContext } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'

const Home = () => {
  const { addToCart } = useOutletContext()

  return (
    <div>
      {/* Products Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Welcome to INFINITY
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get Handpicked selection of the most innovative and popular tech gadgets
            </p>
          </div>
          <ProductGrid onAddToCart={addToCart} />
        </div>
      </section>
    </div>
  )
}

export default Home