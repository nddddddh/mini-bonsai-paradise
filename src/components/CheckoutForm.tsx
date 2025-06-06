
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onBack }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    phone: state.user?.phone || '',
    address: state.user?.address || '',
    notes: '',
  });

  const total = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 1000000 ? 0 : 50000;
  const finalTotal = total + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Thông tin không đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin giao hàng",
        variant: "destructive",
      });
      return;
    }

    // Create order (in real app, this would be sent to backend)
    const orderId = `ORDER_${Date.now()}`;
    
    toast({
      title: "Đặt hàng thành công!",
      description: `Mã đơn hàng: ${orderId}. Chúng tôi sẽ liên hệ với bạn sớm nhất.`,
    });

    // Clear cart
    dispatch({ type: 'CLEAR_CART' });
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">Thông tin giao hàng</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Họ và tên *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ giao hàng *</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Nhập địa chỉ chi tiết"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Ghi chú thêm về đơn hàng"
            rows={2}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h3 className="font-semibold">Tóm tắt đơn hàng</h3>
          {state.cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>{item.product.name} x{item.quantity}</span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Tạm tính:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Phí vận chuyển:</span>
              <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold text-green-600">
              <span>Tổng cộng:</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
          <div className="flex items-center gap-2">
            <input type="radio" id="cod" name="payment" defaultChecked />
            <label htmlFor="cod" className="text-sm">
              Thanh toán khi nhận hàng (COD)
            </label>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng
          </p>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Đặt hàng ngay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
