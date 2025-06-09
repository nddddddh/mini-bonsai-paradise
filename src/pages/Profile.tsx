import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  Heart,
  Settings,
  Edit,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProfileProps } from "@/types/navigation";

const Profile = ({ navigate }: ProfileProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    birthday: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        birthday: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Update profile logic would go here
      toast({
        title: "Hồ sơ đã được cập nhật",
        description: "Thông tin cá nhân của bạn đã được lưu thành công.",
      });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: error.message || "Không thể cập nhật hồ sơ của bạn.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      // Sign out logic would go here
      navigate('/login');
      toast({
        title: "Đăng xuất thành công",
        description: "Bạn đã đăng xuất khỏi tài khoản của mình.",
      });
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: error.message || "Không thể đăng xuất vào lúc này.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Bạn cần phải đăng nhập để xem trang này.</p>
            <Button onClick={() => navigate('/login')}>Đăng nhập</Button>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <User className="mr-2 h-5 w-5" />
              Hồ sơ của tôi
            </CardTitle>
            <CardDescription>
              Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
                <TabsTrigger value="wishlist">Yêu thích</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="birthday">Ngày sinh</Label>
                    <Input
                      type="date"
                      id="birthday"
                      name="birthday"
                      value={profileData.birthday}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex justify-end">
                    {isEditing ? (
                      <div className="space-x-2">
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                          <X className="mr-2 h-4 w-4" />
                          Hủy
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="mr-2 h-4 w-4" />
                          Lưu
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="orders">
                <div className="text-center py-4">
                  <ShoppingBag className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Chưa có đơn hàng nào.</p>
                </div>
              </TabsContent>
              <TabsContent value="wishlist">
                <div className="text-center py-4">
                  <Heart className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Danh sách yêu thích của bạn đang trống.</p>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bảo mật tài khoản</CardTitle>
                      <CardDescription>Quản lý cài đặt bảo mật của bạn</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="destructive" onClick={handleSignOut}>
                        Đăng xuất
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default Profile;
