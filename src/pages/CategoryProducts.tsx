
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { plants } from "@/data/plants";

const CategoryProducts = () => {
  const { category } = useParams();
  const [filteredPlants, setFilteredPlants] = useState<typeof plants>([]);
  const { toast } = useToast();

  // Convert category URL param to display name
  const getCategoryDisplayName = () => {
    switch (category) {
      case "terrarium":
        return "Terrarium";
      case "bonsai":
        return "Bonsai";
      case "sen-da":
        return "Sen Đá";
      case "cay-khong-khi":
        return "Cây Không Khí";
      case "accessories":
        return "Phụ Kiện";
      default:
        return "Sản phẩm";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter plants by category
    const categoryName = getCategoryDisplayName();
    const filtered = plants.filter(plant => plant.category === categoryName);
    
    if (filtered.length > 0) {
      setFilteredPlants(filtered);
      toast({
        title: `Danh mục: ${categoryName}`,
        description: `Đã tìm thấy ${filtered.length} sản phẩm trong danh mục này`,
        duration: 3000,
      });
    } else {
      // If no plants found in this category
      setFilteredPlants([]);
      toast({
        title: "Không tìm thấy sản phẩm",
        description: "Không có sản phẩm nào thuộc danh mục này",
        variant: "destructive",
        duration: 3000,
      });
    }
  }, [category, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-nature-600">Sản phẩm</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{getCategoryDisplayName()}</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryDisplayName()}</h1>
          <p className="text-gray-600">
            {filteredPlants.length} sản phẩm thuộc danh mục {getCategoryDisplayName().toLowerCase()}
          </p>
        </div>
        
        {filteredPlants.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/products">
                <Button variant="outline" className="border-nature-500 text-nature-700 hover:bg-nature-50">
                  Xem tất cả sản phẩm <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
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
            <Link to="/products">
              <Button className="bg-nature-600 hover:bg-nature-700">
                Xem tất cả sản phẩm
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryProducts;
