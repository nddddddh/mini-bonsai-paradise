import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, Leaf, Droplets, Sun } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

const careGuides = [
  {
    id: 1,
    title: "Hướng dẫn chăm sóc cây cảnh trong nhà",
    description: "Các bước cơ bản để giữ cho cây cảnh của bạn luôn xanh tốt.",
    tags: ["trong nhà", "cơ bản"],
    time: "30 phút",
    difficulty: "Dễ",
    water: "Trung bình",
    light: "Gián tiếp",
    slug: "cham-soc-cay-canh-trong-nha"
  },
  {
    id: 2,
    title: "Bón phân cho cây cảnh: Khi nào và như thế nào?",
    description: "Tìm hiểu về thời điểm và cách bón phân phù hợp cho cây cảnh.",
    tags: ["bón phân", "dinh dưỡng"],
    time: "45 phút",
    difficulty: "Trung bình",
    water: "Ít",
    light: "Trực tiếp",
    slug: "bon-phan-cho-cay-canh"
  },
  {
    id: 3,
    title: "Phòng trừ sâu bệnh cho cây cảnh",
    description: "Các biện pháp phòng ngừa và điều trị sâu bệnh thường gặp.",
    tags: ["sâu bệnh", "phòng trừ"],
    time: "60 phút",
    difficulty: "Khó",
    water: "Nhiều",
    light: "Gián tiếp",
    slug: "phong-tru-sau-benh-cho-cay-canh"
  },
  {
    id: 4,
    title: "Tưới nước đúng cách cho cây cảnh",
    description: "Hướng dẫn tưới nước phù hợp với từng loại cây.",
    tags: ["tưới nước", "cơ bản"],
    time: "20 phút",
    difficulty: "Dễ",
    water: "Trung bình",
    light: "Trực tiếp",
    slug: "tuoi-nuoc-dung-cach-cho-cay-canh"
  },
  {
    id: 5,
    title: "Chọn đất phù hợp cho cây cảnh",
    description: "Các loại đất tốt nhất và cách trộn đất cho cây cảnh.",
    tags: ["đất trồng", "cơ bản"],
    time: "40 phút",
    difficulty: "Trung bình",
    water: "Ít",
    light: "Gián tiếp",
    slug: "chon-dat-phu-hop-cho-cay-canh"
  },
];

const CareGuide = ({ navigate }: PageProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = careGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hướng dẫn chăm sóc cây cảnh</h1>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm hướng dẫn..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map(guide => (
            <Card key={guide.id} className="bg-white shadow-md rounded-md overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{guide.time}</span>
                  <Leaf className="h-4 w-4 ml-4" />
                  <span>{guide.difficulty}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Droplets className="h-4 w-4" />
                  <span>{guide.water}</span>
                  <Sun className="h-4 w-4 ml-4" />
                  <span>{guide.light}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-center mt-4"
                  onClick={() => navigate('care-guide-detail', { slug: guide.slug })}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareGuide;
