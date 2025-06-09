
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageProps } from '@/types/navigation';

const LoginAdmin = ({ navigate }: PageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAdmin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        // Check if user is admin after login
        setTimeout(() => {
          if (isAdmin()) {
            toast.success("Đăng nhập admin thành công!");
            navigate('admin-dashboard');
          } else {
            toast.error("Tài khoản không có quyền admin!");
          }
        }, 100);
      } else {
        toast.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng nhập!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar navigate={navigate} />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-nature-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Đăng nhập Admin</CardTitle>
              <CardDescription className="text-center">
                Dành cho quản trị viên hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
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
                </div>
                <Button
                  type="submit"
                  className="w-full bg-nature-600 hover:bg-nature-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập Admin"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <div className="text-sm text-gray-600">
                Chỉ dành cho quản trị viên có thẩm quyền
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginAdmin;
