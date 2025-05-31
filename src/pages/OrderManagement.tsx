import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Order, OrderDetail, Product, Account, isValidOrderStatus } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface OrderWithDetails extends Order {
  account: Account;
  order_details: (OrderDetail & { product: Product })[];
}

const OrderManagement = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderWithDetails[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch orders with account details
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          accounts(*)
        `)
        .order('order_date', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch order details with products for each order
      const ordersWithDetails: OrderWithDetails[] = [];
      
      for (const order of ordersData || []) {
        const { data: detailsData, error: detailsError } = await supabase
          .from('order_details')
          .select(`
            *,
            products(*)
          `)
          .eq('order_id', order.order_id);

        if (detailsError) throw detailsError;

        // Transform the data to match our interface
        const transformedDetails = detailsData?.map(detail => ({
          ...detail,
          product: detail.products
        })) || [];

        // Cast the order data to our interface
        const transformedOrder: OrderWithDetails = {
          order_id: order.order_id,
          account_id: order.account_id,
          order_date: order.order_date,
          total_amount: order.total_amount,
          status: order.status, // Keep as string
          account: order.accounts,
          order_details: transformedDetails
        };

        ordersWithDetails.push(transformedOrder);
      }

      setOrders(ordersWithDetails);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Lỗi khi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.order_id.toString().includes(searchTerm) ||
        order.account.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.account.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('order_id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.order_id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));

      toast.success('Cập nhật trạng thái đơn hàng thành công');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Lỗi khi cập nhật trạng thái đơn hàng');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Chờ xử lý':
        return <Badge variant="secondary">Chờ xử lý</Badge>;
      case 'Đã giao':
        return <Badge className="bg-green-100 text-green-800">Đã giao</Badge>;
      case 'Đã hủy':
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
          <h1 className="text-3xl font-bold text-gray-900">Quản Lý Đơn Hàng</h1>
          <p className="text-gray-600 mt-2">Theo dõi và quản lý tất cả đơn hàng</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                  <SelectItem value="Đã giao">Đã giao</SelectItem>
                  <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh Sách Đơn Hàng ({filteredOrders.length})</CardTitle>
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
                    <TableHead>Mã Đơn</TableHead>
                    <TableHead>Khách Hàng</TableHead>
                    <TableHead>Ngày Đặt</TableHead>
                    <TableHead>Tổng Tiền</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell className="font-medium">#{order.order_id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.account.full_name}</div>
                          <div className="text-sm text-gray-500">{order.account.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.order_date).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>{order.total_amount.toLocaleString('vi-VN')}₫</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Xem
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Chi Tiết Đơn Hàng #{selectedOrder?.order_id}</DialogTitle>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Thông Tin Khách Hàng</h4>
                                      <p><strong>Tên:</strong> {selectedOrder.account.full_name}</p>
                                      <p><strong>Email:</strong> {selectedOrder.account.email}</p>
                                      <p><strong>Điện thoại:</strong> {selectedOrder.account.phone || 'Chưa cập nhật'}</p>
                                      <p><strong>Địa chỉ:</strong> {selectedOrder.account.address || 'Chưa cập nhật'}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Thông Tin Đơn Hàng</h4>
                                      <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.order_date).toLocaleString('vi-VN')}</p>
                                      <p><strong>Trạng thái:</strong> {getStatusBadge(selectedOrder.status)}</p>
                                      <p><strong>Tổng tiền:</strong> {selectedOrder.total_amount.toLocaleString('vi-VN')}₫</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-4">Sản Phẩm Đặt Mua</h4>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Sản Phẩm</TableHead>
                                          <TableHead>Số Lượng</TableHead>
                                          <TableHead>Đơn Giá</TableHead>
                                          <TableHead>Thành Tiền</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedOrder.order_details.map((detail) => (
                                          <TableRow key={detail.order_detail_id}>
                                            <TableCell>
                                              <div className="flex items-center space-x-3">
                                                <img 
                                                  src={detail.product.image_path || '/placeholder.svg'} 
                                                  alt={detail.product.name}
                                                  className="w-12 h-12 object-cover rounded"
                                                />
                                                <div>
                                                  <p className="font-medium">{detail.product.name}</p>
                                                  <p className="text-sm text-gray-500">{detail.product.category}</p>
                                                </div>
                                              </div>
                                            </TableCell>
                                            <TableCell>{detail.quantity}</TableCell>
                                            <TableCell>{detail.price.toLocaleString('vi-VN')}₫</TableCell>
                                            <TableCell>{(detail.quantity * detail.price).toLocaleString('vi-VN')}₫</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>

                                  <div className="flex gap-2">
                                    <Select 
                                      value={selectedOrder.status} 
                                      onValueChange={(value) => updateOrderStatus(selectedOrder.order_id, value)}
                                    >
                                      <SelectTrigger className="w-48">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                                        <SelectItem value="Đã giao">Đã giao</SelectItem>
                                        <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Select 
                            value={order.status} 
                            onValueChange={(value) => updateOrderStatus(order.order_id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                              <SelectItem value="Đã giao">Đã giao</SelectItem>
                              <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderManagement;
