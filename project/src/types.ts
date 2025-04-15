export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  isAdmin: boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  validateCoupon: (code: string) => Promise<any>;
};

export interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'isAdmin'> & { password: string }) => Promise<void>;
  logout: () => void;
}