
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search, Filter, SlidersHorizontal, ChevronDown, Grid, List } from 'lucide-react';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { plants } from '@/data/plants';
import { products } from '@/data/products';
import { PageProps } from '@/types/navigation';

const Products = ({ navigate }: PageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [] as string[],
    category: [] as string[],
    care: [] as string[],
    size: [] as string[],
  });

  // Combine and normalize data from both sources
  const allItems = [
    ...plants.map(plant => ({
      id: plant.id,
      name: plant.name,
      description: plant.description,
      price: plant.price,
      image: plant.image,
      category: plant.category,
      type: 'plant' as const,
      difficulty: plant.difficulty,
      stock: 10 // Default stock for plants
    })),
    ...products.map(product => ({
      id: product.product_id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image_path,
      category: 'product',
      type: 'product' as const,
      stock: product.stock_quantity
    }))
  ];

  const filteredAndSortedItems = allItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedFilters.category.length === 0 ||
                             selectedFilters.category.includes(item.category);
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tất cả sản phẩm</h1>
            <p className="text-gray-600 mt-2">Khám phá bộ sưu tập cây cảnh và phụ kiện của chúng tôi</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Tên A-Z</SelectItem>
                <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Bộ lọc
            </Button>
          </div>
        </div>

        {/* Filter Dialog */}
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Bộ lọc sản phẩm</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Danh mục</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 py-2 space-y-2">
                  {['Cây cảnh', 'Bonsai', 'Sen đá', 'Terrarium', 'Phụ kiện'].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedFilters.category.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFilters(prev => ({
                              ...prev,
                              category: [...prev.category, category]
                            }));
                          } else {
                            setSelectedFilters(prev => ({
                              ...prev,
                              category: prev.category.filter(c => c !== category)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={category} className="text-sm">{category}</Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                  <span className="font-medium">Khoảng giá</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 py-2 space-y-2">
                  {['Dưới 100.000đ', '100.000đ - 500.000đ', '500.000đ - 1.000.000đ', 'Trên 1.000.000đ'].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={range}
                        checked={selectedFilters.priceRange.includes(range)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFilters(prev => ({
                              ...prev,
                              priceRange: [...prev.priceRange, range]
                            }));
                          } else {
                            setSelectedFilters(prev => ({
                              ...prev,
                              priceRange: prev.priceRange.filter(r => r !== range)
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={range} className="text-sm">{range}</Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </DialogContent>
        </Dialog>

        {/* Products Grid */}
        <div className="mb-4 text-sm text-gray-600">
          Hiển thị {filteredAndSortedItems.length} sản phẩm
        </div>
        
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedItems.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => navigate('product-detail', { id: item.id.toString() })}
              className="text-left"
            >
              <AspectRatio ratio={4/3} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-nature-600">
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.type === 'plant' && 'difficulty' in item && (
                      <Badge variant="secondary">{item.difficulty}</Badge>
                    )}
                    {item.stock > 0 ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Còn hàng
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        Hết hàng
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
            <Button 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters({
                  priceRange: [],
                  category: [],
                  care: [],
                  size: [],
                });
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredAndSortedItems.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>Trước</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Sau</Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
