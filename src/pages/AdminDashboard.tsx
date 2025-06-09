
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getCategoryName } from '@/types/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

interface DailyRevenue {
  date: string;
  revenue: number;
  orders: number;
}

interface ProductSales {
  product_id: number;
  name: string;
  category: number;
  total_sold: number;
  total_revenue: number;
}

interface CategoryStats {
  category: number;
  category_name: string;
  total_products: number;
  total_sold: number;
  total_revenue: number;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0
  });
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);
  const [productSales, setProductSales] = useState<ProductSales[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard data...');

      // Fetch basic stats
      await Promise.all([
        fetchStats(),
        fetchDailyRevenue(),
        fetchProductSales(),
        fetchCategoryStats()
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Total Revenue from completed orders
      const { data: revenueData, error: revenueError } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'Đã giao');

      if (revenueError) throw revenueError;

      const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      // Total Orders
      const { count: totalOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      if (ordersError) throw ordersError;

      // Total Products
      const { count: totalProducts, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productsError) throw productsError;

      // Total Customers (role = 1)
      const { count: totalCustomers, error: customersError } = await supabase
        .from('accounts')
        .select('*', { count: 'exact', head: true })
        .eq('role', 1);

      if (customersError) throw customersError;

      setStats({
        totalRevenue,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0
      });

      console.log('Stats fetched:', { totalRevenue, totalOrders, totalProducts, totalCustomers });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchDailyRevenue = async () => {
    try {
      // Get orders from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('orders')
        .select('order_date, total_amount')
        .eq('status', 'Đã giao')
        .gte('order_date', thirtyDaysAgo.toISOString())
        .order('order_date', { ascending: true });

      if (error) throw error;

      // Group by date
      const groupedData: { [key: string]: { revenue: number; orders: number } } = {};
      
      data?.forEach(order => {
        const date = new Date(order.order_date).toLocaleDateString('vi-VN');
        if (!groupedData[date]) {
          groupedData[date] = { revenue: 0, orders: 0 };
        }
        groupedData[date].revenue += Number(order.total_amount);
        groupedData[date].orders += 1;
      });

      const dailyData = Object.entries(groupedData).map(([date, data]) => ({
        date,
        revenue: data.revenue,
        orders: data.orders
      }));

      setDailyRevenue(dailyData);
      console.log('Daily revenue fetched:', dailyData);
    } catch (error) {
      console.error('Error fetching daily revenue:', error);
    }
  };

  const fetchProductSales = async () => {
    try {
      const { data, error } = await supabase
        .from('order_details')
        .select(`
          product_id,
          quantity,
          price,
          products!inner(name, category)
        `)
        .limit(100);

      if (error) throw error;

      // Group by product
      const productSalesMap: { [key: number]: ProductSales } = {};
      
      data?.forEach(item => {
        const productId = item.product_id;
        if (!productSalesMap[productId]) {
          productSalesMap[productId] = {
            product_id: productId,
            name: (item.products as any).name,
            category: (item.products as any).category,
            total_sold: 0,
            total_revenue: 0
          };
        }
        productSalesMap[productId].total_sold += item.quantity;
        productSalesMap[productId].total_revenue += item.quantity * Number(item.price);
      });

      const salesData = Object.values(productSalesMap)
        .sort((a, b) => b.total_sold - a.total_sold)
        .slice(0, 10);

      setProductSales(salesData);
      console.log('Product sales fetched:', salesData);
    } catch (error) {
      console.error('Error fetching product sales:', error);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw error;

      // Group by category
      const categoryMap: { [key: number]: CategoryStats } = {};
      
      data?.forEach(product => {
        const category = product.category;
        if (!categoryMap[category]) {
          categoryMap[category] = {
            category,
            category_name: getCategoryName(category),
            total_products: 0,
            total_sold: 0,
            total_revenue: 0
          };
        }
        categoryMap[category].total_products += 1;
      });

      setCategoryStats(Object.values(categoryMap));
      console.log('Category stats fetched:', Object.values(categoryMap));
    } catch (error) {
      console.error('Error fetching category stats:', error);
    }
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (!user || !isAdmin()) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Đang tải dữ liệu dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản Trị</h1>
          <p className="text-gray-600 mt-2">Tổng quan hoạt động kinh doanh</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString('vi-VN')}₫</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                Từ các đơn hàng đã giao
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng Đơn Hàng</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Tất cả đơn hàng trong hệ thống
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sản Phẩm</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Đang hoạt động
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách Hàng</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                Tài khoản khách hàng
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Doanh Thu 30 Ngày Qua</CardTitle>
              <CardDescription>Biểu đồ doanh thu theo ngày (chỉ đơn đã giao)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Doanh thu",
                    color: "#10b981",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyRevenue}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`${Number(value).toLocaleString('vi-VN')}₫`, 'Doanh thu']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sản Phẩm Bán Chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm có số lượng bán cao nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  total_sold: {
                    label: "Đã bán",
                    color: "#3b82f6",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productSales.slice(0, 5)}>
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total_sold" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân Bố Theo Danh Mục</CardTitle>
            <CardDescription>Số lượng sản phẩm theo từng danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartContainer
                config={{
                  total_products: {
                    label: "Số sản phẩm",
                    color: "#10b981",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category_name, total_products }) => `${category_name}: ${total_products}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="total_products"
                    >
                      {categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="space-y-4">
                {categoryStats.map((item, index) => (
                  <div key={item.category} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.category_name}</div>
                      <div className="text-sm text-gray-500">
                        {item.total_products} sản phẩm
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
