import ProductCard from './ProductCard'
import piix from '../assets/pixel 8.jpg'
import s24 from '../assets/s24.jpg'
import m2 from '../assets/m2.jpeg'
import promax from '../assets/15promax.jpeg'
import one from '../assets/1+ 12.jpg'
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    image: promax,
    category: "Smartphones"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199,
    image: m2,
    category: "Laptops"
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    category: "Audio"
  },
  {
    id: 4,
    name: "iPad Pro",
    price: 799,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    category: "Tablets"
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    price: 899,
    image: s24,
    category: "Smartphones"
  },
  {
    id: 6,
    name: "Dell XPS 13",
    price: 1099,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    category: "Laptops"
  },
  {
    id: 7,
    name: "Google Pixel 8",
    price: 699,
    image: piix,
    category: "Smartphones"
  },
  {
    id: 8,
    name: "OnePlus 12",
    price: 799,
    image: one,
    category: "Smartphones"
  },
  {
    id: 9,
    name: "HP Spectre x360",
    price: 1299,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop",
    category: "Laptops"
  },
  {
    id: 10,
    name: "ASUS ROG Zephyrus",
    price: 1899,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop",
    category: "Laptops"
  },
  {
    id: 11,
    name: "Sony WH-1000XM5",
    price: 399,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    category: "Audio"
  },
  {
    id: 12,
    name: "Bose QuietComfort",
    price: 329,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
    category: "Audio"
  },
  {
    id: 13,
    name: "JBL Charge 5",
    price: 179,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    category: "Audio"
  },
  {
    id: 14,
    name: "Samsung Galaxy Tab S9",
    price: 899,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop",
    category: "Tablets"
  },
  {
    id: 15,
    name: "Microsoft Surface Pro",
    price: 1099,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=300&h=300&fit=crop",
    category: "Tablets"
  },
  {
    id: 16,
    name: "iPad Air",
    price: 599,
    image: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=300&h=300&fit=crop",
    category: "Tablets"
  }
]

const ProductGrid = ({ onAddToCart, selectedCategory = 'All' }) => {
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Latest Electronic Gadgets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid