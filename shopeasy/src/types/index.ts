export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  featured: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}
