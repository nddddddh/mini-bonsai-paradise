import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  Sun, 
  Thermometer, 
  Scissors,
  Calendar,
  BookOpen,
  Search,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CareGuideProps } from "@/types/navigation";

const CareGuide = ({ navigate }: CareGuideProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const careGuides = [
    {
      id: 1,
      title: "Hướng dẫn chăm sóc cây cảnh trong nhà",
      description: "Tìm hiểu cách chăm sóc cây cảnh trong nhà để tạo không gian xanh mát và thư giãn.",
      imageUrl: "https://images.unsplash.com/photo-1497252602974-9659886822aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      slug: "cham-soc-cay-canh-trong-nha"
    },
    {
      id: 2,
      title: "Bí quyết tưới nước cho cây cảnh",
      description: "Hướng dẫn chi tiết về cách tưới nước đúng cách để cây luôn khỏe mạnh và xanh tốt.",
      imageUrl: "https://images.unsplash.com/photo-1563018704-99a644f7111f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      slug: "bi-quyet-tuoi-nuoc-cho-cay-canh"
    },
    {
      id: 3,
      title: "Ánh sáng và nhiệt độ lý tưởng cho cây cảnh",
      description: "Khám phá cách cung cấp ánh sáng và nhiệt độ phù hợp để cây phát triển tốt nhất.",
      imageUrl: "https://images.unsplash.com/photo-1517422474134-99924a935ca4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      slug: "anh-sang-va-nhiet-do-ly-tuong-cho-cay-canh"
    },
    {
      id: 4,
      title: "Cách cắt tỉa và tạo dáng cây cảnh",
      description: "Hướng dẫn các kỹ thuật cắt tỉa và tạo dáng cây cảnh để tạo nên những tác phẩm nghệ thuật độc đáo.",
      imageUrl: "https://images.unsplash.com/photo-1622543895549-99146901e4bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      slug: "cach-cat-tia-va-tao-dang-cay-canh"
    },
    {
      id: 5,
      title: "Lịch chăm sóc cây cảnh theo mùa",
      description: "Hướng dẫn chăm sóc cây cảnh theo từng mùa để đảm bảo cây luôn khỏe mạnh và phát triển tốt.",
      imageUrl: "https://images.unsplash.com/photo-1587330774474-9e9c513c2628?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      slug: "lich-cham-soc-cay-canh-theo-mua"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-blend-multiply bg-nature-900 h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519232399394-113e6c4c6935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hướng dẫn chăm sóc cây cảnh</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Tìm hiểu bí quyết chăm sóc cây cảnh để tạo không gian xanh mát và thư giãn
          </p>
        </div>
      </section>
      
      {/* Search Bar */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm hướng dẫn..."
              className="w-full px-10 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nature-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>
      
      {/* Care Guides */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careGuides.map(guide => (
              <Card key={guide.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={guide.imageUrl} 
                  alt={guide.title} 
                  className="w-full h-52 object-cover object-center" 
                />
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-semibold mb-2">{guide.title}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{guide.description}</CardDescription>
                  <Button className="bg-nature-600 hover:bg-nature-700 w-full" onClick={() => navigate(`/care-guide/${guide.slug}`)}>
                    Xem chi tiết <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tài nguyên hữu ích</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá thêm các tài liệu và công cụ hỗ trợ chăm sóc cây cảnh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Blog về cây cảnh</h3>
                <p className="text-gray-700">
                  Đọc các bài viết chuyên sâu về kỹ thuật trồng và chăm sóc cây cảnh từ các chuyên gia hàng đầu.
                </p>
                <Button variant="link" className="mt-4">
                  Xem thêm <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lịch chăm sóc cây</h3>
                <p className="text-gray-700">
                  Tạo lịch chăm sóc cây cảnh cá nhân để không bỏ lỡ bất kỳ công việc quan trọng nào.
                </p>
                <Button variant="link" className="mt-4">
                  Xem thêm <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <Droplets className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Hướng dẫn tưới nước</h3>
                <p className="text-gray-700">
                  Tìm hiểu cách tưới nước đúng cách cho từng loại cây cảnh để đảm bảo cây luôn đủ nước.
                </p>
                <Button variant="link" className="mt-4">
                  Xem thêm <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default CareGuide;
