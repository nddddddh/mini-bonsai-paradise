
import { Product } from '@/types/database';

// Updated products data to match database schema
export const products: Product[] = [
  {
    product_id: 1,
    name: "Terrarium Rừng Nhiệt Đới Mini",
    category: 2, // Mini
    description: "Một khu rừng nhiệt đới thu nhỏ trong bình thủy tinh, mang không khí xanh mát đến không gian của bạn. Terrarium này bao gồm các loại cây như Fitonia, cây dương xỉ mini và rêu Phượng Hoàng, tạo nên một hệ sinh thái cân bằng.",
    price: 450000,
    stock_quantity: 15,
    salePrice: 399000,
    image: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1509937528035-ad76254b0356?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
      "https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng tán xạ, không để dưới ánh nắng trực tiếp",
      water: "Cứ 2-3 tuần phun sương nhẹ một lần",
      temperature: "20-25°C",
      humidity: "Cao"
    },
    features: [
      "Tự duy trì, cần ít chăm sóc",
      "Bình thủy tinh cao cấp",
      "Hệ sinh thái cân bằng",
      "Lọc không khí tự nhiên"
    ]
  },
  {
    product_id: 2,
    name: "Bonsai Cần Thăng Mini",
    category: 3, // Phong thủy
    description: "Bonsai Cần Thăng mini đại diện cho sự kiên cường và khả năng thích nghi. Được tạo dáng tỉ mỉ trên chậu gốm cao cấp, cây mang vẻ đẹp thanh tao của nghệ thuật bonsai Nhật Bản trong không gian nhỏ gọn.",
    price: 550000,
    stock_quantity: 8,
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      "https://images.unsplash.com/photo-1606490102035-307fe527f037?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng trực tiếp một phần ngày",
      water: "Giữ đất ẩm, không để ngập úng",
      temperature: "15-30°C",
      humidity: "Trung bình"
    },
    features: [
      "Cây đã được tạo dáng 3 năm tuổi",
      "Chậu gốm cao cấp",
      "Bao gồm khay hứng nước",
      "Kích thước nhỏ gọn phù hợp để bàn"
    ]
  },
  {
    product_id: 3,
    name: "Sen Đá Nhỏ Xinh",
    category: 2, // Mini
    description: "Bộ sưu tập sen đá mini xinh xắn với nhiều màu sắc đa dạng, trồng trong chậu gốm trang trí tinh tế. Lý tưởng cho không gian làm việc hoặc góc nhỏ trong nhà.",
    price: 120000,
    stock_quantity: 25,
    salePrice: 99000,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng tốt, chịu được nắng trực tiếp",
      water: "Tưới ít, để đất khô giữa các lần tưới",
      temperature: "15-35°C",
      humidity: "Thấp đến trung bình"
    },
    features: [
      "Bộ 3 sen đá khác nhau",
      "Chậu gốm trang trí đẹp mắt",
      "Cần ít nước và dễ chăm sóc",
      "Lý tưởng cho người mới bắt đầu"
    ]
  },
  {
    product_id: 4,
    name: "Không Khí Tillandsia",
    category: 1, // Cây có hoa
    description: "Cây không khí Tillandsia độc đáo không cần đất để phát triển, tạo điểm nhấn trang trí ấn tượng. Có thể treo hoặc đặt trong các khung kính trang trí.",
    price: 180000,
    stock_quantity: 12,
    image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80",
    images: [
      "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=713&q=80",
      "https://images.unsplash.com/photo-1526403646408-57b94dc15ee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1567748157439-651aca2ff064?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng tán xạ",
      water: "Nhúng vào nước 1-2 lần/tuần",
      temperature: "18-30°C",
      humidity: "Trung bình đến cao"
    },
    features: [
      "Không cần đất để phát triển",
      "Hút các chất độc hại từ không khí",
      "Dễ dàng thay đổi vị trí trưng bày",
      "Bao gồm dây treo trang trí"
    ]
  },
  {
    product_id: 5,
    name: "Chậu Xi Măng Nghệ Thuật",
    category: 2, // Mini
    description: "Chậu xi măng handmade với thiết kế hiện đại, kết cấu độc đáo phù hợp với mọi không gian sống. Lý tưởng cho sen đá, xương rồng hoặc các loại cây mini.",
    price: 220000,
    stock_quantity: 18,
    image: "https://images.unsplash.com/photo-1592170577795-f8df9a9b0441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1592170577795-f8df9a9b0441?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1609120675587-e123e276d8a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80"
    ],
    features: [
      "Xi măng chất lượng cao",
      "Thiết kế thanh lịch, tối giản",
      "Đã có lỗ thoát nước",
      "Kích thước: 10cm x 10cm x 10cm"
    ]
  },
  {
    product_id: 6,
    name: "Terrarium Đá Quý",
    category: 3, // Phong thủy
    description: "Terrarium sang trọng kết hợp cây xanh với đá quý như thạch anh tím, aventurine và đá thạch anh hồng, tạo nên sự cân bằng năng lượng cho không gian sống.",
    price: 680000,
    stock_quantity: 5,
    salePrice: 599000,
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1604617187902-6d3b3fde2626?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1552814232-34a548f3ad44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng tán xạ, tránh ánh nắng trực tiếp",
      water: "Phun sương nhẹ mỗi 2-3 tuần",
      temperature: "20-25°C",
      humidity: "Trung bình đến cao"
    },
    features: [
      "Bình thủy tinh cao cấp",
      "Đá quý tự nhiên",
      "Cây lọc không khí",
      "Tác dụng trang trí và phong thủy"
    ]
  },
  {
    product_id: 7,
    name: "Bộ Dụng Cụ Chăm Sóc Cây Mini",
    category: 2, // Mini
    description: "Bộ dụng cụ đầy đủ với thiết kế nhỏ gọn dành cho việc chăm sóc cây cảnh mini. Bao gồm kéo tỉa, xẻng, cào và các công cụ cần thiết khác.",
    price: 250000,
    stock_quantity: 20,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1617957743103-310abcfb3c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=732&q=80",
      "https://images.unsplash.com/photo-1620315808304-66597517f188?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    ],
    features: [
      "Thép không gỉ cao cấp",
      "Tay cầm bằng gỗ tự nhiên",
      "Bao gồm 6 dụng cụ thiết yếu",
      "Túi đựng bằng vải canvas"
    ]
  },
  {
    product_id: 8,
    name: "Xương Rồng Bóng Thủy Tinh",
    category: 2, // Mini
    description: "Xương rồng bóng thủy tinh với hình dáng tròn đặc biệt, tạo điểm nhấn thú vị cho bàn làm việc hoặc kệ sách. Cây có thân xanh bóng đẹp mắt và gai mềm an toàn.",
    price: 150000,
    stock_quantity: 15,
    image: "https://images.unsplash.com/photo-1551888419-7b7a520fe0ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    images: [
      "https://images.unsplash.com/photo-1551888419-7b7a520fe0ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1580428456289-31b363a16e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1607575238346-d01aa63a4222?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    careInstructions: {
      light: "Ánh sáng tốt, có thể chịu nắng trực tiếp",
      water: "Tưới rất ít, 2-3 tuần/lần",
      temperature: "18-35°C",
      humidity: "Thấp"
    },
    features: [
      "Chậu gốm trắng tối giản",
      "Đất trồng chuyên dụng",
      "Cây trưởng thành 2 năm tuổi",
      "Gai mềm an toàn"
    ]
  }
];

// Legacy export for compatibility
export const plants = products;
