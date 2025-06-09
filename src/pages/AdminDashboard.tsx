import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const mockOrders: Order[] = [
  { id: '1', customer: 'user1', date: '2024-01-20', total: 150, status: 'delivered' },
  { id: '2', customer: 'user2', date: '2024-01-22', total: 200, status: 'shipped' },
  { id: '3', customer: 'user3', date: '2024-01-25', total: 80, status: 'processing' },
  { id: '4', customer: 'user4', date: '2024-01-28', total: 320, status: 'delivered' },
  { id: '5', customer: 'user5', date: '2024-02-01', total: 120, status: 'pending' },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Bonsai Ficus', category: 'Ficus', price: 75, stock: 50 },
  { id: '2', name: 'Bonsai Juniper', category: 'Juniper', price: 90, stock: 30 },
  { id: '3', name: 'Bonsai Maple', category: 'Maple', price: 120, stock: 20 },
  { id: '4', name: 'Bonsai Pine', category: 'Pine', price: 110, stock: 25 },
];

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4000 },
  { name: 'Sep', revenue: 3000 },
  { name: 'Oct', revenue: 2000 },
  { name: 'Nov', revenue: 2780 },
  { name: 'Dec', revenue: 1890 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminDashboard = ({ navigate }: PageProps) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalRevenue = data.reduce((acc, month) => acc + month.revenue, 0);
  const newOrders = mockOrders.filter(order => order.status === 'pending').length;
  const lowStockProducts = mockProducts.filter(product => product.stock < 20).length;
  const newCustomers = 5;

  const productCategoryData = mockProducts.reduce((acc: any, product) => {
    const category = product.category;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const pieChartData = Object.keys(productCategoryData).map(category => ({
    name: category,
    value: productCategoryData[category],
  }));

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
            <CardDescription>Overview of your e-commerce store</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        Total Revenue
                      </CardTitle>
                      <CardDescription>All time revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${totalRevenue}</div>
                      <p className="text-sm text-gray-500">
                        <Badge variant="secondary">+12%</Badge> from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-blue-500" />
                        New Orders
                      </CardTitle>
                      <CardDescription>Last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{newOrders}</div>
                      <p className="text-sm text-gray-500">
                        <Badge variant="destructive">-3%</Badge> from last day
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-orange-500" />
                        Low Stock
                      </CardTitle>
                      <CardDescription>Products running low</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{lowStockProducts}</div>
                      <p className="text-sm text-gray-500">
                        <Badge variant="secondary">+8%</Badge> critical level
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        New Customers
                      </CardTitle>
                      <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{newCustomers}</div>
                      <p className="text-sm text-gray-500">
                        <Badge variant="secondary">+5%</Badge> from last week
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Monthly revenue data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Category Distribution</CardTitle>
                    <CardDescription>Distribution of products across categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Reports</CardTitle>
                    <CardDescription>Generate custom reports for your store</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This feature is under development. Please check back later.</p>
                    <Button>Generate Report</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
