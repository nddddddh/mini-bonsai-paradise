import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/types/database';
import { getCategoryName, CATEGORY_MAPPING } from '@/types/database';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const ProductManagement = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 1,
    description: '',
    price: 0,
    stock_quantity: 0,
    image_path: ''
  });

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('product_id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      console.log('Products fetched:', data);
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Lỗi khi tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCategoryName(product.category).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 1,
      description: '',
      price: 0,
      stock_quantity: 0,
      image_path: ''
    });
    setEditingProduct(null);
    setSelectedFile(null);
  };

  const handleAddProduct = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description || '',
      price: product.price,
      stock_quantity: product.stock_quantity || 0,
      image_path: product.image_path || ''
    });
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Kiểm tra kích thước file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước file không được vượt quá 5MB');
        return;
      }
      
      // Kiểm tra loại file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Chỉ chấp nhận file ảnh (JPEG, PNG, WebP)');
        return;
      }
      
      console.log('File selected:', file.name, file.type, file.size);
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      console.log('Starting upload process...');
      
      // Tạo tên file unique với timestamp và random string
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `product_${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      
      console.log('Uploading to bucket: product-images, fileName:', fileName);
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      // Upload file vào Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      // Lấy public URL của file đã upload
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', urlData.publicUrl);
      
      if (!urlData.publicUrl) {
        throw new Error('Không thể tạo URL cho ảnh');
      }

      toast.success('Upload ảnh thành công!');
      return urlData.publicUrl;
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      // Xử lý các loại lỗi cụ thể
      if (error.message?.includes('not allowed')) {
        toast.error('Không có quyền upload ảnh. Vui lòng kiểm tra cấu hình bucket.');
      } else if (error.message?.includes('quota')) {
        toast.error('Đã vượt quá dung lượng cho phép.');
      } else if (error.message?.includes('network')) {
        toast.error('Lỗi mạng. Vui lòng thử lại.');
      } else {
        toast.error(`Lỗi upload ảnh: ${error.message || 'Không xác định'}`);
      }
      
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Tên sản phẩm không được để trống');
      return;
    }
    
    if (formData.price <= 0) {
      toast.error('Giá sản phẩm phải lớn hơn 0');
      return;
    }
    
    if (formData.stock_quantity < 0) {
      toast.error('Số lượng tồn kho không được âm');
      return;
    }

    try {
      let finalFormData = { ...formData };
      
      // Upload ảnh nếu có file được chọn
      if (selectedFile) {
        console.log('Uploading selected file...');
        const uploadedImageUrl = await uploadImage(selectedFile);
        if (uploadedImageUrl) {
          finalFormData.image_path = uploadedImageUrl;
          console.log('Image uploaded successfully, URL:', uploadedImageUrl);
        } else {
          console.log('Image upload failed, continuing without image');
          // Không return ở đây, vẫn cho phép tạo sản phẩm mà không có ảnh
        }
      }

      console.log('Submitting product data:', finalFormData);
      
      if (editingProduct) {
        // Update existing product
        const { data, error } = await supabase
          .from('products')
          .update(finalFormData)
          .eq('product_id', editingProduct.product_id)
          .select();

        if (error) {
          console.error('Error updating product:', error);
          throw error;
        }
        
        console.log('Product updated successfully:', data);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        // Create new product
        const { data, error } = await supabase
          .from('products')
          .insert(finalFormData)
          .select();

        if (error) {
          console.error('Error creating product:', error);
          throw error;
        }
        
        console.log('Product created successfully:', data);
        toast.success('Thêm sản phẩm thành công');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(`Lỗi khi lưu sản phẩm: ${error.message || 'Không xác định'}`);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      console.log('Deleting product with ID:', productId);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('product_id', productId);

      if (error) {
        console.error('Error deleting product:', error);
        throw error;
      }

      console.log('Product deleted successfully');
      toast.success('Xóa sản phẩm thành công');
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(`Lỗi khi xóa sản phẩm: ${error.message || 'Không xác định'}`);
    }
  };

  if (!user || !isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản Lý Sản Phẩm</h1>
          <p className="text-gray-600 mt-2">Thêm, sửa, xóa sản phẩm trong hệ thống</p>
        </div>

        {/* Header Actions */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm Sản Phẩm
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Sản Phẩm ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Đang tải...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hình ảnh</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Tồn kho</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>
                        <img 
                          src={product.image_path || '/placeholder.svg'} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            console.log('Image load error for:', product.image_path);
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{getCategoryName(product.category)}</TableCell>
                      <TableCell>{product.price.toLocaleString('vi-VN')}₫</TableCell>
                      <TableCell>
                        <span className={(product.stock_quantity || 0) > 0 ? 'text-green-600' : 'text-red-600'}>
                          {product.stock_quantity || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product.product_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Product Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select 
                    value={formData.category.toString()} 
                    onValueChange={(value) => setFormData({...formData, category: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(CATEGORY_MAPPING).map(([id, name]) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Số lượng tồn kho *</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({...formData, stock_quantity: Number(e.target.value)})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Hình ảnh sản phẩm</Label>
                
                {/* File upload section */}
                <div className="space-y-2">
                  <Label htmlFor="image-file" className="text-sm font-medium">Tải ảnh từ máy tính</Label>
                  <Input
                    id="image-file"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">
                    Chấp nhận: JPEG, PNG, WebP. Tối đa 5MB.
                  </p>
                  {selectedFile && (
                    <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                      <Upload className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">{selectedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                        className="ml-auto h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  )}
                </div>

                {/* URL input section */}
                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-sm font-medium">Hoặc nhập URL ảnh</Label>
                  <Input
                    id="image_url"
                    value={formData.image_path}
                    onChange={(e) => setFormData({...formData, image_path: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Image preview */}
                {(formData.image_path || selectedFile) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Xem trước</Label>
                    <div className="border rounded-lg p-2 bg-gray-50">
                      <img 
                        src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image_path}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border mx-auto"
                        onError={(e) => {
                          console.log('Preview image error');
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={uploading}
                >
                  {uploading ? 'Đang xử lý...' : editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  disabled={uploading}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductManagement;
