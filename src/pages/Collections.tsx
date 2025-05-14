
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

// Collection data
const collections = [
  {
    id: 1,
    name: "Cây Lọc Không Khí",
    slug: "cay-loc-khong-khi",
    description: "Những loại cây giúp làm sạch không khí và loại bỏ độc tố",
    imageUrl: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bG93JTIwbGlnaHQlMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 12,
    featured: true
  },
  {
    id: 2,
    name: "Cây Ít Ánh Sáng",
    slug: "cay-it-anh-sang",
    description: "Những loài cây phù hợp với không gian thiếu sáng",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwbG93JTIwbGlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 9,
    featured: true
  },
  {
    id: 3,
    name: "Cây Nhiệt Đới",
    slug: "cay-nhiet-doi",
    description: "Các loại cây nhiệt đới mang lại không khí nghỉ dưỡng",
    imageUrl: "https://images.unsplash.com/photo-1545165375-7c5dca4ea10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJvcGljYWwlMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 15,
    featured: false
  },
  {
    id: 4,
    name: "Cây Mọng Nước",
    slug: "cay-mong-nuoc",
    description: "Các loài xương rồng và sen đá dễ chăm sóc",
    imageUrl: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1Y2N1bGVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 18,
    featured: true
  },
  {
    id: 5,
    name: "Cây Cho Người Mới Bắt Đầu",
    slug: "cay-cho-nguoi-moi",
    description: "Các loài cây dễ sống, phù hợp cho người mới chăm cây",
    imageUrl: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGVhc3klMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 10,
    featured: false
  },
  {
    id: 6,
    name: "Cây Nở Hoa",
    slug: "cay-no-hoa",
    description: "Các loài cây ra hoa đẹp trong không gian sống",
    imageUrl: "https://images.unsplash.com/photo-1520302519238-872fe1d8c9cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zmxvd2VyaW5nJTIwcGxhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    itemCount: 8,
    featured: false
  },
  {
    id: 7,
    name: "Cây Treo",
    slug: "cay-treo",
    description: "Các loại cây phù hợp cho treo trên cao hoặc trang trí giá treo",
    imageUrl: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhbmdpbmclMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    itemCount: 7,
    featured: false
  },
  {
    id: 8,
    name: "Cây Văn Phòng",
    slug: "cay-van-phong",
    description: "Các loại cây phù hợp cho môi trường văn phòng",
    imageUrl: "https://images.unsplash.com/photo-1524397057410-1e775ed476f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwcGxhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    itemCount: 11,
    featured: false
  }
];

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCollections = collections.filter(collection => 
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const featuredCollections = collections.filter(collection => collection.featured);
  
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
          {searchTerm === '' && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Bộ sưu tập nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCollections.map((collection) => (
                  <Link to={`/collections/${collection.slug}`} key={collection.id} className="group">
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
                  <Link to={`/collections/${collection.slug}`}>
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
