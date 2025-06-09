
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/database';
import { PageProps } from '@/types/navigation';

const Favorites = ({ navigate }: PageProps) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*');

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
            <Button onClick={() => navigate('home')}>
              Khám phá sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
