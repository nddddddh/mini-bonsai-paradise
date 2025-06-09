import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Minus, 
  Plus, 
  Share2, 
  ShoppingCart, 
  Star,
  Truck,
  Shield,
  RotateCcw,
  Leaf
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/useWishlist";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName } from "@/types/supabase";
import { products as mockProducts } from "@/data/products";
import { ProductDetailProps } from "@/types/navigation";

const ProductDetail = ({ navigate, productId }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const productIdNum = parseInt(productId);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', productIdNum)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p.product_id === productIdNum);
        setProduct(mockProduct || null);
      } else {
        // Use database data if available, otherwise fallback to mock data
        setProduct(data || null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to mock data
      const productIdNum = parseInt(productId);
      const mockProduct = mockProducts.find(p => p.product_id === productIdNum);
      setProduct(mockProduct || null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        id: product.product_id,
        image: product.image_path || '/placeholder.svg',
        stock: product.stock_quantity || 0
      });
      toast({
        title: "Thêm vào giỏ hàng thành công!",
        description: `Đã thêm ${product.name} vào giỏ hàng.`,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product.product_id);
      toast({
        title: "Thêm vào yêu thích thành công!",
        description: `Đã thêm ${product.name} vào danh sách yêu thích.`,
      });
    }
  };

  const handleRemoveFromWishlist = () => {
    if (product) {
      removeFromWishlist(product.product_id);
      toast({
        title: "Xóa khỏi yêu thích thành công!",
        description: `Đã xóa ${product.name} khỏi danh sách yêu thích.`,
      });
    }
  };

  const isProductInWishlist = product ? isInWishlist(product.product_id) : false;

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Không tìm thấy sản phẩm.</p>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Product Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul>
            <li><button onClick={() => navigate('/')} className="hover:text-nature-600">Trang chủ</button></li>
            <li><button onClick={() => navigate('/products')} className="hover:text-nature-600">Sản phẩm</button></li>
            <li>{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image_path || '/placeholder.svg'}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-gray-600 ml-2">(5.0)</span>
            </div>
            <div className="flex items-center mb-4">
              <Badge className="bg-nature-100 text-nature-700 border-none">{getCategoryName(product.category)}</Badge>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-semibold text-gray-900">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleAddToWishlist} 
                  className="p-2 rounded-full hover:bg-gray-100"
                  disabled={isProductInWishlist}
                >
                  {isProductInWishlist ? (
                    <Heart className="w-5 h-5 text-nature-600 fill-nature-600" />
                  ) : (
                    <Heart className="w-5 h-5 text-gray-400 hover:text-nature-600" />
                  )}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-400 hover:text-nature-600" />
                </button>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-gray-700">Số lượng:</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full bg-nature-600 hover:bg-nature-700 text-white" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>

            <Separator className="my-6" />

            {/* Product Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-0 shadow-none">
                <CardContent className="flex items-center space-x-4 p-0">
                  <Truck className="w-6 h-6 text-nature-600" />
                  <div>
                    <div className="font-semibold">Giao hàng toàn quốc</div>
                    <div className="text-sm text-gray-500">Miễn phí vận chuyển cho đơn hàng từ 300.000đ</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none">
                <CardContent className="flex items-center space-x-4 p-0">
                  <Shield className="w-6 h-6 text-nature-600" />
                  <div>
                    <div className="font-semibold">Bảo hành</div>
                    <div className="text-sm text-gray-500">Đổi trả trong 7 ngày nếu sản phẩm lỗi</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none">
                <CardContent className="flex items-center space-x-4 p-0">
                  <RotateCcw className="w-6 h-6 text-nature-600" />
                  <div>
                    <div className="font-semibold">Hỗ trợ đổi trả</div>
                    <div className="text-sm text-gray-500">Nếu sản phẩm không đúng mô tả</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none">
                <CardContent className="flex items-center space-x-4 p-0">
                  <Leaf className="w-6 h-6 text-nature-600" />
                  <div>
                    <div className="font-semibold">Cây khỏe mạnh</div>
                    <div className="text-sm text-gray-500">Được chăm sóc bởi chuyên gia</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.slice(0, 4).map(relatedProduct => (
              <PlantCard key={relatedProduct.product_id} plant={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default ProductDetail;
