
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/database';

const Favorites = () => {
  const { state } = useApp();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteProducts();
  }, [state.favorites]);

  const fetchFavoriteProducts = async () => {
    if (state.favorites.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Convert string IDs back to numbers for database query
      const favoriteIds = state.favorites.map(id => parseInt(id)).filter(id => !isNaN(id));
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('product_id', favoriteIds);

      if (error) {
        console.error('Error fetching favorite products:', error);
        return;
      }

      setFavoriteProducts(data || []);
    } catch (error) {
      console.error('Error fetching favorite products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h2>
          <Button onClick={() => window.location.href = '/'}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-500">Đang tải sản phẩm yêu thích...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Heart className="mr-3 h-8 w-8 text-red-500" />
            Sản phẩm yêu thích
          </h1>
          <p className="text-gray-600">
            {favoriteProducts.length} sản phẩm trong danh sách yêu thích của bạn
          </p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chưa có sản phẩm yêu thích
            </h3>
            <p className="text-gray-600 mb-6">
              Hãy khám phá các sản phẩm và thêm vào danh sách yêu thích của bạn
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Khám phá sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
