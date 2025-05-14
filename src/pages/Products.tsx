
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlantCard from "@/components/PlantCard";
import { plants } from "@/data/plants";

const Products = () => {
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]);
  const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get unique categories
    const uniqueCategories = Array.from(new Set(plants.map(plant => plant.category)));
    setCategories(uniqueCategories);
    
    // Find min and max price
    const prices = plants.map(plant => plant.salePrice || plant.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setMinMaxPrice([min, max]);
    setPriceRange([min, max]);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, sortBy]);

  const applyFilters = () => {
    let result = [...plants];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(plant => selectedCategories.includes(plant.category));
    }
    
    // Filter by price range
    result = result.filter(plant => {
      const price = plant.salePrice || plant.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sort results
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
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
    
    setFilteredPlants(result);
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
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

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
              <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
              
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
                <SlidersHorizontal className="w-4 h-4 mr-2 text-gray-600" />
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
              
              {selectedCategories.length > 0 && (
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
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredPlants.map(plant => (
                  <PlantCard key={plant.id} plant={plant} />
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
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
