import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Droplets,
  Sun,
  Thermometer,
  Scissors,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CareGuideDetailProps } from "@/types/navigation";

const CareGuideDetail = ({ navigate, slug }: CareGuideDetailProps) => {
  const [article, setArticle] = useState({
    title: "Hướng dẫn chăm sóc cây cảnh mini",
    author: "BonsaiHub Team",
    date: "2024-01-01",
    content: `
      <p>Chào mừng bạn đến với hướng dẫn chăm sóc cây cảnh mini toàn diện từ BonsaiHub! Trong bài viết này, chúng tôi sẽ chia sẻ những bí quyết và kỹ thuật quan trọng để giúp cây cảnh mini của bạn luôn khỏe mạnh và tươi đẹp.</p>
      
      <h2>1. Ánh sáng</h2>
      <p>Ánh sáng là yếu tố quan trọng đối với sự phát triển của cây cảnh mini. Đa số các loại cây cảnh mini cần ánh sáng mặt trời gián tiếp. Đặt cây ở nơi có ánh sáng tự nhiên, nhưng tránh ánh nắng trực tiếp vào giữa trưa để không làm cháy lá.</p>
      
      <h2>2. Tưới nước</h2>
      <p>Tưới nước đúng cách là chìa khóa để duy trì sức khỏe của cây cảnh mini. Kiểm tra độ ẩm của đất trước khi tưới. Đất nên ẩm nhưng không bị ngập úng. Tưới nước từ từ cho đến khi nước chảy ra khỏi lỗ thoát nước ở đáy chậu.</p>
      
      <h2>3. Độ ẩm</h2>
      <p>Độ ẩm là một yếu tố quan trọng khác đối với cây cảnh mini. Đa số các loại cây cảnh mini thích độ ẩm cao. Bạn có thể tăng độ ẩm bằng cách đặt cây trên một khay chứa nước hoặc sử dụng máy tạo ẩm.</p>
      
      <h2>4. Nhiệt độ</h2>
      <p>Nhiệt độ lý tưởng cho cây cảnh mini là từ 18°C đến 24°C. Tránh đặt cây ở nơi có nhiệt độ quá cao hoặc quá thấp.</p>
      
      <h2>5. Cắt tỉa</h2>
      <p>Cắt tỉa là một phần quan trọng của việc chăm sóc cây cảnh mini. Cắt tỉa giúp cây giữ được hình dáng đẹp và khuyến khích sự phát triển mới. Sử dụng kéo cắt tỉa chuyên dụng và cắt bỏ những cành lá khô, héo hoặc bị bệnh.</p>
      
      <h2>6. Bón phân</h2>
      <p>Bón phân giúp cung cấp dinh dưỡng cho cây cảnh mini. Sử dụng phân bón chuyên dụng cho cây cảnh mini và tuân thủ hướng dẫn sử dụng. Bón phân vào mùa xuân và mùa hè, khi cây đang trong giai đoạn phát triển mạnh.</p>
      
      <h2>7. Thay chậu</h2>
      <p>Thay chậu giúp cung cấp không gian cho rễ cây phát triển và thay thế đất cũ đã cạn kiệt dinh dưỡng. Thay chậu vào mùa xuân, khi cây bắt đầu phát triển trở lại sau mùa đông.</p>
      
      <h2>8. Phòng trừ sâu bệnh</h2>
      <p>Sâu bệnh có thể gây hại cho cây cảnh mini. Kiểm tra cây thường xuyên để phát hiện sớm các dấu hiệu của sâu bệnh. Sử dụng các biện pháp phòng trừ sâu bệnh tự nhiên hoặc hóa học để bảo vệ cây.</p>
      
      <p>Hy vọng hướng dẫn này sẽ giúp bạn chăm sóc cây cảnh mini của mình một cách tốt nhất. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi!</p>
    `,
    watering: "2-3 lần/tuần",
    light: "Ánh sáng gián tiếp",
    humidity: "Cao",
    temperature: "18-24°C",
    pruning: "Thường xuyên",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/care-guide')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Hướng dẫn chăm sóc
        </Button>
        
        <Card className="border-nature-200">
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <CardTitle className="text-2xl font-bold">{article.title}</CardTitle>
            <CardDescription className="text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Thông tin chung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Badge variant="outline">
                  <Droplets className="mr-2 h-4 w-4" />
                  Tưới nước: {article.watering}
                </Badge>
                <Badge variant="outline">
                  <Sun className="mr-2 h-4 w-4" />
                  Ánh sáng: {article.light}
                </Badge>
                <Badge variant="outline">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Nhiệt độ: {article.temperature}
                </Badge>
                <Badge variant="outline">
                  <Scissors className="mr-2 h-4 w-4" />
                  Cắt tỉa: {article.pruning}
                </Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Nội dung chi tiết</h3>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default CareGuideDetail;
