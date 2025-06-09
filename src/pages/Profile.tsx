import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Settings } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

// Mock order data
const orders = [
  {
    id: 'ORD-1234',
    date: '2023-05-15',
    status: 'delivered',
    total: 1250000,
    items: 3
  },
  {
    id: 'ORD-1235',
    date: '2023-06-02',
    status: 'processing',
    total: 850000,
    items: 2
  },
  {
    id: 'ORD-1236',
    date: '2023-06-10',
    status: 'shipped',
    total: 450000,
    items: 1
  }
];

const Profile = ({ navigate }: PageProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.full_name || 'Nguyễn Văn A',
    email: user?.email || 'nguyenvana@example.com',
    phone: '0912345678',
    address: 'Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh',
    birthday: '1990-01-01'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    setIsEditing(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Đã giao hàng</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Đang xử lý</Badge>;
      case 'shipped':
        return <Badge className="bg-yellow-500">Đang giao hàng</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Tài khoản của tôi</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng của tôi</TabsTrigger>
            <TabsTrigger value="security">Bảo mật</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Hồ sơ</CardTitle>
                  <CardDescription>Thông tin cá nhân của bạn</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                    <AvatarFallback>{user?.full_name?.charAt(0) || 'N'}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-medium">{formData.fullName}</h3>
                  <p className="text-sm text-gray-500">{formData.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{formData.phone}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Hủy chỉnh sửa' : 'Chỉnh sửa thông tin'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Thông tin chi tiết</CardTitle>
                  <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Họ và tên</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Họ và tên"
                            className="pl-10"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Số điện thoại"
                            className="pl-10"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthday">Ngày sinh</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            id="birthday"
                            name="birthday"
                            type="date"
                            className="pl-10"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="address"
                          name="address"
                          placeholder="Địa chỉ"
                          className="pl-10"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          className="bg-nature-600 hover:bg-nature-700"
                          onClick={handleSaveProfile}
                        >
                          Lưu thay đổi
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng của tôi</CardTitle>
                <CardDescription>Lịch sử đơn hàng và trạng thái</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between items-center mb-2">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <p className="text-sm">Số lượng: {order.items} sản phẩm</p>
                          <p className="font-medium">Tổng tiền: {formatCurrency(order.total)}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => toast.info("Chức năng đang phát triển")}>
                          <Package className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật tài khoản</CardTitle>
                <CardDescription>Quản lý mật khẩu và bảo mật</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" />
                  </div>
                  <Button 
                    className="bg-nature-600 hover:bg-nature-700"
                    onClick={() => toast.info("Chức năng đang phát triển")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Cập nhật mật khẩu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
