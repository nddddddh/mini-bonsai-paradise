
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    agreeToTerms: false
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    agreeToTerms: ""
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const shippingFee = cartTotal >= 500000 ? 0 : 50000;
  const orderTotal = cartTotal + shippingFee;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreeToTerms: checked
    });
    
    if (checked) {
      setFormErrors({
        ...formErrors,
        agreeToTerms: ""
      });
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên";
      valid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = "Vui lòng nhập email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
      valid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
      valid = false;
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Số điện thoại không hợp lệ";
      valid = false;
    }
    
    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ";
      valid = false;
    }
    
    if (!formData.city.trim()) {
      errors.city = "Vui lòng nhập thành phố";
      valid = false;
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "Vui lòng đồng ý với điều khoản dịch vụ";
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process order
      toast.success("Đặt hàng thành công!", {
        description: "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.",
      });
      
      // Clear cart and redirect to success page
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-nature-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link to="/cart" className="hover:text-nature-600">Giỏ hàng</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">Thanh toán</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="fullName">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className={formErrors.fullName ? "border-red-500" : ""}
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-500">{formErrors.fullName}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@gmail.com"
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <Label htmlFor="phone">
                      Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912 345 678"
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="address">
                    Địa chỉ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường, phường/xã"
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && (
                    <p className="text-sm text-red-500">{formErrors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="city">
                    Thành phố <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="TP. Hồ Chí Minh"
                    className={formErrors.city ? "border-red-500" : ""}
                  />
                  {formErrors.city && (
                    <p className="text-sm text-red-500">{formErrors.city}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng hoặc địa điểm giao hàng chi tiết"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mt-10 mb-6">Phương thức thanh toán</h2>
              
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="cursor-pointer flex-grow">Thanh toán khi nhận hàng (COD)</Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="cursor-pointer flex-grow">Chuyển khoản ngân hàng</Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-md p-4">
                  <RadioGroupItem value="momo" id="momo" />
                  <Label htmlFor="momo" className="cursor-pointer flex-grow">Thanh toán qua Momo</Label>
                </div>
              </RadioGroup>
              
              <div className="mt-8 flex items-start space-x-3">
                <Checkbox 
                  id="agreeToTerms" 
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                  className={formErrors.agreeToTerms ? "text-red-500 border-red-500" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreeToTerms"
                    className={`text-sm font-normal ${formErrors.agreeToTerms ? "text-red-500" : ""}`}
                  >
                    Tôi đã đọc và đồng ý với <Link to="/terms" className="text-nature-600">điều khoản dịch vụ</Link> của MiniPlants
                  </Label>
                  {formErrors.agreeToTerms && (
                    <p className="text-sm text-red-500">{formErrors.agreeToTerms}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/cart">
                  <Button type="button" variant="outline" className="flex items-center gap-2 border-nature-500 text-nature-700 hover:bg-nature-50">
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại giỏ hàng
                  </Button>
                </Link>
                <Button type="submit" className="bg-nature-600 hover:bg-nature-700 text-white ml-auto">
                  Đặt hàng
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-sm">{item.name}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>SL: {item.quantity}</span>
                        <span>{((item.salePrice || item.price) * item.quantity).toLocaleString('vi-VN')}₫</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-3 text-gray-700">
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
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng:</span>
                    <span>{orderTotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Checkout;
