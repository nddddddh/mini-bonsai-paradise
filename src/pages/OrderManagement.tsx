import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Filter, Eye, Edit, Trash2, Package, Truck, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    customer: "Nguyễn Văn A",
    date: "2024-07-15",
    total: 250000,
    status: "delivered",
    trackingNumber: "GHN123456789",
  },
  {
    id: "2",
    customer: "Trần Thị B",
    date: "2024-07-10",
    total: 180000,
    status: "shipped",
    trackingNumber: "VTP987654321",
  },
  {
    id: "3",
    customer: "Lê Văn C",
    date: "2024-07-05",
    total: 320000,
    status: "processing",
  },
  {
    id: "4",
    customer: "Phạm Thị D",
    date: "2024-06-28",
    total: 120000,
    status: "pending",
  },
  {
    id: "5",
    customer: "Hoàng Văn E",
    date: "2024-06-20",
    total: 450000,
    status: "cancelled",
  },
];

const OrderManagement = ({ navigate }: PageProps) => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredOrders = orders.filter(order => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(order.customer) && (filterStatus === '' || order.status === filterStatus);
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn as keyof Order];
      const bValue = b[sortColumn as keyof Order];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    }
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsEditing(true);
  };

  const handleDeleteOrder = (order: Order) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng của ${order.customer}?`)) {
      setOrders(orders.filter(o => o.id !== order.id));
      toast.success(`Đã xóa đơn hàng của ${order.customer}.`);
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Đã cập nhật trạng thái đơn hàng thành ${newStatus}.`);
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quản lý đơn hàng</CardTitle>
            <CardDescription>
              Theo dõi, chỉnh sửa và quản lý tất cả các đơn hàng.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Đang chờ xử lý</TabsTrigger>
                <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
                <TabsTrigger value="shipped">Đang giao hàng</TabsTrigger>
                <TabsTrigger value="delivered">Đã giao hàng</TabsTrigger>
                <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
              </TabsList>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tất cả trạng thái</SelectItem>
                      <SelectItem value="pending">Đang chờ xử lý</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="shipped">Đang giao hàng</SelectItem>
                      <SelectItem value="delivered">Đã giao hàng</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </Button>
              </div>
              <TabsContent value="all" className="outline-none">
                <div className="relative overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead onClick={() => handleSort('id')} className="cursor-pointer">
                          Mã đơn hàng
                        </TableHead>
                        <TableHead onClick={() => handleSort('customer')} className="cursor-pointer">
                          Khách hàng
                        </TableHead>
                        <TableHead onClick={() => handleSort('date')} className="cursor-pointer">
                          Ngày đặt
                        </TableHead>
                        <TableHead onClick={() => handleSort('total')} className="cursor-pointer">
                          Tổng tiền
                        </TableHead>
                        <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                          Trạng thái
                        </TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                          <TableCell>
                            {order.status === 'pending' && (
                              <Badge variant="secondary">Đang chờ xử lý</Badge>
                            )}
                            {order.status === 'processing' && (
                              <Badge variant="warning">Đang xử lý</Badge>
                            )}
                            {order.status === 'shipped' && (
                              <Badge variant="info">Đang giao hàng</Badge>
                            )}
                            {order.status === 'delivered' && (
                              <Badge variant="success">Đã giao hàng</Badge>
                            )}
                            {order.status === 'cancelled' && (
                              <Badge variant="destructive">Đã hủy</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditOrder(order)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteOrder(order)}
                                className="text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {sortedOrders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Không có đơn hàng nào.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="pending" className="outline-none">
                <div>Đang chờ xử lý content</div>
              </TabsContent>
              <TabsContent value="processing" className="outline-none">
                <div>Đang xử lý content</div>
              </TabsContent>
              <TabsContent value="shipped" className="outline-none">
                <div>Đang giao hàng content</div>
              </TabsContent>
              <TabsContent value="delivered" className="outline-none">
                <div>Đã giao hàng content</div>
              </TabsContent>
              <TabsContent value="cancelled" className="outline-none">
                <div>Đã hủy content</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default OrderManagement;
