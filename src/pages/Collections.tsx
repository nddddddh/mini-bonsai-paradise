
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  featured: boolean;
}

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      
      // Lấy tất cả categories và đếm số lượng sản phẩm từ bảng products
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .order('category');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      // Nhóm theo category và đếm số lượng
      const categoryMap = new Map<string, number>();
      data?.forEach(product => {
        const count = categoryMap.get(product.category) || 0;
        categoryMap.set(product.category, count + 1);
      });

      // Tạo collections từ categories
      const collectionsData: Collection[] = Array.from(categoryMap.entries()).map(([category, count]) => {
        const slug = category.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
          .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
          .replace(/[ìíịỉĩ]/g, 'i')
          .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
          .replace(/[ùúụủũưừứựửữ]/g, 'u')
          .replace(/[ỳýỵỷỹ]/g, 'y')
          .replace(/đ/g, 'd')
          .replace(/[^a-z0-9-]/g, '');

        // Định nghĩa ảnh và mô tả cho từng category
        const getCategoryInfo = (categoryName: string) => {
          switch (categoryName) {
            case 'Terrarium':
              return {
                description: 'Những khu rừng thu nhỏ trong bình thủy tinh tuyệt đẹp',
                imageUrl: 'https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                featured: true
              };
            case 'Bonsai':
              return {
                description: 'Nghệ thuật bonsai Nhật Bản tinh tế và thanh lịch',
                imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
                featured: true
              };
            case 'Sen Đá':
              return {
                description: 'Các loài xương rồng và sen đá dễ chăm sóc',
                imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
                featured: true
              };
            case 'Cây Không Khí':
              return {
                description: 'Cây không cần đất, tạo điểm nhấn độc đáo',
                imageUrl: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80',
                featured: true
              };
            case 'Phụ Kiện':
              return {
                description: 'Dụng cụ và phụ kiện chăm sóc cây cảnh',
                imageUrl: 'https://images.unsplash.com/photo-1592170577795-f8df9a9b0441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                featured: false
              };
            default:
              return {
                description: `Bộ sưu tập ${categoryName.toLowerCase()}`,
                imageUrl: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
                featured: false
              };
          }
        };

        const categoryInfo = getCategoryInfo(category);

        return {
          id: slug,
          name: category,
          slug,
          description: categoryInfo.description,
          imageUrl: categoryInfo.imageUrl,
          itemCount: count,
          featured: categoryInfo.featured
        };
      });

      setCollections(collectionsData);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách bộ sưu tập",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const filteredCollections = collections.filter(collection => 
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const featuredCollections = collections.filter(collection => collection.featured);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-nature-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <p className="text-gray-500">Đang tải bộ sưu tập...</p>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bộ sưu tập cây cảnh</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khám phá các bộ sưu tập cây cảnh theo từng chủ đề. 
              Từ cây lọc không khí đến những loài phù hợp cho không gian ít ánh sáng.
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm bộ sưu tập..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Featured Collections */}
          {searchTerm === '' && featuredCollections.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Bộ sưu tập nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCollections.map((collection) => (
                  <Link to={`/category/${collection.slug}`} key={collection.id} className="group">
                    <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                      <AspectRatio ratio={16/9}>
                        <img
                          src={collection.imageUrl}
                          alt={collection.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </AspectRatio>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-medium text-white mb-1">{collection.name}</h3>
                        <p className="text-white/80 text-sm mb-3">{collection.itemCount} sản phẩm</p>
                        <Button variant="secondary" size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                          Xem bộ sưu tập
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* All Collections */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{searchTerm ? 'Kết quả tìm kiếm' : 'Tất cả bộ sưu tập'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCollections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                  <Link to={`/category/${collection.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={collection.imageUrl}
                        alt={collection.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-nature-600 transition-colors">{collection.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{collection.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{collection.itemCount} sản phẩm</span>
                        <span className="text-sm text-nature-600 font-medium group-hover:text-nature-700">Xem thêm &rarr;</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            
            {filteredCollections.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500">Không tìm thấy bộ sưu tập phù hợp.</p>
                <Button 
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Xem tất cả bộ sưu tập
                </Button>
              </div>
            )}
          </div>
          
          {/* Newsletter */}
          <div className="mt-16 bg-white rounded-xl p-8 text-center shadow-md">
            <h2 className="text-2xl font-bold mb-2">Đăng ký nhận thông tin mới</h2>
            <p className="mb-6 text-gray-600">Nhận thông báo khi chúng tôi thêm bộ sưu tập mới hoặc có khuyến mãi đặc biệt.</p>
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

export default Collections;
