
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/database';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(8)
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá bộ sưu tập cây cảnh mini độc đáo, được chọn lọc kỹ lưỡng để mang đến không gian xanh hoàn hảo cho ngôi nhà của bạn.
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập cây cảnh mini độc đáo, được chọn lọc kỹ lưỡng để mang đến không gian xanh hoàn hảo cho ngôi nhà của bạn.
          </p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Không có sản phẩm nào để hiển thị.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
