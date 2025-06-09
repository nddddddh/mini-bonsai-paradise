import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowLeft } from "lucide-react";
import PlantCard from "@/components/PlantCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName } from "@/types/supabase";
import { CollectionDetailProps } from "@/types/navigation";

const CollectionDetail = ({ navigate, category }: CollectionDetailProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductsByCategory();
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
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
          <button onClick={() => navigate('/')} className="hover:text-nature-600">Trang chủ</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/collections')} className="hover:text-nature-600">Bộ sưu tập</button>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{getCategoryName(category || 2)}</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryName(category || 2)}</h1>
          <p className="text-gray-600">
            {products.length} sản phẩm thuộc bộ sưu tập {getCategoryName(category || 2).toLowerCase()}
          </p>
        </div>
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {products.map(product => (
                <PlantCard key={product.product_id} plant={transformProductForPlantCard(product)} />
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50" onClick={() => navigate('/products')}>
                Xem tất cả sản phẩm <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm nào</h3>
            <p className="text-gray-500 mb-6">Không có sản phẩm nào thuộc bộ sưu tập này</p>
            <Button className="bg-nature-600 hover:bg-nature-700" onClick={() => navigate('/products')}>
              Xem tất cả sản phẩm
            </Button>
          </div>
        )}
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default CollectionDetail;
