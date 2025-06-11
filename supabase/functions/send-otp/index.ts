
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Function to send OTP via email using EmailJS
async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // Using your EmailJS configuration
    const emailData = {
      service_id: 'service_erfd1nj',
      template_id: 'template_4eol7kv',
      user_id: 'qjPi8jjZLDyY03y9S',
      template_params: {
        to_email: email,
        otp_code: otp,
        message: `Mã OTP của bạn là: ${otp}`,
        subject: 'Mã xác thực đăng ký tài khoản'
      }
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    })

    if (response.ok) {
      console.log('Email sent successfully via EmailJS')
      return true
    } else {
      console.log('EmailJS failed with status:', response.status)
      const errorText = await response.text()
      console.log('Error response:', errorText)
      return false
    }
    
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
      console.log('Email sending failed')
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
        email: email
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
