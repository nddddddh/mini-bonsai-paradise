
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/use-cart';
import { Wishlist as WishlistType, Product } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface WishlistItem extends WishlistType {
  product: Product;
}

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          *,
          products(*)
        `)
        .eq('account_id', user.account_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Lỗi khi tải danh sách yêu thích');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: number) => {
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('id', wishlistId);

      if (error) throw error;

      setWishlistItems(items => items.filter(item => item.id !== wishlistId));
      toast.success('Đã xóa khỏi danh sách yêu thích');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Lỗi khi xóa khỏi danh sách yêu thích');
    }
  };

  const addToCart = (product: Product) => {
    // Convert Product to Plant format for cart compatibility
    const plantForCart = {
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image_path || '',
      category: product.category,
      stock: product.stock_quantity
    };
    
    addItem(plantForCart);
    toast.success('Đã thêm vào giỏ hàng');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-500" />
            Sản Phẩm Yêu Thích
          </h1>
          <p className="text-gray-600 mt-2">Những sản phẩm bạn đã lưu để mua sau</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Yêu Thích ({wishlistItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Đang tải...</p>
              </div>
            ) : wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Danh sách yêu thích trống
                </h3>
                <p className="text-gray-500 mb-6">
                  Hãy thêm những sản phẩm bạn yêu thích để mua sau nhé!
                </p>
                <Button onClick={() => navigate('/products')}>
                  Khám phá sản phẩm
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.product.image_path || '/placeholder.svg'} 
                        alt={item.product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-lg line-clamp-2">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.category}</p>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {item.product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xl font-bold text-nature-600">
                          {item.product.price.toLocaleString('vi-VN')}₫
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.product.stock_quantity > 0 ? (
                            <span className="text-green-600">Còn hàng</span>
                          ) : (
                            <span className="text-red-600">Hết hàng</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-nature-600 hover:bg-nature-700"
                          onClick={() => addToCart(item.product)}
                          disabled={item.product.stock_quantity <= 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {item.product.stock_quantity > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => navigate(`/products/${item.product.product_id}`)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-3">
                        Đã thêm: {new Date(item.created_at).toLocaleDateString('vi-VN')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
