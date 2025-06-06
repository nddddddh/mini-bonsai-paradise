
import { Product, User, Category, Order } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Bonsai Truyền Thống', description: 'Các loại bonsai cổ điển Nhật Bản' },
  { id: '2', name: 'Bonsai Mini', description: 'Bonsai kích thước nhỏ phù hợp để bàn' },
  { id: '3', name: 'Chậu Bonsai', description: 'Chậu ceramic và đất nung cho bonsai' },
  { id: '4', name: 'Combo Bonsai + Chậu', description: 'Bộ sưu tập bonsai kèm chậu phù hợp' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bonsai Tùng La Hán Mini',
    description: 'Cây tùng la hán mini với dáng cổ thụ, phù hợp để bàn làm việc',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
    category: '2',
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Bonsai Cây Sanh Cổ',
    description: 'Cây sanh cổ thụ với thân cành uốn lượn tự nhiên',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400',
    category: '1',
    stock: 8,
    featured: true,
  },
  {
    id: '3',
    name: 'Chậu Ceramic Nhật Bản',
    description: 'Chậu ceramic cao cấp phong cách Nhật Bản, màu nâu đất',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400',
    category: '3',
    stock: 25,
    featured: false,
  },
  {
    id: '4',
    name: 'Combo Bonsai Kim Tiền + Chậu',
    description: 'Bộ combo bonsai kim tiền kèm chậu ceramic phù hợp',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
    category: '4',
    stock: 12,
    featured: true,
  },
  {
    id: '5',
    name: 'Bonsai Cây Hoa Mai',
    description: 'Cây hoa mai bonsai với hoa vàng đẹp mắt',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
    category: '1',
    stock: 6,
    featured: false,
  },
  {
    id: '6',
    name: 'Bonsai Trúc Mini',
    description: 'Cây trúc mini dễ chăm sóc, mang lại may mắn',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
    category: '2',
    stock: 20,
    featured: false,
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@email.com',
  phone: '0123456789',
  address: '123 Đường ABC, Quận 1, TP.HCM',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  role: 'user',
  favoriteProducts: ['1', '4'],
};

export const mockAdmin: User = {
  id: '2',
  name: 'Admin System',
  email: 'admin@bonsai.com',
  phone: '0987654321',
  address: '456 Đường XYZ, Quận 3, TP.HCM',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  role: 'admin',
  favoriteProducts: [],
};

export const mockOrders: Order[] = [
  {
    id: '1',
    items: [
      { 
        product: products[0], 
        quantity: 1, 
        price: 450000 
      },
      { 
        product: products[2], 
        quantity: 1, 
        price: 280000 
      },
    ],
    total: 730000,
    status: 'Chờ xử lý',
    customerInfo: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
    },
    createdAt: '2024-05-25T10:30:00Z',
  },
  {
    id: '2',
    items: [
      { 
        product: products[1], 
        quantity: 1, 
        price: 1200000 
      },
    ],
    total: 1200000,
    status: 'Đã giao',
    customerInfo: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Quận 1, TP.HCM',
    },
    createdAt: '2024-05-28T14:15:00Z',
  },
];
