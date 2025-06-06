
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Edit2, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockOrders } from '../../data/mockData';

const OrderManagement = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(mockOrders);

  if (!state.user || state.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Không có quyền truy cập</h2>
          <p className="text-gray-600 mb-4">Bạn cần quyền admin để truy cập trang này</p>
          <Button onClick={() => window.location.href = '/'}>Về trang chủ</Button>
        </Card>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Chờ xử lý':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Đang giao':
        return <Truck className="h-4 w-4 text-blue-500" />;
      case 'Đã giao':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Đã hủy':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Chờ xử lý':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Đang giao':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Đã giao':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as 'Chờ xử lý' | 'Đang giao' | 'Đã giao' | 'Đã hủy' }
          : order
      )
    );
    console.log(`Đã cập nhật đơn hàng ${orderId} thành trạng thái ${newStatus}`);
  };

  const OrderCard = ({ order }: { order: any }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
            <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
          <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusBadgeClass(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="font-medium">{order.status}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Thông tin khách hàng</h4>
            <p className="text-sm"><strong>Tên:</strong> {order.customerInfo.name}</p>
            <p className="text-sm"><strong>SĐT:</strong> {order.customerInfo.phone}</p>
            <p className="text-sm"><strong>Địa chỉ:</strong> {order.customerInfo.address}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Chi tiết đơn hàng</h4>
            <p className="text-sm"><strong>Số sản phẩm:</strong> {order.items.length}</p>
            <p className="text-sm"><strong>Tổng tiền:</strong> <span className="text-green-600 font-bold">{formatPrice(order.total)}</span></p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Thông tin khách hàng</h4>
                    <p>Tên: {order.customerInfo.name}</p>
                    <p>SĐT: {order.customerInfo.phone}</p>
                    <p>Địa chỉ: {order.customerInfo.address}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Thông tin đơn hàng</h4>
                    <p>Mã đơn: {order.id}</p>
                    <p>Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                    <p>Trạng thái: {order.status}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sản phẩm</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded mr-3"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium text-green-600">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-green-600">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Select onValueChange={(value) => updateOrderStatus(order.id, value)}>
            <SelectTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Cập nhật
              </Button>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
              <SelectItem value="Đang giao">Đang giao</SelectItem>
              <SelectItem value="Đã giao">Đã giao</SelectItem>
              <SelectItem value="Đã hủy">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đơn hàng</h1>
          <p className="text-gray-600">Theo dõi và xử lý các đơn hàng của khách hàng</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {orders.filter(o => o.status === 'Chờ xử lý').length}
                  </div>
                  <p className="text-orange-100">Chờ xử lý</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {orders.filter(o => o.status === 'Đang giao').length}
                  </div>
                  <p className="text-blue-100">Đang giao</p>
                </div>
                <Truck className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {orders.filter(o => o.status === 'Đã giao').length}
                  </div>
                  <p className="text-green-100">Đã giao</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-red-400 to-red-500 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold mb-1">
                    {orders.filter(o => o.status === 'Đã hủy').length}
                  </div>
                  <p className="text-red-100">Đã hủy</p>
                </div>
                <XCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng hoặc số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                  <SelectItem value="Đang giao">Đang giao</SelectItem>
                  <SelectItem value="Đã giao">Đã giao</SelectItem>
                  <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Danh sách đơn hàng ({filteredOrders.length})</h2>
          </div>
          
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Không tìm thấy đơn hàng nào.</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
