
export interface Account {
  account_id: number;
  username: string;
  password_hash: string;
  email: string;
  full_name: string;
  role: number; // 0: admin, 1: customer
  phone?: string;
  address?: string;
  avatar_url?: string;
  created_at: string; // Changed from Date to string
  updated_at: string; // Changed from Date to string
}

export interface Order {
  order_id: number;
  account_id: number;
  order_date: string; // Changed from Date to string
  total_amount: number;
  status: 'Chờ xử lý' | 'Đã giao' | 'Đã hủy';
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Product {
  product_id: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  stock_quantity: number;
  image_path?: string;
}

export interface Wishlist {
  id: number;
  account_id: number;
  product_id: number;
  created_at: string; // Changed from Date to string
}

export interface RevenueStats {
  order_date: string;
  total_orders: number;
  daily_revenue: number;
  avg_order_value: number;
}

export interface ProductSales {
  product_id: number;
  name: string;
  category: string;
  total_sold: number;
  total_revenue: number;
}
