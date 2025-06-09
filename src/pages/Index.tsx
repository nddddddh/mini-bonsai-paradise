

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import PlantCard from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import { Leaf, Truck, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";
import { PageProps } from "@/types/navigation";

const Index = ({ navigate }: PageProps) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4)
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching featured products:', error);
        return;
      }

      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transform product data to match PlantCard interface
  const transformProductToPlant = (product: Product) => ({
    id: product.product_id,
    name: product.name,
    category: "Cây cảnh",
    description: product.description || '',
    price: product.price,
    image: product.image_path || '/placeholder.svg',
    inStock: product.stock_quantity > 0,
    stock: product.stock_quantity
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar navigate={navigate} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nature-50 to-nature-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Mang thiên nhiên vào <span className="text-nature-600">ngôi nhà của bạn</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Khám phá bộ sưu tập cây cảnh mini đặc biệt, được chăm sóc kỹ lưỡng để tạo không gian xanh hoàn hảo cho mọi góc nhà.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('products')}
                size="lg" 
                className="bg-nature-600 hover:bg-nature-700 text-white px-8 py-3"
              >
                Khám phá ngay
              </Button>
              <Button 
                onClick={() => navigate('care-guide')}
                variant="outline" 
                size="lg" 
                className="border-nature-500 text-nature-700 hover:bg-nature-50 px-8 py-3"
              >
                Hướng dẫn chăm sóc
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-nature-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cây khỏe mạnh</h3>
              <p className="text-gray-600">Tất cả cây được chọn lọc kỹ lưỡng và đảm bảo chất lượng tốt nhất</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-nature-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Giao hàng tận nơi trong 24h tại Hà Nội và 48h toàn quốc</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-nature-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Đổi trả 7 ngày</h3>
              <p className="text-gray-600">Chính sách đổi trả linh hoạt trong vòng 7 ngày đầu tiên</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-nature-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid navigate={navigate} />

      {/* Latest Products Section */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sản phẩm mới nhất</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cập nhật những sản phẩm mới nhất trong bộ sưu tập cây cảnh mini của chúng tôi.
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map(product => (
                <PlantCard 
                  key={product.product_id} 
                  plant={transformProductToPlant(product)} 
                  navigate={navigate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Không có sản phẩm nào để hiển thị.</p>
            </div>
          )}
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('products')}
              variant="outline" 
              className="border-nature-500 text-nature-700 hover:bg-nature-50"
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-nature-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
          <p className="text-nature-100 mb-8 max-w-2xl mx-auto">
            Nhận thông tin về các sản phẩm mới, tips chăm sóc cây và ưu đãi đặc biệt
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-nature-600 hover:bg-gray-100 px-6 py-3">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
};

export default Index;
