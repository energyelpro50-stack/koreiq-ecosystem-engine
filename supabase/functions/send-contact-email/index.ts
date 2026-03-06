import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, organization, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("contact_submissions").insert({
      name,
      email,
      organization: organization || null,
      message,
    });

    // Send email via Resend (best-effort — submission is already saved)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (resendKey) {
      // 1. Send notification to admin
      try {
        const adminRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KoreIQ Contact Form <contact@koreiq.com>",
            to: ["connect@koreiq.com"],
            reply_to: email,
            subject: `New Contact: ${name} — ${organization || "No Organization"}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a73e8;">New Contact Form Submission</h2>
                <hr style="border: 1px solid #e0e0e0;" />
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Organization:</strong> ${organization || "Not provided"}</p>
                <hr style="border: 1px solid #e0e0e0;" />
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
                <hr style="border: 1px solid #e0e0e0;" />
                <p style="color: #888; font-size: 12px;">Sent from the KoreIQ website contact form.</p>
              </div>
            `,
          }),
        });
        if (adminRes.ok) emailSent = true;
        else console.error("Admin email error (non-fatal):", await adminRes.text());
      } catch (e) {
        console.error("Admin email failed (non-fatal):", e);
      }

      // 2. Send auto-reply to the user
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "KoreIQ <contact@koreiq.com>",
            to: [email],
            subject: "We received your message — KoreIQ",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a73e8;">Thank you for reaching out, ${name}!</h2>
                <p>We've received your message and our team will get back to you shortly.</p>
                <hr style="border: 1px solid #e0e0e0;" />
                <p style="color: #888; font-size: 12px;">This is an automated reply from KoreIQ Technologies Pvt. Ltd.</p>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error("Auto-reply failed (non-fatal):", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, emailSent }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
