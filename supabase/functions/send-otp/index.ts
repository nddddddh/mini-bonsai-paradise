
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { Resend } from 'npm:resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Function to send OTP via email using Resend
async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    
    const { data, error } = await resend.emails.send({
      from: 'Xác thực OTP <onboarding@resend.dev>',
      to: [email],
      subject: 'Mã xác thực đăng ký tài khoản',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Xác nhận đăng ký</h2>
          <p style="color: #666; font-size: 16px;">Xin chào,</p>
          <p style="color: #666; font-size: 16px;">Mã xác thực của bạn là:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">Mã này có hiệu lực trong 5 phút.</p>
          <p style="color: #666; font-size: 14px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">Email này được gửi tự động, vui lòng không trả lời.</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return false
    }

    console.log('Email sent successfully:', data)
    return true
  } catch (error) {
    console.error('Error in sendOTPEmail:', error)
    return false
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, action } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`Sending OTP to: ${email}`)

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now

    // Delete any existing OTP for this email and action
    await supabaseClient
      .from('otp_verifications')
      .delete()
      .eq('email', email)
      .eq('action', action || 'register')

    // Store OTP in database
    const { error: insertError } = await supabaseClient
      .from('otp_verifications')
      .insert({
        email,
        otp,
        action: action || 'register',
        expires_at: expiresAt.toISOString(),
        used: false
      })

    if (insertError) {
      console.error('Database error:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp)

    if (!emailSent) {
      return new Response(
        JSON.stringify({ error: 'Failed to send OTP email' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log(`OTP sent successfully to ${email}`)

    return new Response(
      JSON.stringify({ 
        message: 'OTP sent successfully',
        email: email,
        // Include OTP in response for testing in development only
        debug_otp: Deno.env.get('DENO_DEPLOYMENT_ID') ? undefined : otp
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
