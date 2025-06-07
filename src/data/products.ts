
import { Product } from '@/types/supabase';

// Updated products data to match database schema
export const products: Product[] = [
  {
    product_id: 1,
    name: "Terrarium Rừng Nhiệt Đới Mini",
    category: 2, // Mini
    description: "Một khu rừng nhiệt đới thu nhỏ trong bình thủy tinh, mang không khí xanh mát đến không gian của bạn. Terrarium này bao gồm các loại cây như Fitonia, cây dương xỉ mini và rêu Phượng Hoàng, tạo nên một hệ sinh thái cân bằng.",
    price: 450000,
    stock_quantity: 15,
    image_path: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    product_id: 2,
    name: "Bonsai Cần Thăng Mini",
    category: 3, // Phong thủy
    description: "Bonsai Cần Thăng mini đại diện cho sự kiên cường và khả năng thích nghi. Được tạo dáng tỉ mỉ trên chậu gốm cao cấp, cây mang vẻ đẹp thanh tao của nghệ thuật bonsai Nhật Bản trong không gian nhỏ gọn.",
    price: 550000,
    stock_quantity: 8,
    image_path: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  },
  {
    product_id: 3,
    name: "Sen Đá Nhỏ Xinh",
    category: 2, // Mini
    description: "Bộ sưu tập sen đá mini xinh xắn với nhiều màu sắc đa dạng, trồng trong chậu gốm trang trí tinh tế. Lý tưởng cho không gian làm việc hoặc góc nhỏ trong nhà.",
    price: 120000,
    stock_quantity: 25,
    image_path: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
  },
  {
    product_id: 4,
    name: "Không Khí Tillandsia",
    category: 1, // Cây có hoa
    description: "Cây không khí Tillandsia độc đáo không cần đất để phát triển, tạo điểm nhấn trang trí ấn tượng. Có thể treo hoặc đặt trong các khung kính trang trí.",
    price: 180000,
    stock_quantity: 12,
    image_path: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80"
  },
  {
    product_id: 5,
    name: "Chậu Xi Măng Nghệ Thuật",
    category: 2, // Mini
    description: "Chậu xi măng handmade với thiết kế hiện đại, kết cấu độc đáo phù hợp với mọi không gian sống. Lý tưởng cho sen đá, xương rồng hoặc các loại cây mini.",
    price: 220000,
    stock_quantity: 18,
    image_path: "https://images.unsplash.com/photo-1592170577795-f8df9a9b0441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    product_id: 6,
    name: "Terrarium Đá Quý",
    category: 3, // Phong thủy
    description: "Terrarium sang trọng kết hợp cây xanh với đá quý như thạch anh tím, aventurine và đá thạch anh hồng, tạo nên sự cân bằng năng lượng cho không gian sống.",
    price: 680000,
    stock_quantity: 5,
    image_path: "https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    product_id: 7,
    name: "Bộ Dụng Cụ Chăm Sóc Cây Mini",
    category: 2, // Mini
    description: "Bộ dụng cụ đầy đủ với thiết kế nhỏ gọn dành cho việc chăm sóc cây cảnh mini. Bao gồm kéo tỉa, xẻng, cào và các công cụ cần thiết khác.",
    price: 250000,
    stock_quantity: 20,
    image_path: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    product_id: 8,
    name: "Xương Rồng Bóng Thủy Tinh",
    category: 2, // Mini
    description: "Xương rồng bóng thủy tinh với hình dáng tròn đặc biệt, tạo điểm nhấn thú vị cho bàn làm việc hoặc kệ sách. Cây có thân xanh bóng đẹp mắt và gai mềm an toàn.",
    price: 150000,
    stock_quantity: 15,
    image_path: "https://images.unsplash.com/photo-1551888419-7b7a520fe0ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  }
];

// Legacy export for compatibility
export const plants = products;
