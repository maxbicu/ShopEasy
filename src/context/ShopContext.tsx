import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { products } from '../data/products';

interface ShopState {
  products: Product[];
  cart: CartItem[];
  searchQuery: string;
  selectedCategory: string;
  selectedBrand: string;
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; size: string; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_BRAND'; payload: string }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: ShopState = {
  products,
  cart: [],
  searchQuery: '',
  selectedCategory: 'All',
  selectedBrand: 'All',
};

function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, size, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: `${product.id}-${size}`,
        product,
        size,
        quantity,
      };

      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'SET_BRAND':
      return {
        ...state,
        selectedBrand: action.payload,
      };

    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
}

interface ShopContextType {
  state: ShopState;
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setSearch: (query: string) => void;
  setCategory: (category: string) => void;
  setBrand: (brand: string) => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getFilteredProducts: () => Product[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopeasy-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopeasy-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, size, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const setCategory = (category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const setBrand = (brand: string) => {
    dispatch({ type: 'SET_BRAND', payload: brand });
  };

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getFilteredProducts = () => {
    return state.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchesCategory = state.selectedCategory === 'All' || product.category === state.selectedCategory;
      const matchesBrand = state.selectedBrand === 'All' || product.brand === state.selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });
  };

  return (
    <ShopContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setSearch,
        setCategory,
        setBrand,
        getCartTotal,
        getCartItemsCount,
        getFilteredProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
