import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Heart, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CollectionsProps } from "@/types/navigation";

const Collections = ({ navigate }: CollectionsProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collectionsData = [
    {
      id: 1,
      name: "Cây có hoa",
      description: "Tuyển chọn các loại cây cảnh có hoa đẹp và dễ chăm sóc.",
      imageUrl: "https://images.unsplash.com/photo-1563029063-26944995c617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "cay-co-hoa"
    },
    {
      id: 2,
      name: "Cây mini",
      description: "Bộ sưu tập cây cảnh mini phù hợp cho không gian nhỏ.",
      imageUrl: "https://images.unsplash.com/photo-1618937957547-50c81a9f4a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "mini"
    },
    {
      id: 3,
      name: "Cây phong thủy",
      description: "Các loại cây mang lại may mắn và tài lộc theo phong thủy.",
      imageUrl: "https://images.unsplash.com/photo-1629241494478-44739339f194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "phong-thuy"
    },
    {
      id: 4,
      name: "Cây nội thất",
      description: "Các loại cây nội thất giúp không gian sống thêm xanh mát.",
      imageUrl: "https://images.unsplash.com/photo-1587330204584-3256356c1916?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "cay-noi-that"
    },
    {
      id: 5,
      name: "Sen đá",
      description: "Tuyển chọn các loại sen đá đẹp và dễ chăm sóc.",
      imageUrl: "https://images.unsplash.com/photo-1608744245047-359e94874961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "sen-da"
    },
    {
      id: 6,
      name: "Xương rồng",
      description: "Bộ sưu tập xương rồng mini phù hợp cho không gian nhỏ.",
      imageUrl: "https://images.unsplash.com/photo-1541742072769-639763429744?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "xuong-rong"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-blend-multiply bg-nature-900 h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563029063-26944995c617?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Bộ sưu tập</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Khám phá các bộ sưu tập cây cảnh độc đáo của chúng tôi
          </p>
        </div>
      </section>
      
      {/* Collections Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionsData.map(collection => (
              <Card key={collection.id} className="bg-nature-50 border-nature-100">
                <CardHeader className="p-0">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    className="w-full h-48 object-cover rounded-t-md" 
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2">{collection.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{collection.description}</CardDescription>
                  <Button className="w-full bg-nature-600 hover:bg-nature-700" onClick={() => navigate(`/collections/${collection.category}`)}>
                    Xem bộ sưu tập <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những trải nghiệm thực tế từ khách hàng đã tin dùng sản phẩm của BonsaiHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-nature-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Tôi rất hài lòng với cây cảnh mini mà tôi đã mua từ BonsaiHub. Cây được giao đến rất nhanh chóng và đóng gói cẩn thận. Chắc chắn sẽ ủng hộ shop dài dài."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                    alt="Nguyễn Văn A" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-semibold">Nguyễn Văn A</p>
                    <p className="text-sm text-gray-500">Hà Nội</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-nature-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-gray-300 w-4 h-4 mr-1" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Cây rất đẹp và được giao hàng nhanh chóng. Dịch vụ chăm sóc khách hàng của shop rất tốt, nhân viên tư vấn nhiệt tình và chu đáo."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" 
                    alt="Trần Thị B" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-semibold">Trần Thị B</p>
                    <p className="text-sm text-gray-500">TP.HCM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-nature-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                  <Star className="text-yellow-500 w-4 h-4 mr-1" />
                </div>
                <p className="text-gray-700 mb-4">
                  "Tôi đã mua nhiều loại cây ở BonsaiHub và rất ưng ý với chất lượng sản phẩm. Cây khỏe mạnh và dễ chăm sóc, phù hợp với người mới bắt đầu."
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                    alt="Lê Văn C" 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-semibold">Lê Văn C</p>
                    <p className="text-sm text-gray-500">Đà Nẵng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-nature-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bạn đã sẵn sàng để khám phá?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Hãy bắt đầu hành trình khám phá vẻ đẹp của thiên nhiên cùng BonsaiHub ngay hôm nay.
          </p>
          <Button className="bg-nature-600 hover:bg-nature-700" onClick={() => navigate('/products')}>
            Xem tất cả sản phẩm
          </Button>
        </div>
      </section>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default Collections;
