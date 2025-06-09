import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VerifyEmailProps } from "@/types/navigation";

const VerifyEmail = ({ navigate }: VerifyEmailProps) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { verifyEmail } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Extract email and token from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    const tokenParam = params.get("token");

    if (emailParam) setEmail(emailParam);
    if (tokenParam) setToken(tokenParam);
  }, []);

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      if (!email || !token) {
        toast({
          title: "Lỗi",
          description: "Email hoặc token không hợp lệ.",
          variant: "destructive",
        });
        return;
      }

      const success = await verifyEmail(email, token);

      if (success) {
        setIsVerified(true);
        toast({
          title: "Thành công",
          description: "Email của bạn đã được xác minh thành công!",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Xác minh email không thành công. Token có thể không hợp lệ hoặc đã hết hạn.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast({
        title: "Lỗi",
        description: "Đã xảy ra lỗi khi xác minh email của bạn.",
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
            <CardTitle className="text-2xl">Xác minh Email</CardTitle>
            <CardDescription>
              Nhập email và token để xác minh tài khoản của bạn.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                disabled={!!email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="token">Token</Label>
              <Input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Nhập token xác minh"
                disabled={!!token}
              />
            </div>
            <Button onClick={handleVerifyEmail} disabled={loading} className="bg-nature-600 hover:bg-nature-700">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xác minh...
                </>
              ) : (
                "Xác minh Email"
              )}
            </Button>
            <Separator />
            <div>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại đăng nhập
              </Button>
            </div>
          </CardContent>
        </Card>
        {isVerified && (
          <div className="text-center mt-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-semibold text-gray-800">
              Email của bạn đã được xác minh thành công!
            </p>
            <p className="text-gray-600">
              Bạn có thể đăng nhập vào tài khoản của mình ngay bây giờ.
            </p>
          </div>
        )}
      </div>
      
      <Footer navigate={navigate} />
    </div>
  );
};

export default VerifyEmail;
