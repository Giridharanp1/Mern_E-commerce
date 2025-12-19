const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full border">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-black text-gray-900">
            ${product.price}
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm text-gray-500">(4.8)</span>
          </div>
        </div>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-gray-900 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard