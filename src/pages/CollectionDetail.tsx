import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { plants } from '@/data/plants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

// Collection info mapping
const getCollectionInfo = (categorySlug: string) => {
  const collections = {
    "cay-co-hoa": {
      name: "Cây có hoa",
      description: "Những cây có hoa rực rỡ đầy màu sắc",
      longDescription: "Bộ sưu tập Cây có hoa - những loại cây với hoa đẹp, mang lại sức sống và màu sắc cho không gian của bạn.",
      imageUrl: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      categoryId: 1
    },
    "mini": {
      name: "Mini", 
      description: "Các loài cây mini xinh xắn, phù hợp mọi không gian",
      longDescription: "Bộ sưu tập Mini - các loại cây nhỏ xinh, dễ chăm sóc và phù hợp với mọi không gian sống.",
      imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      categoryId: 2
    },
    "phong-thuy": {
      name: "Phong Thủy",
      description: "Cây phong thủy mang lại may mắn và tài lộc",
      longDescription: "Bộ sưu tập Phong Thủy - các loại cây được chọn lọc kỹ lưỡng để mang lại vượng khí, tài lộc và sức khỏe.",
      imageUrl: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80",
      categoryId: 3
    }
  };

  return collections[categorySlug as keyof typeof collections] || null;
};

// Filter options
const filterOptions = {
  category: [
    { id: 1, name: "Cây có hoa" },
    { id: 2, name: "Mini" },
    { id: 3, name: "Phong thủy" }
  ]
};

