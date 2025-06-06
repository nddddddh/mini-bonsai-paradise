
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
  const { state } = useApp();

  if (!state.user || state.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không có quyền truy cập</h2>
          <button onClick={() => window.location.href = '/'} className="btn">Về trang chủ</button>
        </div>
      </div>
    );
  }

  const monthlyRevenue = [
    { month: 'T1', revenue: 12000000 },
    { month: 'T2', revenue: 15000000 },
    { month: 'T3', revenue: 18000000 },
    { month: 'T4', revenue: 22000000 },
    { month: 'T5', revenue: 25000000 },
    { month: 'T6', revenue: 28000000 },
  ];

  const dailyOrders = [
    { day: 'CN', orders: 12 },
    { day: 'T2', orders: 15 },
    { day: 'T3', orders: 18 },
    { day: 'T4', orders: 22 },
    { day: 'T5', orders: 25 },
    { day: 'T6', orders: 28 },
    { day: 'T7', orders: 30 },
  ];

  const categoryData = [
    { name: 'Bonsai Truyền Thống', value: 40, color: '#22c55e' },
    { name: 'Bonsai Mini', value: 30, color: '#3b82f6' },
    { name: 'Chậu Bonsai', value: 20, color: '#f59e0b' },
    { name: 'Combo', value: 10, color: '#ef4444' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Doanh Thu</h1>
          <p className="text-gray-600">Tổng quan về hiệu suất kinh doanh</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
                  <p className="text-2xl font-bold text-green-600">28.000.000đ</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% so với tháng trước
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Đơn hàng mới</p>
                  <p className="text-2xl font-bold text-blue-600">156</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% so với tuần trước
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Khách hàng</p>
                  <p className="text-2xl font-bold text-purple-600">1,234</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% so với tháng trước
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Sản phẩm</p>
                  <p className="text-2xl font-bold text-orange-600">89</p>
                  <p className="text-xs text-red-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -2 sản phẩm hết hàng
                  </p>
                </div>
                <Package className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu 6 tháng gần đây</CardTitle>
              <CardDescription>Theo dõi xu hướng doanh thu hàng tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng trong tuần</CardTitle>
              <CardDescription>Số lượng đơn hàng theo từng ngày</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyOrders}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bố danh mục sản phẩm</CardTitle>
              <CardDescription>Tỷ lệ bán hàng theo từng danh mục</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm có doanh số cao nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Bonsai Tùng La Hán Mini', sales: 45, revenue: '20.250.000đ' },
                  { name: 'Bonsai Cây Sanh Cổ', sales: 32, revenue: '38.400.000đ' },
                  { name: 'Combo Bonsai Kim Tiền', sales: 28, revenue: '18.200.000đ' },
                  { name: 'Chậu Ceramic Nhật Bản', sales: 24, revenue: '6.720.000đ' },
                  { name: 'Bonsai Cây Hoa Mai', sales: 18, revenue: '15.300.000đ' },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.sales} đơn hàng</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{product.revenue}</p>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
