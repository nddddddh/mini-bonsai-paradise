
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingFacebookIcon from "@/components/FloatingFacebookIcon";
import PlantCard from "@/components/PlantCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Shield, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroImage, setHeroImage] = useState<string>('/placeholder.svg');
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch featured products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .limit(8)
        .order('product_id', { ascending: false });

      if (productsError) throw productsError;
      
      setFeaturedProducts(products || []);

      // Fetch total products count
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      
      setTotalProducts(count || 0);

      // Fetch random product image for hero
      const { data: randomProduct, error: randomError } = await supabase
        .from('products')
        .select('image_path')
        .not('image_path', 'is', null)
        .limit(1)
        .order('product_id', { ascending: Math.random() > 0.5 });

      if (!randomError && randomProduct && randomProduct.length > 0) {
        const imageUrl = randomProduct[0].image_path;
        if (imageUrl) {
          // Check if it's a Supabase storage URL or external URL
          if (imageUrl.startsWith('product-images/')) {
            const { data } = supabase.storage
              .from('product-images')
              .getPublicUrl(imageUrl);
            setHeroImage(data.publicUrl);
          } else {
            setHeroImage(imageUrl);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu trang chủ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Transform Product to Plant interface
  const transformProductToPlant = (product: Product) => ({
    id: product.product_id,
    name: product.name,
    category: getCategoryName(product.category), // Convert number to string
    description: product.description || '',
    price: product.price,
    image: product.image_path || '/placeholder.svg',
    inStock: product.stock_quantity > 0,
    stock: product.stock_quantity
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-nature-50 to-nature-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Biến ngôi nhà của bạn thành{" "}
                <span className="text-nature-600">thiên đường xanh</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Khám phá bộ sưu tập cây cảnh đa dạng với hơn {totalProducts}+ loại cây trong nhà và ngoài trời. 
                Chúng tôi cung cấp những cây cảnh chất lượng cao cùng dịch vụ chăm sóc tận tâm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="lg" className="bg-nature-600 hover:bg-nature-700 text-white w-full sm:w-auto">
                    Khám phá ngay
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/care-guide">
                  <Button variant="outline" size="lg" className="border-nature-600 text-nature-600 hover:bg-nature-50 w-full sm:w-auto">
                    Hướng dẫn chăm sóc
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Cây cảnh đẹp" 
                className="w-full h-auto rounded-2xl shadow-xl object-cover"
                style={{ aspectRatio: '4/3' }}
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-8 w-8 text-nature-600" />
                  <div>
                    <p className="font-semibold">{totalProducts}+</p>
                    <p className="text-sm text-gray-600">Loại cây</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn chúng tôi?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cây cảnh chất lượng cao</h3>
              <p className="text-gray-600">Tất cả cây cảnh được chọn lọc kỹ càng từ những nhà vườn uy tín với sức khỏe tốt nhất.</p>
            </div>
            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bảo hành cây cảnh</h3>
              <p className="text-gray-600">Cam kết bảo hành 30 ngày cho tất cả cây cảnh. Đổi mới miễn phí nếu cây chết do lỗi kỹ thuật.</p>
            </div>
            <div className="text-center">
              <div className="bg-nature-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-nature-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Giao hàng tận nơi</h3>
              <p className="text-gray-600">Dịch vụ giao hàng nhanh chóng và an toàn. Miễn phí giao hàng cho đơn hàng trên 500.000đ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những loại cây cảnh được yêu thích nhất, từ cây trong nhà đến cây ngoài trời
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <PlantCard 
                  key={product.product_id} 
                  plant={transformProductToPlant(product)} 
                />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-nature-600 text-nature-600 hover:bg-nature-50">
                Xem tất cả sản phẩm
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-nature-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức</h2>
          <p className="text-nature-100 mb-8 max-w-2xl mx-auto">
            Nhận thông tin về sản phẩm mới, mẹo chăm sóc cây và ưu đãi đặc biệt qua email
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button variant="secondary" size="lg">
              Đăng ký
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating Facebook Icon */}
      <FloatingFacebookIcon />
    </div>
  );
};

export default Index;
