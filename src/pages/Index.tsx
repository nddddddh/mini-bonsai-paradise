
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight, Leaf, Heart, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";

const Index = () => {
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
        .limit(6)
        .order('product_id', { ascending: false });

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transform products for PlantCard component
  const transformProductForPlantCard = (product: Product) => ({
    id: product.product_id,
    name: product.name,
    category: product.category,
    description: product.description || '',
    price: product.price,
    image: product.image_path || '/placeholder.svg',
    inStock: product.stock_quantity > 0
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-nature-50 to-nature-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Mang thiên nhiên
                  <span className="text-nature-600 block">vào ngôi nhà</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Khám phá bộ sưu tập cây cảnh đa dạng, từ cây nội thất đến cây cảnh mini. 
                  Tạo không gian xanh mát, thanh khiết cho ngôi nhà của bạn.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-nature-600 hover:bg-nature-700 text-white px-8 py-3 rounded-full">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Mua sắm ngay
                  </Button>
                </Link>
                <Link to="/collections">
                  <Button variant="outline" size="lg" className="border-nature-600 text-nature-600 hover:bg-nature-50 px-8 py-3 rounded-full">
                    Xem bộ sưu tập
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-nature-600">500+</div>
                  <div className="text-sm text-gray-600">Loại cây</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nature-600">10k+</div>
                  <div className="text-sm text-gray-600">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-nature-600">98%</div>
                  <div className="text-sm text-gray-600">Hài lòng</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/placeholder.svg" 
                  alt="Beautiful plants collection" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-nature-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-nature-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến những cây cảnh chất lượng cao và dịch vụ tốt nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Chất lượng cao</h3>
                <p className="text-gray-600">
                  Tất cả cây cảnh được chọn lọc kỹ càng, đảm bảo sức khỏe và chất lượng tốt nhất
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Tư vấn chuyên nghiệp</h3>
                <p className="text-gray-600">
                  Đội ngũ chuyên gia sẵn sàng tư vấn cách chăm sóc và lựa chọn cây phù hợp
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="text-center p-8">
                <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Cộng đồng yêu cây</h3>
                <p className="text-gray-600">
                  Tham gia cộng đồng những người yêu thích cây cảnh, chia sẻ kinh nghiệm
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những cây cảnh được yêu thích nhất, phù hợp cho mọi không gian
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <PlantCard key={product.product_id} plant={transformProductForPlantCard(product)} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-nature-600 text-nature-600 hover:bg-nature-50">
                Xem tất cả sản phẩm
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thị Lan",
                comment: "Cây cảnh chất lượng tuyệt vời, tư vấn nhiệt tình. Nhà tôi giờ xanh mát hơn nhiều!",
                rating: 5
              },
              {
                name: "Trần Văn Nam",
                comment: "Dịch vụ giao hàng nhanh, cây được đóng gói cẩn thận. Rất hài lòng!",
                rating: 5
              },
              {
                name: "Lê Thị Mai",
                comment: "Đa dạng loại cây, giá cả hợp lý. Sẽ tiếp tục mua ở đây!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-nature-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bắt đầu hành trình xanh của bạn
          </h2>
          <p className="text-xl text-nature-100 mb-8 max-w-2xl mx-auto">
            Khám phá thế giới cây cảnh đa dạng và tạo nên không gian sống lý tưởng
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-white text-nature-600 hover:bg-nature-50 px-8 py-3 rounded-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Mua sắm ngay
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
