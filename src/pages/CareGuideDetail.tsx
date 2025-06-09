import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Leaf, Droplets, Sun, Thermometer, Scissors, Bug } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

interface CareGuideDetailProps extends PageProps {
  slug?: string;
}

const guides = [
  {
    slug: 'watering-bonsai',
    title: 'Hướng dẫn tưới nước cho cây cảnh Bonsai',
    description: 'Tìm hiểu cách tưới nước đúng cách cho cây cảnh bonsai của bạn để đảm bảo sức khỏe và sự phát triển của cây.',
    icon: Leaf,
    sections: [
      {
        title: 'Tần suất tưới nước',
        content: 'Tưới nước cho cây cảnh bonsai của bạn khi đất trên bề mặt khô khi chạm vào. Tần suất tưới nước sẽ phụ thuộc vào loại cây, kích thước của chậu và điều kiện môi trường.',
        icon: Clock,
      },
      {
        title: 'Phương pháp tưới nước',
        content: 'Tưới nước cho cây cảnh bonsai của bạn bằng bình tưới có vòi sen mịn. Tưới nước cho đến khi nước chảy ra khỏi lỗ thoát nước ở đáy chậu. Tránh tưới nước lên lá, vì điều này có thể dẫn đến bệnh tật.',
        icon: Droplets,
      },
      {
        title: 'Lời khuyên bổ sung',
        content: '• Sử dụng nước máy hoặc nước mưa để tưới cây cảnh bonsai của bạn.\n' +
          '• Tránh tưới nước cho cây cảnh bonsai của bạn vào giữa trưa, vì điều này có thể làm cháy lá.\n' +
          '• Vào mùa đông, bạn có thể cần tưới nước cho cây cảnh bonsai của mình ít thường xuyên hơn.',
        icon: Sun,
      },
    ],
  },
  {
    slug: 'pruning-bonsai',
    title: 'Hướng dẫn tỉa cây cảnh Bonsai',
    description: 'Tìm hiểu cách tỉa cây cảnh bonsai của bạn để duy trì hình dạng và kích thước của cây.',
    icon: Scissors,
    sections: [
      {
        title: 'Thời điểm tỉa cây',
        content: 'Thời điểm tốt nhất để tỉa cây cảnh bonsai của bạn là vào đầu mùa xuân, trước khi cây bắt đầu phát triển mới. Bạn cũng có thể tỉa cây cảnh bonsai của mình trong suốt mùa hè để duy trì hình dạng của cây.',
        icon: Clock,
      },
      {
        title: 'Cách tỉa cây',
        content: 'Sử dụng một cặp kéo tỉa sắc bén để tỉa cây cảnh bonsai của bạn. Cắt bỏ bất kỳ cành cây nào chết, bị bệnh hoặc bị hư hỏng. Bạn cũng có thể cắt tỉa những cành cây mọc quá dài hoặc làm mất hình dạng của cây.',
        icon: Scissors,
      },
      {
        title: 'Lời khuyên bổ sung',
        content: '• Đừng tỉa quá nhiều cây cảnh bonsai của bạn cùng một lúc.\n' +
          '• Sau khi tỉa cây cảnh bonsai của bạn, hãy tưới nước cho cây và bón phân cho cây.',
        icon: Leaf,
      },
    ],
  },
  {
    slug: 'fertilizing-bonsai',
    title: 'Hướng dẫn bón phân cho cây cảnh Bonsai',
    description: 'Tìm hiểu cách bón phân cho cây cảnh bonsai của bạn để cung cấp cho cây những chất dinh dưỡng cần thiết để phát triển.',
    icon: Thermometer,
    sections: [
      {
        title: 'Thời điểm bón phân',
        content: 'Thời điểm tốt nhất để bón phân cho cây cảnh bonsai của bạn là vào mùa xuân và mùa hè, khi cây đang tích cực phát triển. Bạn có thể bón phân cho cây cảnh bonsai của mình mỗi hai tuần một lần.',
        icon: Clock,
      },
      {
        title: 'Loại phân bón',
        content: 'Sử dụng phân bón được thiết kế đặc biệt cho cây cảnh bonsai. Bạn có thể tìm thấy những loại phân bón này tại hầu hết các trung tâm làm vườn. Làm theo hướng dẫn trên nhãn phân bón.',
        icon: Thermometer,
      },
      {
        title: 'Lời khuyên bổ sung',
        content: '• Đừng bón phân quá nhiều cho cây cảnh bonsai của bạn.\n' +
          '• Tưới nước cho cây cảnh bonsai của bạn sau khi bón phân.',
        icon: Leaf,
      },
    ],
  },
  {
    slug: 'pest-control-bonsai',
    title: 'Hướng dẫn kiểm soát dịch hại cho cây cảnh Bonsai',
    description: 'Tìm hiểu cách kiểm soát dịch hại trên cây cảnh bonsai của bạn để giữ cho cây khỏe mạnh.',
    icon: Bug,
    sections: [
      {
        title: 'Các loại dịch hại phổ biến',
        content: 'Một số loại dịch hại phổ biến có thể tấn công cây cảnh bonsai bao gồm rệp, rệp vừng và nhện đỏ.',
        icon: Bug,
      },
      {
        title: 'Cách kiểm soát dịch hại',
        content: 'Có một số cách để kiểm soát dịch hại trên cây cảnh bonsai của bạn. Bạn có thể sử dụng thuốc trừ sâu, thuốc diệt nấm hoặc các biện pháp kiểm soát dịch hại tự nhiên.',
        icon: Thermometer,
      },
      {
        title: 'Lời khuyên bổ sung',
        content: '• Kiểm tra cây cảnh bonsai của bạn thường xuyên để tìm dịch hại.\n' +
          '• Nếu bạn tìm thấy dịch hại, hãy xử lý chúng ngay lập tức.',
        icon: Leaf,
      },
    ],
  },
];

const CareGuideDetail = ({ navigate, slug }: CareGuideDetailProps) => {
  const guide = guides.find((guide) => guide.slug === slug);

  if (!guide) {
    return (
      <>
        <Navbar navigate={navigate} />
        <div className="container mx-auto py-16 px-4">
          <Card>
            <CardHeader>
              <CardTitle>Không tìm thấy hướng dẫn</CardTitle>
              <CardContent>
                <p>Không tìm thấy hướng dẫn chăm sóc cây cảnh bonsai với slug "{slug}".</p>
                <Button onClick={() => navigate('care-guide')} className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại trang hướng dẫn
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-16 px-4">
        <Button onClick={() => navigate('care-guide')} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại trang hướng dẫn
        </Button>
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <guide.icon className="w-6 h-6 text-nature-600" />
              <CardTitle className="text-2xl font-bold">{guide.title}</CardTitle>
            </div>
            <CardContent>
              <p className="text-gray-600">{guide.description}</p>
            </CardContent>
          </CardHeader>
          <CardContent className="space-y-4">
            {guide.sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-nature-500" />
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                <p className="text-gray-700">{section.content}</p>
                {index < guide.sections.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default CareGuideDetail;
