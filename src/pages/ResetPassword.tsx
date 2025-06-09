import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ResetPasswordProps } from "@/types/navigation";

const ResetPassword = ({ navigate }: ResetPasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Vui lòng nhập lại mật khẩu",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Extract token from URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (!token) {
        throw new Error("Không tìm thấy token");
      }

      await resetPassword(token, password);
      setSuccess(true);
      toast({
        title: "Đặt lại mật khẩu thành công",
        description: "Bạn có thể đăng nhập bằng mật khẩu mới",
      });
    } catch (error: any) {
      console.error("Đặt lại mật khẩu thất bại:", error.message);
      toast({
        title: "Đặt lại mật khẩu thất bại",
        description: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navigate={navigate} />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Đặt lại mật khẩu</CardTitle>
            <CardDescription>Nhập mật khẩu mới của bạn</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {success ? (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Đặt lại mật khẩu thành công!
                </p>
                <p className="text-gray-600 mb-4">
                  Bạn có thể đăng nhập bằng mật khẩu mới của mình.
                </p>
                <Button onClick={() => navigate('/login')}>Đăng nhập</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="password">Mật khẩu mới</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2 mt-4">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle confirm password visibility</span>
                    </Button>
                  </div>
                </div>
                <Button disabled={loading} className="w-full mt-6">
                  {loading ? (
                    <>
                      Đang đặt lại...
                      <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 4V2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm5.37 2.93a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 0 1 1.41-1.41l1.41 1.41 1.41-1.41a1 1 0 0 1 1.41 0zM20 12a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zm-2.93 5.37a1 1 0 0 1 1.41 0l1.41-1.41a1 1 0 0 1 0-1.41l-1.41-1.41a1 1 0 0 1-1.41 1.41l1.41 1.41-1.41 1.41a1 1 0 0 1 0 0zM12 20a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2zm-5.37-2.93a1 1 0 0 1-1.41 0l-1.41 1.41a1 1 0 0 1 0 1.41l1.41 1.41a1 1 0 0 1 1.41-1.41l-1.41-1.41 1.41-1.41a1 1 0 0 1 0 0zM4 12a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1zm2.93-5.37a1 1 0 0 1-1.41 0L5.59 5.59a1 1 0 0 1 0-1.41L6.93 2.77a1 1 0 0 1 1.41 1.41L5.59 4.18l1.41 1.41a1 1 0 0 1 0 0z"/>
                      </svg>
                    </>
                  ) : (
                    "Đặt lại mật khẩu"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default ResetPassword;
