
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export interface OTPResponse {
  message: string;
  email: string;
  debug_otp?: string; // For testing purposes
}

export interface OTPError {
  error: string;
}

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Function to send OTP via email using EmailJS from frontend
async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    console.log('Sending OTP via EmailJS:', email, otp);
    
    // Initialize EmailJS if not already done
    emailjs.init('qjPi8jjZLDyY03y9S');
    
    const templateParams = {
      to_email: email,
      to_name: email.split('@')[0], // Extract name from email
      otp_code: otp,
      message: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`,
      subject: 'Mã xác thực đăng ký tài khoản Green Garden'
    };

    const result = await emailjs.send(
      'service_erfd1nj',     // Service ID
      'template_4eol7kv',    // Template ID
      templateParams
    );

    console.log('EmailJS result:', result);
    return result.status === 200;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
}

export const useOTP = () => {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email: string, action: string = 'register'): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Generating OTP for:', email);
      
      // Generate OTP locally
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      // Delete any existing OTP for this email and action
      await supabase
        .from('otp_verifications')
        .delete()
        .eq('email', email)
        .eq('action', action);

      // Store OTP in database
      const { error: insertError } = await supabase
        .from('otp_verifications')
        .insert({
          email,
          otp,
          action: action,
          expires_at: expiresAt.toISOString(),
          used: false
        });

      if (insertError) {
        console.error('Database error:', insertError);
        toast({
          title: "Lỗi",
          description: "Không thể tạo mã OTP. Vui lòng thử lại.",
          variant: "destructive",
        });
        return false;
      }

      // Send OTP via EmailJS
      const emailSent = await sendOTPEmail(email, otp);

      if (!emailSent) {
        console.log('Email sending failed');
        toast({
          title: "Lỗi",
          description: "Không thể gửi email OTP. Vui lòng kiểm tra lại email hoặc thử lại sau.",
          variant: "destructive",
        });
        return false;
      }

      console.log('OTP sent successfully to:', email);
      
      toast({
        title: "Thành công",
        description: `Mã OTP đã được gửi đến email ${email}. Vui lòng kiểm tra hộp thư của bạn.`,
      });
      
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
