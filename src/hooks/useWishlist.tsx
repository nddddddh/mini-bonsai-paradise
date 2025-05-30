
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistItems: number[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('account_id', user.account_id);

      if (error) throw error;

      setWishlistItems(data?.map(item => item.product_id) || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.includes(productId);
  };

  const toggleWishlist = async (productId: number) => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này');
      return;
    }

    try {
      const inWishlist = isInWishlist(productId);

      if (inWishlist) {
        // Remove from wishlist
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('account_id', user.account_id)
          .eq('product_id', productId);

        if (error) throw error;

        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast.success('Đã xóa khỏi danh sách yêu thích');
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from('wishlist')
          .insert({
            account_id: user.account_id,
            product_id: productId
          });

        if (error) throw error;

        setWishlistItems(prev => [...prev, productId]);
        toast.success('Đã thêm vào danh sách yêu thích');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
