
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Care guide categories and content
const careCategories = [
  { id: 'basics', name: 'Kiến thức cơ bản', icon: '🌱' },
  { id: 'watering', name: 'Tưới nước', icon: '💧' },
  { id: 'light', name: 'Ánh sáng', icon: '☀️' },
  { id: 'soil', name: 'Đất trồng', icon: '🥥' },
  { id: 'fertilizer', name: 'Phân bón', icon: '🌿' },
  { id: 'pests', name: 'Sâu bệnh hại', icon: '🐛' },
];

interface CareGuide {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  slug: string;
  featured: boolean;
}

// Static care guides data
const staticCareGuides: CareGuide[] = [
  {
    id: 1,
    title: 'Cách chăm sóc cây xanh trong nhà',
    category: 'basics',
    excerpt: 'Những kiến thức cơ bản để chăm sóc cây cảnh trong nhà một cách hiệu quả và khoa học.',
    content: `
      <h2>Hướng dẫn chi tiết về cách chăm sóc cây xanh trong nhà</h2>
      
      <p>Việc chăm sóc cây xanh trong nhà không chỉ giúp không gian sống thêm xanh mát mà còn mang lại nhiều lợi ích cho sức khỏe và tinh thần. Dưới đây là hướng dẫn chi tiết:</p>
      
      <h3>1. Chọn vị trí đặt cây</h3>
      <p>- Đặt cây gần cửa sổ để nhận ánh sáng tự nhiên<br>
      - Tránh những nơi có gió lùa mạnh<br>
      - Không đặt gần máy điều hòa hoặc máy sưởi</p>
      
      <h3>2. Tưới nước đúng cách</h3>
      <p>- Kiểm tra độ ẩm đất trước khi tưới<br>
      - Tưới vào buổi sáng sớm hoặc chiều mát<br>
      - Sử dụng nước đã để lắng 24 giờ</p>
      
      <h3>3. Bón phân định kỳ</h3>
      <p>- Bón phân hữu cơ 2-3 tuần/lần<br>
      - Sử dụng phân NPK cân bằng<br>
      - Tránh bón phân khi cây đang stress</p>
      
      <h3>4. Phòng trừ sâu bệnh</h3>
      <p>- Kiểm tra cây thường xuyên<br>
      - Vệ sinh lá bằng khăn ẩm<br>
      - Sử dụng thuốc sinh học an toàn</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    slug: 'cham-soc-cay-trong-nha',
    featured: true
  },
  {
    id: 2,
    title: 'Lịch trình tưới nước cho các loại cây phổ biến',
    category: 'watering',
    excerpt: 'Hướng dẫn chi tiết về tần suất và lượng nước cần thiết cho từng loại cây cảnh phổ biến.',
    content: `
      <h2>Lịch trình tưới nước cho các loại cây phổ biến</h2>
      
      <p>Việc tưới nước đúng cách là yếu tố quan trọng nhất quyết định sự sống còn của cây. Mỗi loại cây có nhu cầu nước khác nhau:</p>
      
      <h3>1. Cây mọng nước (Sen đá, xương rồng)</h3>
      <p>- Tần suất: 1-2 tuần/lần<br>
      - Lượng nước: Ít, chỉ ướt nhẹ bề mặt<br>
      - Dấu hiệu cần tưới: Đất khô hoàn toàn</p>
      
      <h3>2. Cây lá to (Monstera, Philodendron)</h3>
      <p>- Tần suất: 3-4 ngày/lần<br>
      - Lượng nước: Trung bình, ướt đều đất<br>
      - Dấu hiệu cần tưới: Đất khô 2-3cm từ trên xuống</p>
      
      <h3>3. Cây thủy sinh (Cây bạc hà nước)</h3>
      <p>- Tần suất: Hàng ngày<br>
      - Lượng nước: Giữ mực nước ổn định<br>
      - Lưu ý: Thay nước 1 tuần/lần</p>
      
      <h3>4. Cây ưa ẩm (Dương xỉ, Calathea)</h3>
      <p>- Tần suất: 2-3 ngày/lần<br>
      - Lượng nước: Nhiều, giữ đất luôn ẩm<br>
      - Phun sương: 1-2 lần/ngày</p>
      
      <h3>Mẹo hay:</h3>
      <p>- Dùng que tăm kiểm tra độ ẩm đất<br>
      - Quan sát lá để biết cây thiếu hay thừa nước<br>
      - Tưới vào buổi sáng để cây hấp thụ tốt nhất</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1562517634-baa2da3accb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2F0ZXJpbmclMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    slug: 'lich-trinh-tuoi-nuoc',
    featured: true
  },
  {
    id: 3,
    title: 'Yêu cầu ánh sáng cho từng loại cây',
    category: 'light',
    excerpt: 'Tìm hiểu về nhu cầu ánh sáng của các loại cây khác nhau và cách bố trí phù hợp.',
    content: 'Hướng dẫn về việc đặt cây ở vị trí có ánh sáng phù hợp và cách nhận biết thiếu hoặc thừa ánh sáng.',
    image_url: 'https://images.unsplash.com/photo-1467043153537-a4fba4522cd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbnQlMjBsaWdodHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    slug: 'yeu-cau-anh-sang',
    featured: false
  },
  {
    id: 4,
    title: 'Loại đất trồng phù hợp cho từng loại cây',
    category: 'soil',
    excerpt: 'Hướng dẫn lựa chọn và pha trộn đất trồng cho các loại cây khác nhau một cách tối ưu.',
    content: 'Tìm hiểu về các loại đất trồng và cách pha trộn để tạo môi trường tốt nhất cho cây.',
    image_url: 'https://images.unsplash.com/photo-1526644253653-a411eaaaa161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29pbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    slug: 'dat-trong-phu-hop',
    featured: false
  },
  {
    id: 5,
    title: 'Cách bón phân hiệu quả cho cây trồng',
    category: 'fertilizer',
    excerpt: 'Những điều cần biết về các loại phân bón và cách sử dụng chúng hiệu quả nhất.',
    content: 'Hướng dẫn về việc chọn và sử dụng phân bón phù hợp cho từng loại cây.',
    image_url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVydGlsaXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    slug: 'cach-bon-phan-hieu-qua',
    featured: false
  },
  {
    id: 6,
    title: 'Nhận biết và điều trị các loại sâu bệnh hại cây',
    category: 'pests',
    excerpt: 'Hướng dẫn nhận biết, phòng ngừa và điều trị các loại sâu bệnh hại phổ biến.',
    content: 'Cách nhận biết các dấu hiệu của sâu bệnh và phương pháp điều trị hiệu quả.',
    image_url: 'https://images.unsplash.com/photo-1596644439270-69891471c1e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnQlMjBwZXN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    slug: 'dieu-tri-sau-benh-hai',
    featured: false
  }
];

const CareGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [careGuides, setCareGuides] = useState<CareGuide[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<CareGuide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and use static data
    setTimeout(() => {
      setCareGuides(staticCareGuides);
      setFeaturedArticles(staticCareGuides.filter(guide => guide.featured));
      setLoading(false);
    }, 500);
  }, []);

  const filteredGuides = activeTab === 'all' 
    ? careGuides.filter(guide => 
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
    : careGuides.filter(guide => 
        guide.category === activeTab &&
        (guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-nature-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <p className="text-gray-500">Đang tải hướng dẫn chăm sóc...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-nature-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Hướng dẫn chăm sóc cây</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá các hướng dẫn chi tiết để chăm sóc cây cảnh của bạn. 
              Từ cơ bản đến nâng cao, tìm hiểu cách giúp cây phát triển khỏe mạnh.
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm hướng dẫn..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Featured Articles */}
          {searchTerm === '' && featuredArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Link to={`/care-guide/${article.slug}`} key={article.id} className="group">
                    <div className="relative h-64 overflow-hidden rounded-lg">
                      <img 
                        src={article.image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-medium text-white">{article.title}</h3>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                        <Button variant="outline" className="mt-3 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          Đọc ngay
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Categories Tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                {careCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    <span className="mr-2">{category.icon}</span>
                    <span className="hidden md:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/care-guide/${guide.slug}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={guide.image_url} 
                          alt={guide.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="mb-3">
                          <span className="inline-block px-2 py-1 text-xs bg-nature-100 text-nature-800 rounded-full">
                            {careCategories.find(cat => cat.id === guide.category)?.icon} {" "}
                            {careCategories.find(cat => cat.id === guide.category)?.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                        <p className="text-gray-600 text-sm">{guide.excerpt}</p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
              
              {filteredGuides.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Không tìm thấy bài hướng dẫn phù hợp.</p>
                </div>
              )}
            </TabsContent>
            
            {careCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                    <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link to={`/care-guide/${guide.slug}`}>
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={guide.image_url} 
                            alt={guide.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-5">
                          <div className="mb-3">
                            <span className="inline-block px-2 py-1 text-xs bg-nature-100 text-nature-800 rounded-full">
                              {category.icon} {category.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium mb-2">{guide.title}</h3>
                          <p className="text-gray-600 text-sm">{guide.excerpt}</p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
                
                {filteredGuides.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Không tìm thấy bài hướng dẫn phù hợp.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          {/* Newsletter */}
          <div className="mt-16 bg-nature-100 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Nhận thông tin chăm sóc cây</h2>
            <p className="mb-6 text-gray-600">Đăng ký để nhận các mẹo hữu ích và hướng dẫn chăm sóc cây mới nhất.</p>
            <div className="flex max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="rounded-r-none"
              />
              <Button className="rounded-l-none bg-nature-600 hover:bg-nature-700">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareGuide;
