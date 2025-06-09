import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  Plus
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { AdminDashboardProps } from "@/types/navigation";

const AdminDashboard = ({ navigate }: AdminDashboardProps) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.isAdmin) {
      toast({
        title: "Truy cập bị từ chối",
        description: "Bạn không có quyền truy cập trang này.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate, toast]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch total users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      if (usersError) {
        console.error("Error fetching total users:", usersError);
        throw usersError;
      }

      setTotalUsers(usersData ? usersData.length : 0);

      // Fetch total products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (productsError) {
        console.error("Error fetching total products:", productsError);
        throw productsError;
      }

      setTotalProducts(productsData ? productsData.length : 0);

      // Fetch total orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact' });

      if (ordersError) {
        console.error("Error fetching total orders:", ordersError);
        throw ordersError;
      }

      setTotalOrders(ordersData ? ordersData.length : 0);

      // Fetch recent orders (e.g., last 5 orders)
      const { data: recentOrdersData, error: recentOrdersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentOrdersError) {
        console.error("Error fetching recent orders:", recentOrdersError);
        throw recentOrdersError;
      }

      setRecentOrders(recentOrdersData || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải dữ liệu thống kê.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <p className="text-gray-500">Đang tải dữ liệu thống kê...</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Chào mừng đến với trang quản trị!
          </h1>
          <p className="text-gray-600">
            Tổng quan về hoạt động kinh doanh của bạn
          </p>
        </div>

        {/* Quick Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-blue-700">
                  Tổng số người dùng
                </span>
                <Users className="text-blue-500 w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-sm text-gray-500">
                <TrendingUp className="inline-block w-4 h-4 mr-1" />
                30% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-green-700">
                  Tổng số sản phẩm
                </span>
                <Package className="text-green-500 w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
              <p className="text-sm text-gray-500">
                <TrendingUp className="inline-block w-4 h-4 mr-1" />
                15% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-yellow-700">
                  Tổng số đơn hàng
                </span>
                <ShoppingCart className="text-yellow-500 w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-sm text-gray-500">
                <TrendingUp className="inline-block w-4 h-4 mr-1" />
                20% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold text-red-700">
                  Doanh thu
                </span>
                <DollarSign className="text-red-500 w-6 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">$12,500</p>
              <p className="text-sm text-gray-500">
                <TrendingUp className="inline-block w-4 h-4 mr-1" />
                25% so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <CardDescription>
              Danh sách các đơn hàng mới nhất
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mã đơn hàng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Khách hàng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ngày đặt hàng
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tổng tiền
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trạng thái
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Xem</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order: any) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {order.customer_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        ${order.total_amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          order.status === "Đã giao hàng"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Xem
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hành động nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => navigate('/admin/products/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm sản phẩm mới
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/admin/orders')}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quản lý đơn hàng
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/admin/products')}>
              <Package className="w-4 h-4 mr-2" />
              Quản lý sản phẩm
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => navigate('/profile')}>
              <Users className="w-4 h-4 mr-2" />
              Quản lý người dùng
            </Button>
          </div>
        </div>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default AdminDashboard;
