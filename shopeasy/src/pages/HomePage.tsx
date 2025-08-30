import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { ProductGrid } from '../components/ProductGrid';
import { ProductFilters } from '../components/ProductFilters';
import { useShop } from '../context/ShopContext';

export function HomePage() {
  const { getFilteredProducts, state } = useShop();
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = getFilteredProducts();
  const featuredProducts = filteredProducts.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Step Into Style
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Discover the latest in branded sneakers
            </p>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Products
            </h2>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
              <p className="text-gray-600 mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                {state.searchQuery && ` for "${state.searchQuery}"`}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          <ProductFilters 
            isOpen={showFilters} 
            onToggle={() => setShowFilters(!showFilters)} 
          />

          {/* Products Grid */}
          <div className="mt-8">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>
    </div>
  );
}
