import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'

const Products = () => {
  const { addToCart } = useOutletContext()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Smartphones', 'Laptops', 'Audio', 'Tablets']

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <ProductGrid onAddToCart={addToCart} selectedCategory={selectedCategory} />
    </div>
  )
}

export default Products