
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface CollectionData {
  category: string;
  count: number;
  image: string;
  slug: string;
}

const Collections = () => {
  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Convert category name to URL slug
  const getCategorySlug = (category: string) => {
    const mapping: Record<string, string> = {
      "Terrarium": "terrarium",
      "Bonsai": "bonsai", 
      "Sen Đá": "sen-da",
      "Cây Không Khí": "cay-khong-khi",
      "Phụ Kiện": "phu-kien"
    };
    return mapping[category] || category.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);

      // Get categories with product counts and sample images
      const { data, error } = await supabase
        .from('products')
        .select('category, image_path')
        .order('product_id', { ascending: true });

      if (error) {
        console.error('Error fetching collections:', error);
        throw error;
      }

      // Group products by category and get first image for each
      const categoryMap = new Map<string, { count: number; image: string }>();
      
      data?.forEach(product => {
        const category = product.category;
        if (categoryMap.has(category)) {
          categoryMap.get(category)!.count += 1;
        } else {
          categoryMap.set(category, {
            count: 1,
            image: product.image_path || '/placeholder.svg'
          });
        }
      });

      // Convert to array format
      const collectionsData: CollectionData[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
        category,
        count: data.count,
        image: data.image,
        slug: getCategorySlug(category)
      }));

      setCollections(collectionsData);

      toast({
        title: "Đã tải bộ sưu tập",
        description: `Tìm thấy ${collectionsData.length} bộ sưu tập`,
        duration: 3000,
      });

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

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải bộ sưu tập...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-nature-50 to-nature-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Bộ Sưu Tập Cây Cảnh
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Khám phá những bộ sưu tập cây cảnh đặc biệt, từ terrarium thu nhỏ đến bonsai nghệ thuật
              </p>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="container mx-auto px-4 py-16">
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <div key={collection.category} className="group cursor-pointer">
                  <Link to={`/collections/${collection.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={collection.image}
                          alt={collection.category}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-nature-600 transition-colors">
                          {collection.category}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Bộ sưu tập {collection.category.toLowerCase()}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {collection.count} sản phẩm
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-nature-500 text-nature-700 hover:bg-nature-50"
                          >
                            Xem thêm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4 text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy bộ sưu tập nào</h3>
              <p className="text-gray-600 mb-6">Hiện tại chưa có bộ sưu tập nào trong cửa hàng</p>
              <Link to="/products">
                <Button className="bg-nature-600 hover:bg-nature-700">
                  Xem tất cả sản phẩm
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-nature-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Không tìm thấy bộ sưu tập phù hợp?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Xem tất cả sản phẩm của chúng tôi để tìm cây cảnh hoàn hảo cho không gian của bạn
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-nature-600 hover:bg-nature-700">
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;
