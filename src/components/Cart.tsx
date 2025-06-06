
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';
import CheckoutForm from './CheckoutForm';

const Cart = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      return;
    }
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast({
      title: "Đã xóa khỏi giỏ hàng",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng",
    });
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1000000 ? 0 : 50000; // Free shipping over 1M VND
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (showCheckout) {
    return <CheckoutForm onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Giỏ hàng ({state.cart.length} sản phẩm)</SheetTitle>
      </SheetHeader>

      {state.cart.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Giỏ hàng trống</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 mt-6">
            {state.cart.map((item) => (
              <div key={item.product.id} className="flex gap-3 p-3 border rounded-lg">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                  <p className="text-green-600 font-semibold">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-green-600">{formatPrice(total)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => setShowCheckout(true)}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
