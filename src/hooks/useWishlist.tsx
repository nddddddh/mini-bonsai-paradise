
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Wishlist, Product } from '@/types/supabase';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlistItems: (Wishlist & { product: Product })[];
  loading: boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<(Wishlist & { product: Product })[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user?.account_id) {
      console.log('No user logged in, clearing wishlist');
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching wishlist for user:', user.account_id);
      
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          *,
          products(*)
        `)
        .eq('account_id', user.account_id);

      if (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
      }

      console.log('Wishlist data received:', data);
      
      // Transform the data to match our interface
      const transformedData = data?.map(item => ({
        ...item,
        product: item.products
      })) || [];

      setWishlistItems(transformedData);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Lỗi khi tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.account_id]);

  const addToWishlist = async (productId: number) => {
    if (!user?.account_id) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm yêu thích');
      return;
    }

    try {
      console.log('Adding to wishlist:', productId, 'for user:', user.account_id);
      
      const { error } = await supabase
        .from('wishlist')
        .insert({
          account_id: user.account_id,
          product_id: productId
        });

      if (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
      }

      toast.success('Đã thêm vào danh sách yêu thích');
      await fetchWishlist(); // Refresh the wishlist
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Lỗi khi thêm vào danh sách yêu thích');
    }
  };

  const removeFromWishlist = async (productId: number) => {
    if (!user?.account_id) {
      return;
    }

    try {
      console.log('Removing from wishlist:', productId, 'for user:', user.account_id);
      
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('account_id', user.account_id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
      }

      toast.success('Đã xóa khỏi danh sách yêu thích');
      await fetchWishlist(); // Refresh the wishlist
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Lỗi khi xóa khỏi danh sách yêu thích');
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        loading, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        fetchWishlist 
      }}
    >
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
