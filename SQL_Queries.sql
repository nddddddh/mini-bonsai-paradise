
-- SQL Server Queries for Bonsai E-commerce Database (Updated)

-- Create Database
CREATE DATABASE BonsaiShop;
USE BonsaiShop;

-- Accounts Table (Users)
CREATE TABLE Accounts (
    account_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    full_name NVARCHAR(100) NOT NULL,
    role INT NOT NULL CHECK (role IN (0, 1)) DEFAULT 1, -- 0 = admin, 1 = customer
    phone NVARCHAR(20),
    address NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Products Table
CREATE TABLE Products (
    product_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    category NVARCHAR(50) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_path NVARCHAR(255), -- path or image filename
    is_featured BIT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    order_date DATETIME DEFAULT GETDATE(),
    total_amount DECIMAL(10,2) NOT NULL,
    status NVARCHAR(30) NOT NULL CHECK (status IN (N'Chờ xử lý', N'Đang giao', N'Đã giao', N'Đã hủy')) DEFAULT N'Chờ xử lý',
    customer_name NVARCHAR(100) NOT NULL,
    customer_phone NVARCHAR(20) NOT NULL,
    customer_address NVARCHAR(MAX) NOT NULL,
    notes NVARCHAR(1000),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

-- Order Details Table
CREATE TABLE Order_Details (
    order_detail_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Cart Table
CREATE TABLE Cart (
    cart_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

-- Cart Items Table
CREATE TABLE Cart_Items (
    cart_item_id INT IDENTITY(1,1) PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- User Favorites Table
CREATE TABLE User_Favorites (
    favorite_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    UNIQUE(account_id, product_id)
);

-- Insert Sample Accounts
INSERT INTO Accounts (username, password_hash, email, full_name, role, phone, address) VALUES
('user01', 'hashed_password_1', 'nguyenvana@email.com', N'Nguyễn Văn A', 1, '0123456789', N'123 Đường ABC, Quận 1, TP.HCM'),
('admin', 'hashed_password_admin', 'admin@bonsai.com', N'Admin System', 0, '0987654321', N'456 Đường XYZ, Quận 3, TP.HCM'),
('user02', 'hashed_password_2', 'tranthib@email.com', N'Trần Thị B', 1, '0369741852', N'789 Đường DEF, Quận 5, TP.HCM');

-- Insert Sample Products
INSERT INTO Products (name, category, description, price, stock_quantity, image_path, is_featured) VALUES
(N'Bonsai Tùng La Hán Mini', N'bonsai-mini', N'Cây tùng la hán mini với dáng cổ thụ, phù hợp để bàn làm việc. Dễ chăm sóc, thích hợp với người mới bắt đầu', 450000, 15, N'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400', 1),
(N'Bonsai Cây Sanh Cổ', N'bonsai-truyen-thong', N'Cây sanh cổ thụ với thân cành uốn lượn tự nhiên, tuổi đời hơn 10 năm', 1200000, 8, N'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400', 1),
(N'Chậu Ceramic Nhật Bản', N'chau-bonsai', N'Chậu ceramic cao cấp phong cách Nhật Bản, màu nâu đất, kích thước 20x15cm', 280000, 25, N'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400', 0),
(N'Combo Bonsai Kim Tiền + Chậu', N'combo', N'Bộ combo bonsai kim tiền kèm chậu ceramic phù hợp, mang lại may mắn và thịnh vượng', 650000, 12, N'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400', 1),
(N'Bonsai Cây Hoa Mai', N'bonsai-truyen-thong', N'Cây hoa mai bonsai với hoa vàng đẹp mắt, nở hoa vào dịp Tết', 850000, 6, N'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', 0),
(N'Bonsai Trúc Mini', N'bonsai-mini', N'Cây trúc mini dễ chăm sóc, mang lại may mắn và bình an cho gia đình', 320000, 20, N'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400', 0),
(N'Chậu Đất Nung Cổ Điển', N'chau-bonsai', N'Chậu đất nung phong cách cổ điển, màu nâu sẫm, kích thước 25x20cm', 350000, 18, N'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400', 0),
(N'Bonsai Cây Đa', N'bonsai-truyen-thong', N'Cây đa bonsai với rễ bộ đẹp, tượng trưng cho sự trường thọ', 950000, 5, N'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400', 1);

-- Insert Sample Cart and Cart Items
INSERT INTO Cart (account_id) VALUES (1), (3);

INSERT INTO Cart_Items (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 3, 1),
(2, 4, 1);

-- Insert Sample User Favorites
INSERT INTO User_Favorites (account_id, product_id) VALUES
(1, 1),
(1, 4),
(1, 2),
(3, 5),
(3, 6);

-- Insert Sample Orders
INSERT INTO Orders (account_id, total_amount, status, customer_name, customer_phone, customer_address, notes) VALUES
(1, 730000, N'Đã giao', N'Nguyễn Văn A', '0123456789', N'123 Đường ABC, Quận 1, TP.HCM', N'Giao hàng giờ hành chính'),
(1, 1200000, N'Đang giao', N'Nguyễn Văn A', '0123456789', N'123 Đường ABC, Quận 1, TP.HCM', N'Gọi trước khi giao'),
(3, 650000, N'Chờ xử lý', N'Trần Thị B', '0369741852', N'789 Đường DEF, Quận 5, TP.HCM', N'');

-- Insert Sample Order Details
INSERT INTO Order_Details (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 450000),
(1, 3, 1, 280000),
(2, 2, 1, 1200000),
(3, 4, 1, 650000);

-- USEFUL BUSINESS QUERIES

-- 1. Get all products with full details
SELECT 
    p.product_id,
    p.name,
    p.category,
    p.description,
    p.price,
    p.stock_quantity,
    p.image_path,
    p.is_featured,
    p.is_active
FROM Products p
WHERE p.is_active = 1
ORDER BY p.is_featured DESC, p.name;

-- 2. Get user's favorite products
SELECT 
    a.full_name,
    p.name,
    p.price,
    p.image_path
FROM User_Favorites uf
INNER JOIN Accounts a ON uf.account_id = a.account_id
INNER JOIN Products p ON uf.product_id = p.product_id
WHERE a.account_id = 1;

-- 3. Get user's cart with product details
SELECT 
    ci.cart_item_id,
    ci.quantity,
    p.name,
    p.price,
    p.image_path,
    (ci.quantity * p.price) as subtotal
FROM Cart c
INNER JOIN Cart_Items ci ON c.cart_id = ci.cart_id
INNER JOIN Products p ON ci.product_id = p.product_id
WHERE c.account_id = 1;

-- 4. Sales report by month
SELECT 
    YEAR(o.order_date) as Year,
    MONTH(o.order_date) as Month,
    COUNT(o.order_id) as TotalOrders,
    SUM(o.total_amount) as TotalRevenue,
    AVG(o.total_amount) as AverageOrderValue
FROM Orders o
WHERE o.status IN (N'Đã giao')
GROUP BY YEAR(o.order_date), MONTH(o.order_date)
ORDER BY Year DESC, Month DESC;

-- 5. Top selling products
SELECT 
    p.name,
    p.category,
    SUM(od.quantity) as TotalSold,
    SUM(od.quantity * od.price) as TotalRevenue
FROM Order_Details od
INNER JOIN Products p ON od.product_id = p.product_id
INNER JOIN Orders o ON od.order_id = o.order_id
WHERE o.status IN (N'Đã giao')
GROUP BY p.product_id, p.name, p.category
ORDER BY TotalSold DESC;

-- 6. Order status summary
SELECT 
    status,
    COUNT(*) as OrderCount,
    SUM(total_amount) as TotalValue
FROM Orders
GROUP BY status
ORDER BY OrderCount DESC;

-- 7. Low stock alert
SELECT 
    p.name,
    p.category,
    p.stock_quantity,
    p.price
FROM Products p
WHERE p.stock_quantity <= 5 AND p.is_active = 1
ORDER BY p.stock_quantity ASC;

-- 8. Customer order history with details
SELECT 
    o.order_id,
    o.order_date,
    o.status,
    o.total_amount,
    o.customer_name,
    o.customer_phone,
    COUNT(od.order_detail_id) as ItemCount
FROM Orders o
LEFT JOIN Order_Details od ON o.order_id = od.order_id
WHERE o.account_id = 1
GROUP BY o.order_id, o.order_date, o.status, o.total_amount, o.customer_name, o.customer_phone
ORDER BY o.order_date DESC;

-- 9. Products by category with stock status
SELECT 
    p.category,
    COUNT(*) as TotalProducts,
    SUM(CASE WHEN p.stock_quantity > 0 THEN 1 ELSE 0 END) as InStock,
    SUM(CASE WHEN p.stock_quantity = 0 THEN 1 ELSE 0 END) as OutOfStock,
    AVG(p.price) as AveragePrice
FROM Products p
WHERE p.is_active = 1
GROUP BY p.category
ORDER BY TotalProducts DESC;

-- 10. Daily revenue report
SELECT 
    CAST(o.order_date AS DATE) as OrderDate,
    COUNT(o.order_id) as TotalOrders,
    SUM(o.total_amount) as DailyRevenue
FROM Orders o
WHERE o.status IN (N'Đã giao')
    AND o.order_date >= DATEADD(DAY, -30, GETDATE())
GROUP BY CAST(o.order_date AS DATE)
ORDER BY OrderDate DESC;

-- 11. Customer spending analysis
SELECT 
    a.full_name,
    a.email,
    COUNT(o.order_id) as TotalOrders,
    SUM(o.total_amount) as TotalSpent,
    AVG(o.total_amount) as AverageOrderValue,
    MAX(o.order_date) as LastOrderDate
FROM Accounts a
LEFT JOIN Orders o ON a.account_id = o.account_id AND o.status = N'Đã giao'
WHERE a.role = 1 -- customers only
GROUP BY a.account_id, a.full_name, a.email
ORDER BY TotalSpent DESC;

-- 12. Product performance by category
SELECT 
    p.category,
    SUM(od.quantity) as TotalUnitsSold,
    SUM(od.quantity * od.price) as CategoryRevenue,
    COUNT(DISTINCT p.product_id) as UniqueProducts,
    AVG(od.price) as AverageProductPrice
FROM Products p
INNER JOIN Order_Details od ON p.product_id = od.product_id
INNER JOIN Orders o ON od.order_id = o.order_id
WHERE o.status = N'Đã giao'
GROUP BY p.category
ORDER BY CategoryRevenue DESC;
