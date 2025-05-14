
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Collection data
const collections = {
  "cay-loc-khong-khi": {
    id: 1,
    name: "Cây Lọc Không Khí",
    description: "Những loại cây giúp làm sạch không khí và loại bỏ độc tố",
    longDescription: "Các loại cây trong bộ sưu tập này được NASA công nhận có khả năng lọc không khí, loại bỏ các chất độc hại như formaldehyde, benzene và trichloroethylene. Chúng là lựa chọn tuyệt vời để cải thiện chất lượng không khí trong nhà hoặc văn phòng.",
    imageUrl: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bG93JTIwbGlnaHQlMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  },
  "cay-it-anh-sang": {
    id: 2,
    name: "Cây Ít Ánh Sáng",
    description: "Những loài cây phù hợp với không gian thiếu sáng",
    longDescription: "Bộ sưu tập này bao gồm những loài cây có khả năng sinh trưởng tốt trong điều kiện ánh sáng thấp. Đây là lựa chọn lý tưởng cho các căn hộ hoặc văn phòng thiếu ánh sáng tự nhiên. Những loài cây này thường có nguồn gốc từ tầng dưới của rừng nhiệt đới, nơi chúng đã thích nghi với điều kiện ánh sáng yếu.",
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbnRzJTIwbG93JTIwbGlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  },
  "cay-mong-nuoc": {
    id: 4,
    name: "Cây Mọng Nước",
    description: "Các loài xương rồng và sen đá dễ chăm sóc",
    longDescription: "Bộ sưu tập cây mọng nước bao gồm xương rồng và các loại sen đá đa dạng về màu sắc và hình dáng. Chúng nổi tiếng với khả năng chịu hạn cao, dễ chăm sóc và có thể tồn tại trong điều kiện khắc nghiệt. Đây là lựa chọn tuyệt vời cho những người bận rộn hoặc người mới bắt đầu trồng cây.",
    imageUrl: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1Y2N1bGVudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  }
};

// Sample plants data for collections
const plantsData = [
  {
    id: 1,
    name: "Cây Trầu Bà Lá Xẻ",
    latinName: "Monstera Deliciosa",
    price: 450000,
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uc3RlcmElMjBwbGFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-loc-khong-khi", "cay-it-anh-sang"],
    category: "Cây lá",
    careLevel: "Dễ chăm sóc",
    size: "Trung bình"
  },
  {
    id: 2,
    name: "Cây Cọ Nhện",
    latinName: "Chlorophytum Comosum",
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1656618020911-1c7a937175fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3BpZGVyJTIwcGxhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-loc-khong-khi"],
    category: "Cây lá",
    careLevel: "Rất dễ chăm sóc",
    size: "Nhỏ"
  },
  {
    id: 3,
    name: "Cây Lưỡi Hổ",
    latinName: "Sansevieria Trifasciata",
    price: 180000,
    imageUrl: "https://images.unsplash.com/photo-1593482892290-f54c7f8ed8a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25ha2UlMjBwbGFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-loc-khong-khi", "cay-it-anh-sang"],
    category: "Cây lá",
    careLevel: "Rất dễ chăm sóc",
    size: "Trung bình"
  },
  {
    id: 4,
    name: "Sen Đá Hoa Hồng",
    latinName: "Echeveria Elegans",
    price: 90000,
    imageUrl: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZSUyMHN1Y2N1bGVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-mong-nuoc"],
    category: "Sen đá",
    careLevel: "Dễ chăm sóc",
    size: "Nhỏ"
  },
  {
    id: 5,
    name: "Xương Rồng Tai Thỏ",
    latinName: "Opuntia Microdasys",
    price: 150000,
    imageUrl: "https://images.unsplash.com/photo-1504648184249-2940820656e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FjdHVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-mong-nuoc"],
    category: "Xương rồng",
    careLevel: "Dễ chăm sóc",
    size: "Nhỏ"
  },
  {
    id: 6,
    name: "Cây Huyền Diệp",
    latinName: "Zamioculcas Zamiifolia",
    price: 250000,
    imageUrl: "https://images.unsplash.com/photo-1632207180135-981e2db5be82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8emFtaW9jdWxjYXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-loc-khong-khi", "cay-it-anh-sang"],
    category: "Cây lá",
    careLevel: "Rất dễ chăm sóc",
    size: "Trung bình"
  },
  {
    id: 7,
    name: "Cây Bạch Mã Hoàng Tử",
    latinName: "Aglaonema",
    price: 220000,
    imageUrl: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhhbmdpbmclMjBwbGFudHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-loc-khong-khi", "cay-it-anh-sang"],
    category: "Cây lá",
    careLevel: "Dễ chăm sóc",
    size: "Trung bình"
  },
  {
    id: 8,
    name: "Sen Đá Đuôi Công",
    latinName: "Crassula Perforata",
    price: 110000,
    imageUrl: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c3RyaW5nJTIwb2YlMjBwZWFybHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    collections: ["cay-mong-nuoc"],
    category: "Sen đá",
    careLevel: "Dễ chăm sóc",
    size: "Nhỏ"
  }
];

