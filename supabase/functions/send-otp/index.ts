
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to generate a 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Simple function to simulate sending email (for testing)
async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // Log the OTP for testing purposes
    console.log(`=== OTP NOTIFICATION ===`)
    console.log(`Email: ${email}`)
    console.log(`OTP Code: ${otp}`)
    console.log(`Message: Mã OTP của bạn là ${otp}. Có hiệu lực trong 5 phút.`)
    console.log(`========================`)
    
    // In a real application, you would integrate with an email service here
    // For now, we'll just return true to simulate successful sending
    return true
  } catch (error) {
    console.error('Error in sendOTPEmail:', error)
    return true // Return true to not block the flow during testing
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

    // Send OTP via email (simulated for now)
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
        // Include OTP in response for testing (remove in production)
        debug_otp: otp
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
