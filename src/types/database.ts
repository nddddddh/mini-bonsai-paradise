
export interface Product {
  product_id: number;
  name: string;
  category: number; // 1=Cây có hoa, 2=Mini, 3=Phong thủy
  description?: string;
  price: number;
  stock_quantity: number;
  image_path?: string;
}

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
  created_at: string;
  updated_at: string;
}

export interface Order {
  order_id: number;
  account_id: number;
  order_date: string;
  total_amount: number;
  status: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

export interface Wishlist {
  id: number;
  account_id: number;
  product_id: number;
  created_at: string;
}
