import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, Filter, Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Bonsai Cần Thăng",
    category: "Bonsai",
    price: 1500000,
    quantity: 50,
    description: "Cây bonsai cần thăng, dáng đẹp, dễ chăm sóc.",
    status: "active",
    imageUrl: "/images/products/bonsai1.jpg",
  },
  {
    id: "2",
    name: "Sen Đá Kim Cương",
    category: "Sen Đá",
    price: 80000,
    quantity: 120,
    description: "Sen đá kim cương, vẻ đẹp lấp lánh, phong thủy tốt.",
    status: "active",
    imageUrl: "/images/products/senda1.jpg",
  },
  {
    id: "3",
    name: "Xương Rồng Bát Tiên",
    category: "Xương Rồng",
    price: 120000,
    quantity: 80,
    description: "Xương rồng bát tiên, hoa đẹp, dễ trồng.",
    status: "inactive",
    imageUrl: "/images/products/xuongrong1.jpg",
  },
  {
    id: "4",
    name: "Bonsai Tùng La Hán",
    category: "Bonsai",
    price: 2500000,
    quantity: 30,
    description: "Bonsai tùng la hán, dáng cổ thụ, sang trọng.",
    status: "active",
    imageUrl: "/images/products/bonsai2.jpg",
  },
  {
    id: "5",
    name: "Sen Đá Nâu",
    category: "Sen Đá",
    price: 70000,
    quantity: 150,
    description: "Sen đá nâu, màu sắc độc đáo, dễ nhân giống.",
    status: "active",
    imageUrl: "/images/products/senda2.jpg",
  },
  {
    id: "6",
    name: "Xương Rồng Tai Thỏ",
    category: "Xương Rồng",
    price: 90000,
    quantity: 100,
    description: "Xương rồng tai thỏ, hình dáng ngộ nghĩnh, đáng yêu.",
    status: "draft",
    imageUrl: "/images/products/xuongrong2.jpg",
  },
];

