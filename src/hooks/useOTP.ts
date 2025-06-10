
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface OTPResponse {
  message: string;
  email: string;
  debug_otp?: string; // For testing purposes
}

export interface OTPError {
  error: string;
}

export const useOTP = () => {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email: string, action: string = 'register'): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Sending OTP to:', email);
      
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email, action }
      });

      if (error) {
        console.error('Error sending OTP:', error);
        toast({
          title: "Lỗi",
          description: "Không thể gửi mã OTP. Vui lòng thử lại.",
          variant: "destructive",
        });
        return false;
      }

      console.log('OTP sent successfully:', data);
      
      // Show success message
      if (data?.debug_otp) {
        toast({
          title: "Thành công",
          description: `Mã OTP đã được gửi đến ${email}. (Debug: ${data.debug_otp})`,
        });
      } else {
        toast({
          title: "Thành công",
          description: `Mã OTP đã được gửi đến email ${email}. Vui lòng kiểm tra hộp thư của bạn.`,
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi OTP",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string, action: string = 'register'): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Verifying OTP for:', email, 'OTP:', otp);
      
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, otp, action }
      });

      if (error) {
        console.error('Error verifying OTP:', error);
        toast({
          title: "Lỗi",
          description: "Mã OTP không hợp lệ hoặc đã hết hạn",
          variant: "destructive",
        });
        return false;
      }

      console.log('OTP verified successfully:', data);
      
      toast({
        title: "Thành công",
        description: "Xác thực OTP thành công!",
      });
      return true;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xác thực OTP",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendOTP,
    verifyOTP,
    loading
  };
};
