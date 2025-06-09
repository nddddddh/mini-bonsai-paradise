import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';
import { PageProps } from '@/types/navigation';

const ForgotPassword = ({ navigate }: PageProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Vui lòng nhập email!");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would send a reset password link to the email
    // This is just a simulation
    setTimeout(() => {
      toast.success("Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn!");
      navigate('login');
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
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-12 h-12 text-nature-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Quên mật khẩu</CardTitle>
              <CardDescription className="text-center">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="youremail@example.com"
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
                  {isLoading ? "Đang xử lý..." : "Gửi liên kết đặt lại"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