const ProductManagement = ({ navigate }: PageProps) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Bonsai');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductStatus, setNewProductStatus] = useState<'active' | 'inactive' | 'draft'>('active');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');

  const filteredProducts = products.filter(product => {
    const searchRegex = new RegExp(searchQuery, 'i');
    const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
    const statusMatch = statusFilter === 'all' || product.status === statusFilter;
    return searchRegex.test(product.name) && categoryMatch && statusMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return 0;
    }
  });

  const handleSort = (column: keyof Product) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateProduct = () => {
    if (!newProductName || !newProductCategory || !newProductPrice || !newProductQuantity || !newProductDescription || !newProductImageUrl) {
      toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    const newProduct: Product = {
      id: String(Date.now()),
      name: newProductName,
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      quantity: parseInt(newProductQuantity),
      description: newProductDescription,
      status: newProductStatus,
      imageUrl: newProductImageUrl,
    };

    setProducts([...products, newProduct]);
    setIsCreateDialogOpen(false);
    toast.success("Thêm sản phẩm thành công!");
    clearNewProductForm();
  };

  const handleEditProduct = () => {
    if (!newProductName || !newProductCategory || !newProductPrice || !newProductQuantity || !newProductDescription || !newProductImageUrl) {
      toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm!");
      return;
    }

    if (!selectedProduct) return;

    const updatedProduct: Product = {
      ...selectedProduct,
      name: newProductName,
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      quantity: parseInt(newProductQuantity),
      description: newProductDescription,
      status: newProductStatus,
      imageUrl: newProductImageUrl,
    };

    const updatedProducts = products.map(product => product.id === selectedProduct.id ? updatedProduct : product);
    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast.success("Cập nhật sản phẩm thành công!");
    clearNewProductForm();
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success("Xóa sản phẩm thành công!");
  };

  const clearNewProductForm = () => {
    setNewProductName('');
    setNewProductCategory('Bonsai');
    setNewProductPrice('');
    setNewProductQuantity('');
    setNewProductDescription('');
    setNewProductStatus('active');
    setNewProductImageUrl('');
  };

  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setNewProductName(product.name);
    setNewProductCategory(product.category);
    setNewProductPrice(String(product.price));
    setNewProductQuantity(String(product.quantity));
    setNewProductDescription(product.description);
    setNewProductStatus(product.status);
    setNewProductImageUrl(product.imageUrl);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <CardTitle className="text-2xl font-bold">Quản lý sản phẩm</CardTitle>
            <CardDescription>
              Quản lý và chỉnh sửa thông tin sản phẩm của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="products" className="space-y-4">
              <TabsList>
                <TabsTrigger value="products">Danh sách sản phẩm</TabsTrigger>
                <TabsTrigger value="categories">Danh mục</TabsTrigger>
                <TabsTrigger value="inventory">Kho hàng</TabsTrigger>
              </TabsList>
              <TabsContent value="products" className="space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tất cả danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        <SelectItem value="Bonsai">Bonsai</SelectItem>
                        <SelectItem value="Sen Đá">Sen Đá</SelectItem>
                        <SelectItem value="Xương Rồng">Xương Rồng</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Tất cả trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="active">Đang hoạt động</SelectItem>
                        <SelectItem value="inactive">Không hoạt động</SelectItem>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="w-5 h-5" />
                    </Button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm sản phẩm
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Thêm sản phẩm mới</DialogTitle>
                        <DialogDescription>
                          Tạo một sản phẩm mới để bán trên cửa hàng của bạn.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Tên sản phẩm
                          </Label>
                          <Input
                            id="name"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            Danh mục
                          </Label>
                          <Select value={newProductCategory} onValueChange={setNewProductCategory}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bonsai">Bonsai</SelectItem>
                              <SelectItem value="Sen Đá">Sen Đá</SelectItem>
                              <SelectItem value="Xương Rồng">Xương Rồng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            Giá
                          </Label>
                          <Input
                            type="number"
                            id="price"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="quantity" className="text-right">
                            Số lượng
                          </Label>
                          <Input
                            type="number"
                            id="quantity"
                            value={newProductQuantity}
                            onChange={(e) => setNewProductQuantity(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Mô tả
                          </Label>
                          <Textarea
                            id="description"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Trạng thái
                          </Label>
                          <Select value={newProductStatus} onValueChange={setNewProductStatus}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Đang hoạt động</SelectItem>
                              <SelectItem value="inactive">Không hoạt động</SelectItem>
                              <SelectItem value="draft">Bản nháp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="imageUrl" className="text-right">
                            URL hình ảnh
                          </Label>
                          <Input
                            id="imageUrl"
                            value={newProductImageUrl}
                            onChange={(e) => setNewProductImageUrl(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsCreateDialogOpen(false)}>
                          Hủy bỏ
                        </Button>
                        <Button type="submit" onClick={handleCreateProduct}>
                          Tạo sản phẩm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          <Button variant="ghost" onClick={() => handleSort('name')}>
                            Tên sản phẩm
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => handleSort('category')}>
                            Danh mục
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => handleSort('price')}>
                            Giá
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button variant="ghost" onClick={() => handleSort('quantity')}>
                            Số lượng
                          </Button>
                        </TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                          <TableCell>
                            <Badge variant={
                              product.status === 'active' ? 'success' :
                                product.status === 'inactive' ? 'destructive' : 'secondary'
                            }>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(product)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="categories">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quản lý danh mục</h3>
                  <p>Tính năng này đang được phát triển.</p>
                </div>
              </TabsContent>
              <TabsContent value="inventory">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quản lý kho hàng</h3>
                  <p>Tính năng này đang được phát triển.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin sản phẩm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên sản phẩm
              </Label>
              <Input
                id="name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Danh mục
              </Label>
              <Select value={newProductCategory} onValueChange={setNewProductCategory}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bonsai">Bonsai</SelectItem>
                  <SelectItem value="Sen Đá">Sen Đá</SelectItem>
                  <SelectItem value="Xương Rồng">Xương Rồng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Giá
              </Label>
              <Input
                type="number"
                id="price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Số lượng
              </Label>
              <Input
                type="number"
                id="quantity"
                value={newProductQuantity}
                onChange={(e) => setNewProductQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Textarea
                id="description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Trạng thái
              </Label>
              <Select value={newProductStatus} onValueChange={setNewProductStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                URL hình ảnh
              </Label>
              <Input
                id="imageUrl"
                value={newProductImageUrl}
                onChange={(e) => setNewProductImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>
              Hủy bỏ
            </Button>
            <Button type="submit" onClick={handleEditProduct}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default ProductManagement;
