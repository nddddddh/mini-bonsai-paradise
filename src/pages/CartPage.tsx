
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartPageProps } from "@/types/navigation";

const CartPage = ({ navigate }: CartPageProps) => {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      toast({
        title: "Sản phẩm đã được xóa khỏi giỏ hàng.",
        description: "Số lượng sản phẩm đã được cập nhật.",
      });
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    removeItem(id);
    toast({
      title: "Sản phẩm đã được xóa khỏi giỏ hàng.",
      description: "Sản phẩm đã được loại bỏ khỏi giỏ hàng của bạn.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Giỏ hàng đã được làm trống.",
      description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng.",
    });
  };

  const totalAmount = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar navigate={navigate} />
        
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Giỏ hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Giỏ hàng của bạn đang trống.</p>
              <Button onClick={() => navigate("/products")}>Tiếp tục mua sắm</Button>
            </CardContent>
          </Card>
        </div>
        
        <Footer navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Giỏ hàng của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            {items.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <Badge>{item.category}</Badge>
                    <p className="text-nature-700 font-bold">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      className="w-20 text-center mx-2"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity)) {
                          handleQuantityChange(item.id, newQuantity);
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa
                  </Button>
                </div>
                <Separator className="my-4" />
              </div>
            ))}

            <div className="flex justify-between items-center">
              <Button variant="link" onClick={() => navigate("/products")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
              <div>
                <p className="text-lg font-semibold">
                  Tổng cộng: {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
                <div className="flex justify-end space-x-2 mt-2">
                  <Button variant="outline" onClick={handleClearCart}>
                    Xóa giỏ hàng
                  </Button>
                  <Button onClick={() => navigate("/checkout")}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default CartPage;
