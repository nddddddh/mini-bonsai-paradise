
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Eye, EyeOff, Mail, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useOTP } from '@/hooks/useOTP';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const { sendOTP, verifyOTP, loading: otpHookLoading } = useOTP();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Lỗi",
        description: "Email không hợp lệ",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Check if username or email already exists
      const { data: existingUser } = await supabase
        .from('accounts')
        .select('username, email')
        .or(`username.eq.${formData.username},email.eq.${formData.email}`)
        .single();

      if (existingUser) {
        toast({
          title: "Lỗi",
          description: "Tên đăng nhập hoặc email đã tồn tại",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Send OTP
      const success = await sendOTP(formData.email, 'register');
      if (success) {
        setStep('otp');
        toast({
          title: "Thành công",
          description: "Mã OTP đã được gửi đến email của bạn",
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ mã OTP",
        variant: "destructive",
      });
      return;
    }

    setOtpLoading(true);
    try {
      // Verify OTP first
      const otpValid = await verifyOTP(formData.email, otpCode, 'register');
      
      if (otpValid) {
        // Create the account after OTP verification
        const { data, error } = await supabase
          .from('accounts')
          .insert({
            username: formData.username,
            email: formData.email,
            password_hash: formData.password, // In production, hash this password
            full_name: formData.fullName,
            phone: formData.phone || null,
            address: formData.address || null,
            role: 1 // Customer role
          })
          .select()
          .single();

        if (error) {
          console.error('Registration error:', error);
          toast({
            title: "Lỗi đăng ký",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Đăng ký thành công",
          description: "Tài khoản đã được tạo thành công!",
        });

        navigate('/login');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra trong quá trình xác thực OTP",
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    const success = await sendOTP(formData.email, 'register');
    if (success) {
      toast({
        title: "Thành công",
        description: "Mã OTP mới đã được gửi đến email của bạn",
      });
    }
  };

  const handleBackToForm = () => {
    setStep('form');
    setOtpCode('');
  };

  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-nature-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-nature-50 p-3 rounded-full mb-4">
              <Mail className="h-8 w-8 text-nature-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Xác thực email</CardTitle>
            <CardDescription>
              Chúng tôi đã gửi mã OTP đến {formData.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-center block mb-3">
                  Nhập mã OTP gồm 6 chữ số
                </Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={(value) => setOtpCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-nature-600 hover:bg-nature-700"
                  disabled={otpLoading || otpCode.length !== 6}
                >
                  {otpLoading ? "Đang xác thực..." : "Xác thực và hoàn tất đăng ký"}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleBackToForm}
                  disabled={otpLoading}
                >
                  Quay lại sửa thông tin
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                Không nhận được mã?{" "}
                <button 
                  onClick={handleResendOTP}
                  className="font-semibold text-nature-600 hover:text-nature-700"
                  disabled={otpHookLoading}
                >
                  {otpHookLoading ? "Đang gửi..." : "Gửi lại mã"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nature-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Đăng ký tài khoản</CardTitle>
          <CardDescription>Tạo tài khoản mới để bắt đầu mua sắm</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập *</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên *</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu *</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-nature-600 hover:bg-nature-700"
              disabled={loading || otpHookLoading}
            >
              {loading || otpHookLoading ? 'Đang gửi OTP...' : 'Gửi mã OTP'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-nature-600 hover:underline font-medium">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
