
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Lock, User, CreditCard, Globe, Shield, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { state } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    promotions: true,
  });

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h2>
          <Button onClick={() => window.location.href = '/'}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cài đặt</h1>
          <p className="text-gray-600">Quản lý tài khoản và tùy chọn cá nhân của bạn</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              Bảo mật
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Thông báo
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Tùy chọn
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
                <CardDescription>
                  Cập nhật thông tin cá nhân và liên hệ của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input id="fullName" defaultValue={state.user?.name} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={state.user?.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue={state.user?.phone} />
                  </div>
                  <div>
                    <Label htmlFor="role">Vai trò</Label>
                    <div className="flex items-center mt-2">
                      <Badge variant={state.user?.role === 'admin' ? 'destructive' : 'secondary'}>
                        {state.user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input id="address" defaultValue={state.user?.address} />
                </div>
                <Separator />
                <Button>Lưu thay đổi</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Bảo mật tài khoản</CardTitle>
                <CardDescription>
                  Quản lý mật khẩu và cài đặt bảo mật
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Xác thực hai yếu tố
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Xác thực qua SMS</p>
                      <p className="text-sm text-gray-600">Nhận mã xác thực qua tin nhắn</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Xác thực qua ứng dụng</p>
                      <p className="text-sm text-gray-600">Sử dụng ứng dụng xác thực như Google Authenticator</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Separator />
                <Button>Cập nhật mật khẩu</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt thông báo</CardTitle>
                <CardDescription>
                  Chọn loại thông báo bạn muốn nhận
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Thông báo qua Email</p>
                      <p className="text-sm text-gray-600">Nhận thông báo về đơn hàng và khuyến mãi qua email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Thông báo qua SMS</p>
                      <p className="text-sm text-gray-600">Nhận tin nhắn về trạng thái đơn hàng</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Thông báo đẩy</p>
                      <p className="text-sm text-gray-600">Nhận thông báo trực tiếp trên trình duyệt</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Khuyến mãi và ưu đãi</p>
                      <p className="text-sm text-gray-600">Nhận thông tin về các chương trình khuyến mãi</p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, promotions: checked }))
                      }
                    />
                  </div>
                </div>
                <Separator />
                <Button>Lưu cài đặt</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Settings */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Tùy chọn cá nhân</CardTitle>
                <CardDescription>
                  Tùy chỉnh trải nghiệm sử dụng của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Chế độ tối</p>
                      <p className="text-sm text-gray-600">Sử dụng giao diện tối cho website</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Hiển thị giá gốc</p>
                      <p className="text-sm text-gray-600">Luôn hiển thị giá gốc kèm giá khuyến mãi</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tự động lưu giỏ hàng</p>
                      <p className="text-sm text-gray-600">Tự động lưu sản phẩm trong giỏ hàng</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Gợi ý sản phẩm</p>
                      <p className="text-sm text-gray-600">Hiển thị sản phẩm được gợi ý dựa trên lịch sử</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <Separator />
                <div>
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <select className="w-full p-2 border rounded-md mt-2">
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                  <select className="w-full p-2 border rounded-md mt-2">
                    <option value="vnd">VND (₫)</option>
                    <option value="usd">USD ($)</option>
                  </select>
                </div>
                <Separator />
                <Button>Lưu tùy chọn</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
