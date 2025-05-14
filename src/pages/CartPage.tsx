
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ShoppingBag, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, cartTotal } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shippingFee = cartTotal >= 500000 || cartTotal === 0 ? 0 : 50000;
  const orderTotal = cartTotal + shippingFee;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">Giỏ hàng</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
        
        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Item Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-gray-500">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-center">Tổng</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        <Link to={`/products/${item.id}`}>
                          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-grow">
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-medium hover:text-nature-600 transition-colors">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center text-gray-500 text-sm mt-2 hover:text-red-500 md:hidden"
                          >
                            <Trash className="w-3.5 h-3.5 mr-1" />
                            Xóa
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-sm text-gray-500">Giá:</span>
                        <div className="text-gray-900">
                          {item.salePrice ? (
                            <>
                              <span className="font-medium">{item.salePrice.toLocaleString('vi-VN')}₫</span>
                              <span className="text-sm text-gray-400 line-through ml-2">{item.price.toLocaleString('vi-VN')}₫</span>
                            </>
                          ) : (
                            <span className="font-medium">{item.price.toLocaleString('vi-VN')}₫</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-sm text-gray-500">Số lượng:</span>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="border border-gray-300 rounded-l p-1.5 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="border-t border-b border-gray-300 py-1.5 px-3 text-center w-10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="border border-gray-300 rounded-r p-1.5 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="md:hidden text-sm text-gray-500">Tổng:</span>
                        <div className="text-gray-900 font-medium">
                          {((item.salePrice || item.price) * item.quantity).toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                      
                      {/* Remove - Desktop only */}
                      <div className="hidden md:flex md:justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="border-t pt-6 flex flex-wrap gap-4 justify-between items-center">
                  <Link to="/products">
                    <Button variant="outline" className="flex items-center gap-2 border-nature-500 text-nature-700 hover:bg-nature-50">
                      <ChevronLeft className="w-4 h-4" />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={clearCart} 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Xóa giỏ hàng
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-medium">{cartTotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="font-medium">
                      {shippingFee > 0 
                        ? `${shippingFee.toLocaleString('vi-VN')}₫` 
                        : 'Miễn phí'}
                    </span>
                  </div>
                  
                  {cartTotal < 500000 && cartTotal > 0 && (
                    <div className="text-xs text-nature-600 pt-1">
                      Mua thêm {(500000 - cartTotal).toLocaleString('vi-VN')}₫ để được miễn phí vận chuyển
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Tổng:</span>
                      <span>{orderTotal.toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/checkout">
                    <Button className="w-full bg-nature-600 hover:bg-nature-700 text-lg py-6">
                      Thanh toán
                    </Button>
                  </Link>
                  
                  <div className="mt-4 text-xs text-center text-gray-500">
                    Chúng tôi chấp nhận thanh toán qua Momo, ZaloPay, Thẻ tín dụng và COD
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 max-w-lg mx-auto">
            <div className="mb-6 text-gray-400">
              <ShoppingBag className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">
              Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.
            </p>
            <Link to="/products">
              <Button className="bg-nature-600 hover:bg-nature-700 px-8">
                Bắt đầu mua sắm
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
