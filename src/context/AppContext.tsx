
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, User } from '../types';

interface SimpleCartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  user: User | null;
  cart: SimpleCartItem[];
  favorites: string[];
  isAuthenticated: boolean;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: string };

const initialState: AppState = {
  user: null,
  cart: [],
  favorites: [],
  isAuthenticated: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (username: string, password: string) => boolean;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        favorites: action.payload.favoriteProducts,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        favorites: [],
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Database mẫu với username, password và role
  const mockDatabase = [
    { username: 'admin', password: 'admin123', role: 0, name: 'Admin System', email: 'admin@bonsai.com' },
    { username: 'user1', password: 'user123', role: 1, name: 'Nguyễn Văn A', email: 'user@email.com' },
    { username: 'user2', password: 'user456', role: 1, name: 'Trần Thị B', email: 'user2@email.com' },
  ];

  const login = (username: string, password: string): boolean => {
    const userFromDB = mockDatabase.find(u => u.username === username && u.password === password);
    if (userFromDB) {
      const user: User = {
        id: userFromDB.username,
        name: userFromDB.name,
        email: userFromDB.email,
        role: userFromDB.role === 0 ? 'admin' : 'user',
        favoriteProducts: [],
        avatar: userFromDB.role === 0 
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      };
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
