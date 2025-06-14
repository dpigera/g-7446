
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendWrapEmailRequest {
  projectId: string;
  userId: string;
  userEmail: string;
  userName: string;
  projectName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { projectId, userId, userEmail, userName, projectName }: SendWrapEmailRequest = await req.json();

    console.log("Sending wrap email to:", userEmail, "for project:", projectName);

    // Create the wrap URL
    const wrapUrl = `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.vercel.app') || 'https://wrapped-ai.vercel.app'}/wraps/${projectId}/${userId}`;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Wrapped.ai <noreply@resend.dev>",
      to: [userEmail],
      subject: `Your ${projectName} Wrapped is ready! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Your ${projectName} Wrapped is Ready! 🎉</h1>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Hi ${userName},
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Your personalized ${projectName} wrapped slides are now ready to view! Click the button below to see your amazing year in review.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${wrapUrl}" 
               style="background: linear-gradient(135deg, #f59e0b, #eab308); 
                      color: black; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold; 
                      font-size: 18px;
                      display: inline-block;">
              View My Wrapped 🎁
            </a>
          </div>
          
          <p style="font-size: 14px; color: #777; line-height: 1.6;">
            Or copy and paste this link in your browser:<br>
            <a href="${wrapUrl}" style="color: #2563eb; word-break: break-all;">${wrapUrl}</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            This email was sent by Wrapped.ai<br>
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the email send in the database
    const { error: logError } = await supabaseClient
      .from('email_logs')
      .insert({
        project_id: projectId,
        user_id: userId,
        user_email: userEmail,
        status: 'sent'
      });

    if (logError) {
      console.error("Error logging email send:", logError);
    }

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-wrap-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
