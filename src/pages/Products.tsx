import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, X, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('product_id', { ascending: false });

      if (error) throw error;
      
      const productsData = data || [];
      setProducts(productsData);
      
      // Get unique categories
      const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
      setCategories(uniqueCategories);
      
      // Find min and max price
      if (productsData.length > 0) {
        const prices = productsData.map(product => product.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinMaxPrice([min, max]);
        setPriceRange([min, max]);
      }

      toast({
        title: "Sản phẩm đã được cập nhật",
        description: `Danh sách hiện có ${productsData.length} sản phẩm từ database`,
        duration: 3000,
      });
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

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, priceRange, sortBy, searchTerm]);

  useEffect(() => {
    // Tính toán sản phẩm hiển thị dựa trên trang hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
    window.scrollTo(0, 0);
  }, [currentPage, filteredProducts]);

  const applyFilters = () => {
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by price range
    result = result.filter(product => {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    });
    
    // Sort results
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - no additional sorting needed
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(minMaxPrice);
    setSortBy("featured");
    setSearchTerm('');
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hàm tạo các liên kết trang
  const renderPaginationItems = () => {
    const items = [];
    
    // Luôn hiển thị trang đầu tiên
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Nếu trang hiện tại > 3, hiển thị dấu ...
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Hiển thị trang trước trang hiện tại
    if (currentPage > 2) {
      items.push(
        <PaginationItem key={`page-${currentPage - 1}`}>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Hiển thị trang hiện tại (nếu không phải trang đầu tiên hoặc trang cuối)
    if (currentPage !== 1 && currentPage !== totalPages) {
      items.push(
        <PaginationItem key={`page-${currentPage}`}>
          <PaginationLink isActive onClick={() => handlePageChange(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Hiển thị trang sau trang hiện tại
    if (currentPage < totalPages - 1) {
      items.push(
        <PaginationItem key={`page-${currentPage + 1}`}>
          <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Nếu trang hiện tại < totalPages - 2, hiển thị dấu ...
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Luôn hiển thị trang cuối cùng (nếu có nhiều hơn 1 trang)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  // Transform products for PlantCard component
  const transformProductForPlantCard = (product: Product) => ({
    id: product.product_id,
    name: product.name,
    category: product.category,
    description: product.description || '',
    price: product.price,
    image: product.image_path || '/placeholder.svg',
    inStock: product.stock_quantity > 0,
    stock: product.stock_quantity // Add missing stock property
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">Sản phẩm</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
            <Button variant="outline" onClick={toggleMobileFilter} className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Lọc
            </Button>
          </div>
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters} 
                  className="text-gray-500 hover:text-nature-600 p-0 h-auto text-xs"
                >
                  Xóa bộ lọc
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Tìm kiếm</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500"
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                        className="text-nature-600 focus:ring-nature-600"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-3">Khoảng giá</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={minMaxPrice[0]}
                    max={minMaxPrice[1]}
                    step={10000}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">{priceRange[0].toLocaleString('vi-VN')}₫</div>
                  <div className="text-sm text-gray-700">{priceRange[1].toLocaleString('vi-VN')}₫</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters - Sliding panel */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-xl overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Bộ lọc</h2>
                  <Button variant="ghost" size="icon" onClick={toggleMobileFilter}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Tìm kiếm</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500"
                    />
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Danh mục</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`mobile-category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="text-nature-600 focus:ring-nature-600"
                        />
                        <label htmlFor={`mobile-category-${category}`} className="ml-2 text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Khoảng giá</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      min={minMaxPrice[0]}
                      max={minMaxPrice[1]}
                      step={10000}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">{priceRange[0].toLocaleString('vi-VN')}₫</div>
                    <div className="text-sm text-gray-700">{priceRange[1].toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>
                
                <div className="mt-10 space-y-3">
                  <Button 
                    onClick={() => {
                      applyFilters();
                      toggleMobileFilter();
                    }} 
                    className="w-full bg-nature-600 hover:bg-nature-700"
                  >
                    Áp dụng bộ lọc
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="w-full"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="hidden lg:flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
                <p className="text-gray-600 mt-1">Hiển thị {displayedProducts.length} trên tổng số {filteredProducts.length} sản phẩm</p>
              </div>
              
              <div className="flex items-center">
                <div className="mr-2 text-sm text-gray-600">Sắp xếp theo:</div>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-nature-500 text-sm"
                  >
                    <option value="featured">Nổi bật</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                    <option value="name-asc">Tên: A-Z</option>
                    <option value="name-desc">Tên: Z-A</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Mobile Sort */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-nature-500 text-sm"
                  >
                    <option value="featured">Sắp xếp: Nổi bật</option>
                    <option value="price-asc">Sắp xếp: Giá thấp - cao</option>
                    <option value="price-desc">Sắp xếp: Giá cao - thấp</option>
                    <option value="name-asc">Sắp xếp: A-Z</option>
                    <option value="name-desc">Sắp xếp: Z-A</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              {(selectedCategories.length > 0 || searchTerm) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters} 
                  className="text-xs text-nature-600"
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
            
            {/* Active Filters */}
            {(selectedCategories.length > 0 || searchTerm) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchTerm && (
                  <div className="bg-nature-50 px-3 py-1 rounded-full flex items-center text-sm">
                    <span className="mr-1">Tìm kiếm: "{searchTerm}"</span>
                    <button onClick={() => setSearchTerm('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategories.map(category => (
                  <div key={category} className="bg-nature-50 px-3 py-1 rounded-full flex items-center text-sm">
                    <span className="mr-1">{category}</span>
                    <button onClick={() => handleCategoryChange(category)}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Products Grid */}
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {displayedProducts.map(product => (
                  <PlantCard key={product.product_id} plant={transformProductForPlantCard(product)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-4 text-gray-400">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm nào</h3>
                <p className="text-gray-600 mb-6">Vui lòng thử tìm kiếm với bộ lọc khác</p>
                <Button onClick={clearFilters} className="bg-nature-600 hover:bg-nature-700">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