const CollectionDetail = ({ navigate, category }: PageProps) => {
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, number[]>>({
    category: []
  });
  const [sortOption, setSortOption] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (category) {
      fetchCollectionData();
    }
    window.scrollTo(0, 0);
  }, [category]);

  const fetchCollectionData = async () => {
    try {
      setLoading(true);
      
      if (!category) {
        console.log('No category parameter');
        return;
      }

      console.log('=== COLLECTION DETAIL DEBUG START ===');
      console.log('Category from URL param:', category);

      // Get collection info
      const collectionInfo = getCollectionInfo(category);
      console.log('Collection info found:', collectionInfo);
      
      if (!collectionInfo) {
        console.log('No collection info found for:', category);
        setCollection(null);
        setLoading(false);
        return;
      }

      setCollection(collectionInfo);

      // Fetch products by category ID
      const { data: matchingProducts, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', collectionInfo.categoryId)
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Database query error:', error);
        throw error;
      }
      
      console.log('Final matching products:', matchingProducts?.length || 0);
      console.log('=== COLLECTION DETAIL DEBUG END ===');
      
      setProducts(matchingProducts || []);
      
      if (matchingProducts && matchingProducts.length > 0) {
        toast({
          title: `Bộ sưu tập: ${collectionInfo.name}`,
          description: `Đã tìm thấy ${matchingProducts.length} sản phẩm trong bộ sưu tập này`,
          duration: 3000,
        });
      } else {
        console.warn('No products found for category:', category);
        toast({
          title: "Không tìm thấy sản phẩm",
          description: `Không có sản phẩm nào thuộc danh mục: ${category}`,
          variant: "destructive",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error('Error fetching collection data:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu bộ sưu tập",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters
  const filteredProducts = products.filter(product => {
    for (const [filterType, activeValues] of Object.entries(filters)) {
      if (activeValues.length === 0) continue;
      
      if (filterType === 'category' && !activeValues.includes(product.category)) {
        return false;
      }
    }
    return true;
  });
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  const toggleFilter = (filterType: string, value: number) => {
    setFilters(prev => {
      const current = [...prev[filterType]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [filterType]: current
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      category: []
    });
  };
  
  const activeFilterCount = Object.values(filters).reduce(
    (total, filterValues) => total + filterValues.length, 0
  );

  if (loading) {
    return (
      <>
        <Navbar navigate={navigate} />
        <div className="container mx-auto py-16 px-4 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Đang tải bộ sưu tập...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!collection) {
    return (
      <>
        <Navbar navigate={navigate} />
        <div className="container mx-auto py-16 px-4 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Bộ sưu tập không tồn tại</h1>
            <p className="mb-6">Bộ sưu tập bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button asChild>
              <Link to="/collections">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại tất cả bộ sưu tập
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar navigate={navigate} />
      <div className="bg-white">
        {/* Hero */}
        <div className="relative">
          <div className="h-64 md:h-80 w-full">
            <img
              src={collection.imageUrl}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative -mt-24">
            <div className="bg-white rounded-t-lg shadow-lg max-w-5xl mx-auto p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{collection.name}</h1>
                  <p className="text-gray-600 mt-2">{collection.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {sortedProducts.length} sản phẩm
                </div>
              </div>
              
              {collection.longDescription && (
                <div className="mt-6 text-gray-600 border-t border-gray-100 pt-6">
                  <p>{collection.longDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="py-4">
              <div className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-600 hover:text-nature-600">Trang chủ</Link>
                <span className="text-gray-400">/</span>
                <Link to="/collections" className="text-gray-600 hover:text-nature-600">Bộ sưu tập</Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800 font-medium">{collection.name}</span>
              </div>
            </div>
            
            {/* Filter and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mt-2">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  <span>Bộ lọc</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-nature-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
                
                {activeFilterCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-600"
                    onClick={clearFilters}
                  >
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                <select
                  className="border-none text-sm focus:outline-none focus:ring-0"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Nổi bật</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </select>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Filters */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-5 sticky top-24">
                  <h2 className="font-bold text-lg mb-4">Bộ lọc</h2>
                  
                  {/* Category Filter */}
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2">
                      <span>Loại cây</span>
                      <span className="text-lg">+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pb-3">
                      <div className="space-y-2 mt-2">
                        {filterOptions.category.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${option.id}`} 
                              checked={filters.category.includes(option.id)}
                              onCheckedChange={() => toggleFilter('category', option.id)}
                            />
                            <label 
                              htmlFor={`category-${option.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {activeFilterCount > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-4"
                      onClick={clearFilters}
                    >
                      Xóa tất cả bộ lọc
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Mobile Filters Dialog */}
              <Dialog open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Bộ lọc</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[60vh] overflow-auto py-4">
                    {/* Category Filter */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Loại cây</h3>
                      <div className="space-y-2">
                        {filterOptions.category.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${option.id}`} 
                              checked={filters.category.includes(option.id)}
                              onCheckedChange={() => toggleFilter('category', option.id)}
                            />
                            <label 
                              htmlFor={`mobile-category-${option.id}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                    {activeFilterCount > 0 && (
                      <Button 
                        variant="outline" 
                        onClick={clearFilters}
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                    <Button 
                      className="ml-auto"
                      onClick={() => setIsMobileFilterOpen(false)}
                    >
                      Áp dụng
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Products */}
              <div className="flex-1">
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <Card key={product.product_id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <Link to={`/products/${product.product_id}`}>
                          <AspectRatio ratio={1/1}>
                            <img
                              src={product.image_path || '/placeholder.svg'}
                              alt={product.name}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </AspectRatio>
                          <CardContent className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{getCategoryName(product.category)}</div>
                            <h3 className="font-medium text-lg group-hover:text-nature-600 transition-colors">{product.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <div className="font-semibold text-nature-700">{product.price.toLocaleString('vi-VN')} ₫</div>
                              <div className="text-gray-500 text-sm">Còn {product.stock_quantity}</div>
                            </div>
                            {product.description && (
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                            )}
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm phù hợp trong bộ sưu tập này.</p>
                    <p className="text-sm text-gray-400 mb-4">
                      Có thể chưa có sản phẩm nào thuộc danh mục "{collection.name}" trong cơ sở dữ liệu.
                    </p>
                    {activeFilterCount > 0 && (
                      <Button 
                        variant="outline"
                        onClick={clearFilters}
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link to="/collections">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại tất cả bộ sưu tập
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CollectionDetail;
