
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lock } from 'lucide-react';
import { PageProps } from '@/types/navigation';

const ResetPassword = ({ navigate }: PageProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    
    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự!");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would reset the password with a backend
    // This is just a simulation
    setTimeout(() => {
      toast.success("Đặt lại mật khẩu thành công!");
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
              <CardTitle className="text-2xl font-bold text-center">Đặt lại mật khẩu</CardTitle>
              <CardDescription className="text-center">
                Tạo mật khẩu mới cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Mật khẩu phải có ít nhất 8 ký tự
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-nature-600 hover:bg-nature-700 mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
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

export default ResetPassword;
