import React from 'react';
import { Filter, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProductFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ProductFilters({ isOpen, onToggle }: ProductFiltersProps) {
  const { state, setCategory, setBrand } = useShop();

  const categories = ['All', 'Basketball', 'Running', 'Lifestyle', 'Skate'];
  const brands = ['All', 'Nike', 'Adidas', 'New Balance', 'Converse', 'Puma', 'Vans'];

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
  };

  const hasActiveFilters = state.selectedCategory !== 'All' || state.selectedBrand !== 'All';

  return (
    <div className={`bg-white border-b border-gray-200 ${isOpen ? 'block' : 'hidden lg:block'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h3>
          <button
            onClick={onToggle}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={state.selectedCategory === category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Brand</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={state.selectedBrand === brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Filters & Clear */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h4>
            {hasActiveFilters ? (
              <div className="space-y-2">
                {state.selectedCategory !== 'All' && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span className="text-gray-700">Category: {state.selectedCategory}</span>
                  </div>
                )}
                {state.selectedBrand !== 'All' && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm ml-2">
                    <span className="text-gray-700">Brand: {state.selectedBrand}</span>
                  </div>
                )}
                <div className="pt-2">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No active filters</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
