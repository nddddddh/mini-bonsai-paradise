import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName, getCategoryId } from "@/types/supabase";
import { CategoryProductsProps } from "@/types/navigation";

const CategoryProducts = ({ navigate, category }: CategoryProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Convert category URL param to category ID
  const getCategoryIdFromSlug = (slug: string): number => {
    const mapping: Record<string, number> = {
      "cay-co-hoa": 1,    // Cây có hoa
      "mini": 2,          // Mini
      "phong-thuy": 3     // Phong thủy
    };
    return mapping[slug] || 2; // Default to Mini
  };

  // Convert category URL param to display name
  const getCategoryDisplayName = () => {
    if (!category) return "Sản phẩm";
    const categoryId = getCategoryIdFromSlug(category);
    return getCategoryName(categoryId);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductsByCategory();
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      
      if (!category) return;
      
      const categoryId = getCategoryIdFromSlug(category);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId)
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      setProducts(data || []);
      
      if (data && data.length > 0) {
        toast({
          title: `Danh mục: ${getCategoryDisplayName()}`,
          description: `Đã tìm thấy ${data.length} sản phẩm trong danh mục này`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Không tìm thấy sản phẩm",
          description: "Không có sản phẩm nào thuộc danh mục này",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Transform products for PlantCard component
  const transformProductForPlantCard = (product: Product) => ({
    id: product.product_id,
    name: product.name,
    category: getCategoryName(product.category),
    description: product.description || '',
    price: product.price,
    image: product.image_path || '/placeholder.svg',
    inStock: product.stock_quantity > 0,
    stock: product.stock_quantity
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:text-nature-600">Trang chủ</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('products')} className="hover:text-nature-600">Sản phẩm</button>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{getCategoryDisplayName()}</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryDisplayName()}</h1>
          <p className="text-gray-600">
            {products.length} sản phẩm thuộc danh mục {getCategoryDisplayName().toLowerCase()}
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map(product => (
                <PlantCard key={product.product_id} plant={transformProductForPlantCard(product)} navigate={navigate} />
              ))}
            </div>
            
            <div className="text-center">
              <button onClick={() => navigate('products')}>
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  Xem tất cả sản phẩm <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4 text-gray-400">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm nào</h3>
            <p className="text-gray-600 mb-6">Không có sản phẩm nào thuộc danh mục này</p>
            <button onClick={() => navigate('products')}>
              <Button className="bg-nature-600 hover:bg-nature-700">
                Xem tất cả sản phẩm
              </Button>
            </button>
          </div>
        )}
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default CategoryProducts;
