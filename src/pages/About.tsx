
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building, 
  Handshake, 
  Award, 
  Heart, 
  MapPin, 
  PhoneIcon, 
  Mail
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center bg-blend-multiply bg-nature-900 h-[400px] flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Về BonsaiHub</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Hành trình của chúng tôi trong việc kết nối con người với thiên nhiên qua nghệ thuật cây cảnh mini
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  BonsaiHub được thành lập vào năm 2018 bởi một nhóm những người đam mê cây cảnh và thiên nhiên. Xuất phát từ một cửa hàng nhỏ tại Hà Nội, chúng tôi đã phát triển thành một trong những nhà cung cấp cây cảnh mini hàng đầu Việt Nam.
                </p>
                <p className="text-gray-700">
                  Điều khiến BonsaiHub khác biệt là sự tận tâm của chúng tôi trong việc lựa chọn và chăm sóc từng cây trước khi đến tay khách hàng. Mỗi sản phẩm đều được chăm sóc cẩn thận bởi các chuyên gia có nhiều năm kinh nghiệm trong lĩnh vực bonsai và cây cảnh mini.
                </p>
                <p className="text-gray-700 font-medium">
                  "Niềm đam mê của chúng tôi là mang vẻ đẹp của thiên nhiên vào không gian sống của bạn, dù đó là căn hộ nhỏ hay văn phòng làm việc."
                </p>
              </div>
              
              <div className="mt-8">
                <Link to="/products">
                  <Button className="bg-nature-600 hover:bg-nature-700">
                    Khám phá bộ sưu tập
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1482859454392-5b7c972ab642?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Câu chuyện của BonsaiHub" 
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl hidden md:block">
                <p className="font-bold text-nature-700">Thành lập từ 2018</p>
                <p className="text-sm text-gray-600">5+ năm kinh nghiệm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Vision and Mission */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tầm nhìn & Sứ mệnh</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi tin rằng mỗi góc nhỏ trong không gian sống đều có thể trở nên sinh động và gần gũi với thiên nhiên hơn.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-nature-200">
              <CardHeader className="bg-nature-100 border-b border-nature-200">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-nature-600 w-5 h-5" />
                  Tầm nhìn
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Trở thành người bạn đồng hành tin cậy trong việc tạo nên không gian sống xanh, đẹp và lành mạnh cho mọi người. Chúng tôi mong muốn lan tỏa tình yêu với cây cảnh và giúp mọi người kết nối sâu sắc hơn với thiên nhiên thông qua nghệ thuật cây cảnh mini.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-nature-200">
              <CardHeader className="bg-nature-100 border-b border-nature-200">
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="text-nature-600 w-5 h-5" />
                  Sứ mệnh
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Cung cấp những sản phẩm cây cảnh mini chất lượng cao, đa dạng và phù hợp với nhiều không gian sống khác nhau. Đồng thời, chúng tôi cam kết chia sẻ kiến thức và kỹ năng chăm sóc cây để giúp khách hàng duy trì sự tươi tốt lâu dài cho cây của họ.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn BonsaiHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi tự hào về sự khác biệt của mình trong ngành cây cảnh mini
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <Award className="text-nature-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất lượng đảm bảo</h3>
              <p className="text-gray-700">
                Tất cả cây cảnh của chúng tôi đều được chọn lọc kỹ lưỡng và chăm sóc bởi những người có nhiều năm kinh nghiệm, đảm bảo sức khỏe và sự phát triển tốt.
              </p>
            </div>
            
            <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <Users className="text-nature-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Đội ngũ chuyên gia</h3>
              <p className="text-gray-700">
                Đội ngũ của chúng tôi bao gồm những chuyên gia về bonsai và cây cảnh mini, sẵn sàng tư vấn và hỗ trợ bạn trong việc lựa chọn và chăm sóc cây.
              </p>
            </div>
            
            <div className="bg-nature-50 p-6 rounded-lg border border-nature-100">
              <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                <Handshake className="text-nature-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dịch vụ chu đáo</h3>
              <p className="text-gray-700">
                Từ lựa chọn đến giao hàng và hỗ trợ sau bán, chúng tôi đảm bảo một trải nghiệm mua sắm trọn vẹn và hài lòng cho khách hàng.
              </p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Các giá trị cốt lõi</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-nature-700 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Tính bền vững</h4>
                      <p className="text-gray-700">Chúng tôi thực hiện các phương pháp bền vững trong việc trồng và chăm sóc cây, đảm bảo tác động tối thiểu đến môi trường.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-nature-700 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Sáng tạo</h4>
                      <p className="text-gray-700">Chúng tôi không ngừng sáng tạo và phát triển các thiết kế mới, kết hợp giữa truyền thống và hiện đại.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-nature-700 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Chia sẻ kiến thức</h4>
                      <p className="text-gray-700">Chúng tôi tin tưởng vào việc chia sẻ kiến thức và giáo dục khách hàng về cách chăm sóc cây của họ.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4">Câu hỏi thường gặp</h3>
                <div className="space-y-4">
                  <Collapsible className="border rounded-md overflow-hidden">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium bg-nature-50 hover:bg-nature-100">
                      Làm thế nào để chọn cây phù hợp với không gian của tôi?
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="m6 9 6 6 6-6"/></svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-white">
                      <p className="text-gray-700">
                        Chúng tôi đề xuất xem xét kích thước không gian, lượng ánh sáng, độ ẩm và thời gian bạn có thể dành cho việc chăm sóc. Đội ngũ tư vấn của chúng tôi luôn sẵn sàng giúp bạn chọn cây phù hợp nhất.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border rounded-md overflow-hidden">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium bg-nature-50 hover:bg-nature-100">
                      BonsaiHub có cung cấp dịch vụ chăm sóc cây không?
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="m6 9 6 6 6-6"/></svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-white">
                      <p className="text-gray-700">
                        Có, chúng tôi có dịch vụ chăm sóc cây định kỳ dành cho các doanh nghiệp và cá nhân. Ngoài ra, chúng tôi cũng tổ chức các buổi workshop hướng dẫn cách chăm sóc cây cảnh mini.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border rounded-md overflow-hidden">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left font-medium bg-nature-50 hover:bg-nature-100">
                      Các sản phẩm của BonsaiHub có thể làm quà tặng không?
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="m6 9 6 6 6-6"/></svg>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-white">
                      <p className="text-gray-700">
                        Tất nhiên! Cây cảnh mini là món quà ý nghĩa và độc đáo. Chúng tôi cung cấp dịch vụ đóng gói quà tặng và có thể gửi kèm theo một tấm thiệp với lời nhắn cá nhân của bạn.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-nature-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gặp gỡ những người đứng sau BonsaiHub - đam mê, kinh nghiệm và sáng tạo
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                alt="Nguyễn Văn An" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Nguyễn Văn An</h3>
                <p className="text-nature-600">Nhà sáng lập & CEO</p>
                <p className="text-sm text-gray-600 mt-2">
                  Với 15 năm kinh nghiệm trong lĩnh vực cây cảnh và trang trí nội thất.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                alt="Trần Thị Mai" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Trần Thị Mai</h3>
                <p className="text-nature-600">Chuyên gia Bonsai</p>
                <p className="text-sm text-gray-600 mt-2">
                  Chuyên gia với hơn 10 năm trong nghệ thuật tạo hình và chăm sóc bonsai.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                alt="Lê Minh Đức" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Lê Minh Đức</h3>
                <p className="text-nature-600">Giám đốc vận hành</p>
                <p className="text-sm text-gray-600 mt-2">
                  Phụ trách hoạt động kinh doanh và phát triển quan hệ đối tác.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" 
                alt="Phạm Hoài Anh" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">Phạm Hoài Anh</h3>
                <p className="text-nature-600">Chuyên gia chăm sóc</p>
                <p className="text-sm text-gray-600 mt-2">
                  Chịu trách nhiệm hỗ trợ khách hàng và phát triển hướng dẫn chăm sóc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Có thắc mắc hoặc cần tư vấn? Đừng ngần ngại liên hệ với đội ngũ BonsaiHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Địa chỉ</h3>
                <p className="text-gray-700">
                  123 Đường Lê Lợi<br />
                  Quận Hoàn Kiếm<br />
                  Hà Nội, Việt Nam
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <PhoneIcon className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Điện thoại</h3>
                <p className="text-gray-700 mb-2">
                  Bán hàng: 028 1234 5678
                </p>
                <p className="text-gray-700">
                  Hỗ trợ: 028 8765 4321
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-nature-100">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-nature-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-700 mb-2">
                  info@bonsaihub.vn
                </p>
                <p className="text-gray-700">
                  support@bonsaihub.vn
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="mb-6 text-lg text-gray-700">
              Ghé thăm cửa hàng của chúng tôi
            </p>
            <div className="bg-nature-50 p-4 rounded-lg inline-block">
              <p className="font-semibold">Giờ mở cửa:</p>
              <p className="text-gray-700">
                Thứ 2 - Thứ 6: 8:00 - 20:00<br />
                Thứ 7 - Chủ Nhật: 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
