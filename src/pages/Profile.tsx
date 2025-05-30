
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Camera, Package, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Order, OrderDetail, Product } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface OrderWithDetails extends Order {
  order_details: (OrderDetail & { product: Product })[];
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState<OrderWithDetails[]>([]);
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar_url: user?.avatar_url || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserOrders();
  }, [user, navigate]);

  const fetchUserOrders = async () => {
    if (!user) return;
    
    try {
      // Fetch user orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('account_id', user.account_id)
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

        ordersWithDetails.push({
          ...order,
          order_details: transformedDetails
        });
      }

      setUserOrders(ordersWithDetails);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('accounts')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
          address: profileData.address,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('account_id', user.account_id);

      if (error) throw error;

      // Update local storage
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Lỗi khi cập nhật thông tin!');
    } finally {
      setLoading(false);
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thông Tin Cá Nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản và đơn hàng của bạn</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Thông Tin Cá Nhân</TabsTrigger>
            <TabsTrigger value="orders">Lịch Sử Đơn Hàng</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Tài Khoản</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileData.avatar_url} alt={profileData.full_name} />
                      <AvatarFallback className="text-2xl">
                        {profileData.full_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{profileData.full_name}</h3>
                      <p className="text-gray-600">{user.role === 0 ? 'Quản trị viên' : 'Khách hàng'}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="w-4 h-4 mr-2" />
                        Thay đổi ảnh
                      </Button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Họ và tên</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="full_name"
                          value={profileData.full_name}
                          onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          className="pl-10"
                          disabled
                        />
                      </div>
                      <p className="text-sm text-gray-500">Email không thể thay đổi</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="pl-10"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar_url">URL Avatar</Label>
                      <Input
                        id="avatar_url"
                        value={profileData.avatar_url}
                        onChange={(e) => setProfileData({...profileData, avatar_url: e.target.value})}
                        placeholder="Nhập URL ảnh đại diện"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <Textarea
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="pl-10"
                        placeholder="Nhập địa chỉ đầy đủ"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                    </Button>
                    <Button type="button" variant="outline" onClick={logout}>
                      Đăng xuất
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Lịch Sử Đơn Hàng ({userOrders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
                    <Button className="mt-4" onClick={() => navigate('/products')}>
                      Mua sắm ngay
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userOrders.map((order) => (
                      <Card key={order.order_id} className="border-l-4 border-l-nature-500">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold">Đơn hàng #{order.order_id}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {new Date(order.order_date).toLocaleDateString('vi-VN')}
                                </span>
                                <span>{order.order_details.length} sản phẩm</span>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status)}
                              <p className="text-lg font-semibold mt-1">
                                {order.total_amount.toLocaleString('vi-VN')}₫
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {order.order_details.map((detail) => (
                              <div key={detail.order_detail_id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <img 
                                  src={detail.product.image_path || '/placeholder.svg'} 
                                  alt={detail.product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium">{detail.product.name}</h4>
                                  <p className="text-sm text-gray-600">{detail.product.category}</p>
                                  <p className="text-sm">
                                    Số lượng: {detail.quantity} • 
                                    Giá: {detail.price.toLocaleString('vi-VN')}₫
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    {(detail.quantity * detail.price).toLocaleString('vi-VN')}₫
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              Đặt hàng lúc: {new Date(order.order_date).toLocaleString('vi-VN')}
                            </div>
                            <div className="flex space-x-2">
                              {order.status === 'Đã giao' && (
                                <Button variant="outline" size="sm">
                                  Mua lại
                                </Button>
                              )}
                              {order.status === 'Chờ xử lý' && (
                                <Button variant="outline" size="sm">
                                  Hủy đơn
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
