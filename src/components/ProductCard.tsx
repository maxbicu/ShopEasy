import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShop();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add with default size (first available size) and quantity 1
    addToCart(product, product.sizes[0], 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Sneaker';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {product.brand}
            </span>
            {product.featured && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
          
          {/* Available Sizes Preview */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Available Sizes:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 6).map((size) => (
                <span
                  key={size}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 6 && (
                <span className="text-xs text-gray-500">+{product.sizes.length - 6} more</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
