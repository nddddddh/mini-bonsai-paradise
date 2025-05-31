
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { ChevronLeft, ShoppingCart, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', parseInt(id!))
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Lỗi",
          description: "Sản phẩm không tồn tại",
          variant: "destructive",
        });
        navigate('/products');
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Lỗi", 
        description: "Không thể tải thông tin sản phẩm",
        variant: "destructive",
      });
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image_path || '/placeholder.svg',
      category: product.category,
      stock: product.stock_quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity}x ${product.name}`,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
            <Link to="/products">
              <Button>Quay lại danh sách sản phẩm</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Use placeholder images if no image available
  const productImages = product.image_path ? [product.image_path] : ['/placeholder.svg'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-nature-600">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/products">
          <Button variant="outline" className="mb-6 border-nature-500 text-nature-700 hover:bg-nature-50">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === selectedImage ? 'border-nature-600' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-nature-600 border-nature-600">
                  {product.category}
                </Badge>
                <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                  {product.stock_quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-nature-600">
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Mô tả sản phẩm</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Chưa có mô tả cho sản phẩm này.'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold mb-3">Số lượng</h3>
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  (Còn lại {product.stock_quantity} sản phẩm)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-nature-600 hover:bg-nature-700 text-white py-3"
                disabled={product.stock_quantity <= 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock_quantity > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </Button>
              <WishlistButton 
                productId={product.product_id} 
                size="lg"
                className="border-nature-600 text-nature-600 hover:bg-nature-50"
              />
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-nature-600" />
                <span className="text-sm">Miễn phí giao hàng cho đơn từ 500.000₫</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-nature-600" />
                <span className="text-sm">Bảo hành cây cảnh 30 ngày</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-nature-600" />
                <span className="text-sm">Hỗ trợ đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
