
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
    
    let interval: number | undefined;
    if (resendCountdown > 0) {
      interval = window.setInterval(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [email, navigate, resendCountdown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      toast.error("Vui lòng nhập đầy đủ mã xác nhận!");
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would verify with a backend
    // This is just a simulation
    setTimeout(() => {
      toast.success("Xác thực email thành công!");
      navigate('/login');
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setResendCountdown(60);
    toast.success("Đã gửi lại mã xác nhận vào email của bạn!");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <div className="mx-auto bg-nature-50 p-3 rounded-full">
                <Mail className="h-8 w-8 text-nature-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-center mt-4">Xác nhận email</CardTitle>
              <CardDescription className="text-center">
                Chúng tôi đã gửi một mã xác nhận đến {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-center block mb-3">
                    Nhập mã xác nhận gồm 6 chữ số
                  </label>
                  <div className="flex justify-between gap-2">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500"
                        required
                      />
                    ))}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-nature-600 hover:bg-nature-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xác nhận..." : "Xác nhận"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <div className="text-sm text-gray-600">
                Không nhận được mã?{" "}
                {resendCountdown > 0 ? (
                  <span className="text-gray-500">Gửi lại sau {resendCountdown}s</span>
                ) : (
                  <button 
                    onClick={handleResend}
                    className="font-semibold text-nature-600 hover:text-nature-700"
                  >
                    Gửi lại mã
                  </button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyEmail;
