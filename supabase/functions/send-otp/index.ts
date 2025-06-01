
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Function to send email via a simple email service (using fetch)
async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // Using a simple email service - you would replace this with your preferred email service
    // For now, we'll just log the OTP (in production, use SendGrid, AWS SES, etc.)
    console.log(`Sending OTP ${otp} to ${email}`)
    
    // Here you would integrate with your email service
    // Example with a generic email API:
    /*
    const response = await fetch('YOUR_EMAIL_SERVICE_API', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Mã xác thực đăng ký tài khoản',
        html: `
          <h2>Xác thực tài khoản của bạn</h2>
          <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
          <p>Mã này có hiệu lực trong 5 phút.</p>
        `
      })
    })
    return response.ok
    */
    
    // For demo purposes, always return true
    return true
  } catch (error) {
    console.error('Error sending email:', error)
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

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now

    // Store OTP in database (you'll need to create this table)
    const { error: insertError } = await supabaseClient
      .from('otp_verifications')
      .insert({
        email,
        otp,
        action,
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
