
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

// Legacy Plant interface for backward compatibility
interface Plant {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  stock: number;
}

interface CartItem extends Plant {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Plant) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Plant) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Don't exceed stock
        const newQuantity = Math.min(existingItem.quantity + 1, product.stock);
        
        if (newQuantity === existingItem.quantity) {
          toast.error('Đã đạt số lượng tối đa cho sản phẩm này!');
          return prevItems;
        }
        
        toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      }
      
      toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const removeItem = (id: number) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast.info(`Đã xóa ${removedItem.name} khỏi giỏ hàng`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } 
          : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast.info('Đã xóa tất cả sản phẩm khỏi giỏ hàng');
  };
  
  const cartTotal = items.reduce((total, item) => 
    total + (item.salePrice || item.price) * item.quantity, 0
  );
  
  const getCartTotal = () => {
    return items.reduce((total, item) => 
      total + (item.salePrice || item.price) * item.quantity, 0
    );
  };
  
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      cartTotal,
      itemCount,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
