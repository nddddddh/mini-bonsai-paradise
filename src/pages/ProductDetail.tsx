
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Minus, Plus, Star, Truck, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { useCart } from "@/hooks/use-cart";
import { plants } from "@/data/plants";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedPlants, setRelatedPlants] = useState<any[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const product = plants.find(p => p.id === parseInt(id));
      if (product) {
        setPlant(product);
        setActiveImage(product.images[0]);
        
        // Get related plants from same category, excluding current plant
        const related = plants
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        setRelatedPlants(related);
      }
    }
    
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (plant?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (plant) {
      for (let i = 0; i < quantity; i++) {
        addItem(plant);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <p className="text-lg text-gray-600">Đang tải...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h2>
            <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không có trong cửa hàng của chúng tôi.</p>
            <Link to="/products">
              <Button>Quay lại cửa hàng</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
          <Link to={`/collections/${plant.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-nature-600">
            {plant.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{plant.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden border shadow-sm">
              <img 
                src={activeImage} 
                alt={plant.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {plant.images.map((image: string, index: number) => (
                <div 
                  key={index} 
                  className={`cursor-pointer rounded-md overflow-hidden border ${activeImage === image ? 'border-nature-600 ring-2 ring-nature-300' : 'border-gray-200'}`}
                  onClick={() => setActiveImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${plant.name} - Hình ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-500">
                <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                <Star className="fill-gray-200 stroke-gray-200 w-4 h-4" />
              </div>
              <span className="text-sm text-gray-500 ml-2">(14 đánh giá)</span>
            </div>
            
            <div className="mb-6">
              {plant.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-nature-600">{plant.salePrice.toLocaleString('vi-VN')}₫</span>
                  <span className="text-xl text-gray-400 line-through">{plant.price.toLocaleString('vi-VN')}₫</span>
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                    -{Math.round(((plant.price - plant.salePrice) / plant.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">{plant.price.toLocaleString('vi-VN')}₫</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">
              {plant.description}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Số lượng:</span>
                <span className={`text-sm ${plant.stock < 10 ? 'text-amber-600' : 'text-nature-600'}`}>
                  {plant.stock < 10 ? `Chỉ còn ${plant.stock} sản phẩm` : 'Còn hàng'}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="border-t border-b border-gray-300 py-2 px-4 w-12 text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= plant.stock}
                  className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="bg-nature-600 hover:bg-nature-700 text-white flex-grow py-6"
                disabled={plant.stock <= 0}
              >
                {plant.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </Button>
              <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="bg-nature-100 rounded-full p-2 mr-3">
                  <Truck className="w-5 h-5 text-nature-600" />
                </div>
                <div>
                  <p className="font-medium">Miễn phí vận chuyển</p>
                  <p className="text-sm text-gray-600">Cho đơn hàng trên 500.000₫</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-nature-100 rounded-full p-2 mr-3">
                  <ShieldCheck className="w-5 h-5 text-nature-600" />
                </div>
                <div>
                  <p className="font-medium">Đổi trả trong 7 ngày</p>
                  <p className="text-sm text-gray-600">Nếu cây không khỏe mạnh khi nhận hàng</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Danh mục:</span> {plant.category}
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
              <TabsTrigger value="details" className="rounded-none border-b-2 data-[state=active]:border-nature-600">
                Chi tiết sản phẩm
              </TabsTrigger>
              <TabsTrigger value="care" className="rounded-none border-b-2 data-[state=active]:border-nature-600">
                Hướng dẫn chăm sóc
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 data-[state=active]:border-nature-600">
                Đánh giá (14)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="py-6">
              <div className="max-w-3xl">
                <p className="mb-4 text-gray-700">
                  {plant.description}
                </p>
                
                <h3 className="font-semibold text-lg mt-6 mb-3">Đặc điểm nổi bật:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {plant.features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="care" className="py-6">
              <div className="max-w-3xl">
                <p className="mb-6 text-gray-700">
                  Chăm sóc đúng cách sẽ giúp cây phát triển khỏe mạnh và tươi tốt. Hãy làm theo hướng dẫn bên dưới để {plant.name} của bạn luôn trong tình trạng tốt nhất.
                </p>
                
                {plant.careInstructions ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
                      <h3 className="font-semibold text-lg mb-3">Ánh sáng</h3>
                      <p className="text-gray-700">{plant.careInstructions.light}</p>
                    </div>
                    
                    <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
                      <h3 className="font-semibold text-lg mb-3">Tưới nước</h3>
                      <p className="text-gray-700">{plant.careInstructions.water}</p>
                    </div>
                    
                    <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
                      <h3 className="font-semibold text-lg mb-3">Nhiệt độ</h3>
                      <p className="text-gray-700">{plant.careInstructions.temperature}</p>
                    </div>
                    
                    <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
                      <h3 className="font-semibold text-lg mb-3">Độ ẩm</h3>
                      <p className="text-gray-700">{plant.careInstructions.humidity}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 italic">Thông tin chăm sóc đang được cập nhật.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-6">
              <div className="max-w-3xl">
                <div className="flex items-start mb-8">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                      <span className="text-nature-600 font-bold">TH</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold">Trần Hương</h4>
                      <span className="text-sm text-gray-500 ml-3">2 tuần trước</span>
                    </div>
                    <div className="flex items-center text-yellow-500 mb-2">
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                    </div>
                    <p className="text-gray-700">
                      Sản phẩm tuyệt vời, giao hàng nhanh và đóng gói cẩn thận. Cây khỏe mạnh và đẹp hơn trong ảnh nhiều. Rất hài lòng!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center">
                      <span className="text-nature-600 font-bold">NN</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold">Nguyễn Nam</h4>
                      <span className="text-sm text-gray-500 ml-3">1 tháng trước</span>
                    </div>
                    <div className="flex items-center text-yellow-500 mb-2">
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-yellow-500 stroke-yellow-500 w-4 h-4" />
                      <Star className="fill-gray-200 stroke-gray-200 w-4 h-4" />
                    </div>
                    <p className="text-gray-700">
                      Cây rất đẹp và khỏe mạnh. Mình rất thích chậu gốm đi kèm, rất hợp với không gian làm việc. Sẽ mua thêm sản phẩm khác từ shop.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  Xem tất cả đánh giá
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
