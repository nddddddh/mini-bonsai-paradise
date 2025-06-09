import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List } from "lucide-react";
import PlantCard from "@/components/PlantCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName, CATEGORY_MAPPING } from "@/types/supabase";
import { products as mockProducts } from "@/data/products";
import { ProductsProps } from "@/types/navigation";

const Products = ({ navigate }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategories, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching products from database:', error);
        // Fallback to mock data
        setProducts(mockProducts);
      } else {
        // Use database data if available, otherwise fallback to mock data
        setProducts(data || mockProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           getCategoryName(product.category).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, 1000000]);
    setSortBy("name");
  };

  const categories = Object.entries(CATEGORY_MAPPING).map(([id, name]) => ({
    id: parseInt(id),
    name
  }));

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sản phẩm</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập cây cảnh đa dạng của chúng tôi</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bộ lọc</span>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Xóa bộ lọc
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Danh mục</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Khoảng giá</label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Giá từ"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <Input
                      type="number"
                      placeholder="Giá đến"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000000])}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} sản phẩm
                </span>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(categoryId => (
                      <Badge key={categoryId} variant="secondary">
                        {getCategoryName(categoryId)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Filter className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-500 mb-4">
                  Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button onClick={clearFilters}>Xóa bộ lọc</Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <PlantCard key={product.product_id} plant={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default Products;
