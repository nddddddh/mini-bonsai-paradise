import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2,
  Package,
  Image as ImageIcon,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/supabase";
import { getCategoryName, CATEGORY_MAPPING } from "@/types/supabase";
import { ProductManagementProps } from "@/types/navigation";

const ProductManagement = ({ navigate }: ProductManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'product_id'>>({
    name: '',
    description: null,
    price: 0,
    stock_quantity: 0,
    category: 1,
    image_path: null,
    created_at: new Date().toISOString(),
  });
  const [editProduct, setEditProduct] = useState<Omit<Product, 'product_id'>>({
    name: '',
    description: null,
    price: 0,
    stock_quantity: 0,
    category: 1,
    image_path: null,
    created_at: new Date().toISOString(),
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách sản phẩm",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách sản phẩm",
        variant: "destructive",
      });
    }
  };

  const handleCreateProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()

      if (error) {
        console.error('Error creating product:', error);
        toast({
          title: "Lỗi",
          description: "Không thể tạo sản phẩm mới",
          variant: "destructive",
        });
        return;
      }

      setProducts(prevProducts => [...prevProducts, data[0]]);
      setIsCreateDialogOpen(false);
      setNewProduct({
        name: '',
        description: null,
        price: 0,
        stock_quantity: 0,
        category: 1,
        image_path: null,
        created_at: new Date().toISOString(),
      });
      toast({
        title: "Thành công",
        description: "Sản phẩm đã được tạo thành công",
      });
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tạo sản phẩm mới",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .update(editProduct)
        .eq('product_id', selectedProduct.product_id)
        .select()

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật sản phẩm",
          variant: "destructive",
        });
        return;
      }

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.product_id === selectedProduct.product_id ? data[0] : product
        )
      );
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      toast({
        title: "Thành công",
        description: "Sản phẩm đã được cập nhật thành công",
      });
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật sản phẩm",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('product_id', productId);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Lỗi",
          description: "Không thể xóa sản phẩm",
          variant: "destructive",
        });
        return;
      }

      setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId));
      toast({
        title: "Thành công",
        description: "Sản phẩm đã được xóa thành công",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === null || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Object.entries(CATEGORY_MAPPING).map(([id, name]) => ({
    id: parseInt(id),
    name
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-nature-600 hover:bg-nature-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Tạo sản phẩm mới</DialogTitle>
                <DialogDescription>
                  Thêm sản phẩm mới vào hệ thống.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tên sản phẩm
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Mô tả
                  </Label>
                  <Textarea
                    id="description"
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Giá
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right">
                    Số lượng
                  </Label>
                  <Input
                    type="number"
                    id="stock"
                    value={newProduct.stock_quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: parseInt(e.target.value) })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Danh mục
                  </Label>
                  <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: parseInt(value) })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Đường dẫn ảnh
                  </Label>
                  <Input
                    type="text"
                    id="image"
                    value={newProduct.image_path || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, image_path: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button type="submit" className="bg-nature-600 hover:bg-nature-700" onClick={handleCreateProduct}>
                Tạo sản phẩm
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select onValueChange={(value) => setFilterCategory(value === "all" ? null : parseInt(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell className="font-medium">{product.product_id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{getCategoryName(product.category)}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedProduct(product);
                          setEditProduct({
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            stock_quantity: product.stock_quantity,
                            category: product.category,
                            image_path: product.image_path,
                            created_at: product.created_at,
                          });
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Sửa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Sửa sản phẩm</DialogTitle>
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
                              type="text"
                              id="name"
                              value={editProduct.name}
                              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Mô tả
                            </Label>
                            <Textarea
                              id="description"
                              value={editProduct.description || ''}
                              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Giá
                            </Label>
                            <Input
                              type="number"
                              id="price"
                              value={editProduct.price}
                              onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                              Số lượng
                            </Label>
                            <Input
                              type="number"
                              id="stock"
                              value={editProduct.stock_quantity}
                              onChange={(e) => setEditProduct({ ...editProduct, stock_quantity: parseInt(e.target.value) })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Danh mục
                            </Label>
                            <Select value={editProduct.category.toString()} onValueChange={(value) => setEditProduct({ ...editProduct, category: parseInt(value) })}>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                              Đường dẫn ảnh
                            </Label>
                            <Input
                              type="text"
                              id="image"
                              value={editProduct.image_path || ''}
                              onChange={(e) => setEditProduct({ ...editProduct, image_path: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <Button type="submit" className="bg-nature-600 hover:bg-nature-700" onClick={handleUpdateProduct}>
                          Cập nhật sản phẩm
                        </Button>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.product_id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default ProductManagement;