// Filter options
const filterOptions = {
  category: ["Cây lá", "Sen đá", "Xương rồng", "Cây thân cỏ", "Cây thân gỗ"],
  careLevel: ["Rất dễ chăm sóc", "Dễ chăm sóc", "Chăm sóc trung bình", "Cần chăm sóc kỹ"],
  size: ["Nhỏ", "Trung bình", "Lớn"]
};

const CollectionDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [plants, setPlants] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    category: [],
    careLevel: [],
    size: []
  });
  const [sortOption, setSortOption] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch data from an API
    // Here we're just simulating with the sample data
    if (category && collections[category as keyof typeof collections]) {
      setCollection(collections[category as keyof typeof collections]);
      
      // Filter plants by collection
      const filteredPlants = plantsData.filter(plant => 
        plant.collections.includes(category)
      );
      setPlants(filteredPlants);
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [category]);
  
  // Apply filters
  const filteredPlants = plants.filter(plant => {
    // Check if plant passes all active filters
    for (const [filterType, activeValues] of Object.entries(filters)) {
      // Skip if no active values for this filter type
      if (activeValues.length === 0) continue;
      
      // Check if plant matches any of the active values for this filter
      if (!activeValues.includes(plant[filterType as keyof typeof plant] as string)) {
        return false;
      }
    }
    return true;
  });
  
  // Sort plants
  const sortedPlants = [...filteredPlants].sort((a, b) => {
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
        return 0; // Featured or default sorting
    }
  });
  
  const toggleFilter = (filterType: string, value: string) => {
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
      category: [],
      careLevel: [],
      size: []
    });
  };
  
  const activeFilterCount = Object.values(filters).reduce(
    (total, filterValues) => total + filterValues.length, 0
  );
  
  if (!collection) {
    return (
      <>
        <Navbar />
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
      <Navbar />
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
                  {sortedPlants.length} sản phẩm
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
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${option}`} 
                              checked={filters.category.includes(option)}
                              onCheckedChange={() => toggleFilter('category', option)}
                            />
                            <label 
                              htmlFor={`category-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Care Level Filter */}
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2 border-t border-gray-200">
                      <span>Mức độ chăm sóc</span>
                      <span className="text-lg">+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pb-3">
                      <div className="space-y-2 mt-2">
                        {filterOptions.careLevel.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`careLevel-${option}`} 
                              checked={filters.careLevel.includes(option)}
                              onCheckedChange={() => toggleFilter('careLevel', option)}
                            />
                            <label 
                              htmlFor={`careLevel-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {/* Size Filter */}
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium py-2 border-t border-gray-200">
                      <span>Kích thước</span>
                      <span className="text-lg">+</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pb-3">
                      <div className="space-y-2 mt-2">
                        {filterOptions.size.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`size-${option}`} 
                              checked={filters.size.includes(option)}
                              onCheckedChange={() => toggleFilter('size', option)}
                            />
                            <label 
                              htmlFor={`size-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
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
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${option}`} 
                              checked={filters.category.includes(option)}
                              onCheckedChange={() => toggleFilter('category', option)}
                            />
                            <label 
                              htmlFor={`mobile-category-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Care Level Filter */}
                    <div className="mb-6 border-t border-gray-200 pt-6">
                      <h3 className="font-medium mb-3">Mức độ chăm sóc</h3>
                      <div className="space-y-2">
                        {filterOptions.careLevel.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-careLevel-${option}`} 
                              checked={filters.careLevel.includes(option)}
                              onCheckedChange={() => toggleFilter('careLevel', option)}
                            />
                            <label 
                              htmlFor={`mobile-careLevel-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Size Filter */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-medium mb-3">Kích thước</h3>
                      <div className="space-y-2">
                        {filterOptions.size.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-size-${option}`} 
                              checked={filters.size.includes(option)}
                              onCheckedChange={() => toggleFilter('size', option)}
                            />
                            <label 
                              htmlFor={`mobile-size-${option}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {option}
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
                {sortedPlants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedPlants.map((plant) => (
                      <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <Link to={`/products/${plant.id}`}>
                          <AspectRatio ratio={1/1}>
                            <img
                              src={plant.imageUrl}
                              alt={plant.name}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </AspectRatio>
                          <CardContent className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{plant.latinName}</div>
                            <h3 className="font-medium text-lg group-hover:text-nature-600 transition-colors">{plant.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <div className="font-semibold text-nature-700">{plant.price.toLocaleString('vi-VN')} ₫</div>
                              <div className="text-gray-500 text-sm">{plant.careLevel}</div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm phù hợp.</p>
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
