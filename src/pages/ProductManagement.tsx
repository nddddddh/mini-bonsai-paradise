import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

// Mock product data
const products = [
  {
    id: 1,
    name: "Terrarium Rừng Nhiệt Đới Mini",
    category: "Terrarium",
    price: 450000,
    stock: 15,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 2,
    name: "Bonsai Cần Thăng Mini", 
    category: "Bonsai",
    price: 550000,
    stock: 8,
    status: "active" as const,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=735&q=80"
  },
  {
    id: 3,
    name: "Sen Đá Nhỏ Xinh",
    category: "Sen đá", 
    price: 120000,
    stock: 0,
    status: "inactive" as const,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
  }
];

type ProductStatus = "active" | "inactive" | "draft";

const ProductManagement = ({ navigate }: PageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    status: 'active' as ProductStatus,
    image: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-green-600 border-green-600">Hoạt động</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Ngừng bán</Badge>;
      case 'draft':
        return <Badge variant="secondary">Bản nháp</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddProduct = () => {
    toast.success("Đã thêm sản phẩm mới!");
    setShowAddProduct(false);
    setNewProduct({
      name: '',
      category: '',
      description: '',
      price: '',
      stock: '',
      status: 'active',
      image: ''
    });
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      image: product.image
    });
    setShowEditProduct(true);
  };

  const handleUpdateProduct = () => {
    toast.success(`Đã cập nhật sản phẩm "${selectedProduct?.name}"`);
    setShowEditProduct(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (product: any) => {
    if (confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) {
      toast.success(`Đã xóa sản phẩm "${product.name}"`);
    }
  };

  const handleStatusChange = (productId: number, newStatus: ProductStatus) => {
    toast.success(`Đã cập nhật trạng thái sản phẩm`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
            <p className="text-gray-600 mt-2">Quản lý danh mục sản phẩm của cửa hàng</p>
          </div>
          
          <Button 
            onClick={() => setShowAddProduct(true)}
            className="bg-nature-600 hover:bg-nature-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Ngừng bán</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <AspectRatio ratio={1} className="w-12 h-12">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </AspectRatio>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </TableCell>
                    <TableCell>
                      <span className={product.stock === 0 ? 'text-red-600' : ''}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Select
                          value={product.status}
                          onValueChange={(value: ProductStatus) => handleStatusChange(product.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Hoạt động</SelectItem>
                            <SelectItem value="inactive">Ngừng bán</SelectItem>
                            <SelectItem value="draft">Bản nháp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Product Dialog */}
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Terrarium">Terrarium</SelectItem>
                      <SelectItem value="Bonsai">Bonsai</SelectItem>
                      <SelectItem value="Sen đá">Sen đá</SelectItem>
                      <SelectItem value="Cây cảnh">Cây cảnh</SelectItem>
                      <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="stock">Số lượng tồn kho</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({...prev, stock: e.target.value}))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select 
                    value={newProduct.status} 
                    onValueChange={(value: ProductStatus) => setNewProduct(prev => ({...prev, status: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Ngừng bán</SelectItem>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                    placeholder="Nhập mô tả sản phẩm"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Hình ảnh</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddProduct} className="bg-nature-600 hover:bg-nature-700">
                Thêm sản phẩm
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Terrarium">Terrarium</SelectItem>
                      <SelectItem value="Bonsai">Bonsai</SelectItem>
                      <SelectItem value="Sen đá">Sen đá</SelectItem>
                      <SelectItem value="Cây cảnh">Cây cảnh</SelectItem>
                      <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="stock">Số lượng tồn kho</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({...prev, stock: e.target.value}))}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select 
                    value={newProduct.status} 
                    onValueChange={(value: ProductStatus) => setNewProduct(prev => ({...prev, status: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Ngừng bán</SelectItem>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                    placeholder="Nhập mô tả sản phẩm"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Hình ảnh</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => setShowEditProduct(false)}>
                Hủy
              </Button>
              <Button onClick={handleUpdateProduct} className="bg-nature-600 hover:bg-nature-700">
                Cập nhật
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default ProductManagement;
