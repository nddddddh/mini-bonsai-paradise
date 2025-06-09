import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  navigate: (path: string) => void;
}

const ForgotPassword = ({ navigate }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would trigger a password reset process
    // This is just a simulation
    setTimeout(() => {
      toast.success("Link đặt lại mật khẩu đã được gửi đến email của bạn!");
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              {!isSubmitted && (
                <>
                  <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
                  <CardDescription className="text-center">
                    Nhập email của bạn để nhận link đặt lại mật khẩu
                  </CardDescription>
                </>
              )}
              {isSubmitted && (
                <>
                  <div className="mx-auto bg-green-50 p-3 rounded-full">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center mt-4">Kiểm tra email của bạn</CardTitle>
                  <CardDescription className="text-center">
                    Chúng tôi đã gửi một link đặt lại mật khẩu đến {email}
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-nature-600 hover:bg-nature-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Vui lòng kiểm tra hộp thư đến của bạn và nhấp vào link trong email để đặt lại mật khẩu.
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    Không nhận được email? Kiểm tra thư mục spam hoặc thử lại.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Thử lại với email khác
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center text-sm text-nature-600 hover:text-nature-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang đăng nhập
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer navigate={navigate} />
    </>
  );
};

export default ForgotPassword;
