
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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

const CareGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [careGuides, setCareGuides] = useState<CareGuide[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<CareGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCareGuides();
  }, []);

  const fetchCareGuides = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('care_guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching care guides:', error);
        throw error;
      }

      setCareGuides(data || []);
      setFeaturedArticles((data || []).filter(guide => guide.featured));
    } catch (error) {
      console.error('Error fetching care guides:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách hướng dẫn chăm sóc",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
