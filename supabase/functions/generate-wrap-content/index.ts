
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, creativePrompt } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    // Fetch all users for this project
    const { data: users, error: usersError } = await supabaseClient
      .from('project_users')
      .select('*')
      .eq('project_id', projectId);

    if (usersError) {
      throw new Error(`Failed to fetch users: ${usersError.message}`);
    }

    if (!users || users.length === 0) {
      throw new Error('No users found for this project');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Process each user and generate captions
    const updatedUsers = [];
    
    for (const user of users) {
      const systemPrompt = "You are an AI that creates personalized 'Wrapped' experiences. Your goal is to turn user data into engaging, personalized slide captions that feel like a year-end summary (similar to Spotify Wrapped). Be creative, playful, and use emojis when appropriate.";
      
      const userPrompt = `${creativePrompt}

User Details:
- Name: ${user.first_name} ${user.last_name}
- Email: ${user.email}
- Data: ${JSON.stringify(user.data || {})}

Please generate 5-6 slide captions (1 sentence each) for this user's personalized Wrapped experience. Make each caption engaging and personal based on their data.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const aiResponse = await response.json();
      const generatedContent = aiResponse.choices[0].message.content;
      
      // Parse the generated content into an array of captions
      const captions = generatedContent
        .split('\n')
        .filter(line => line.trim() && !line.includes('Caption'))
        .map(caption => caption.replace(/^\d+\.\s*/, '').trim())
        .filter(caption => caption.length > 0);

      // Update the user record with generated captions
      const { error: updateError } = await supabaseClient
        .from('project_users')
        .update({ wrap_captions: captions })
        .eq('id', user.id);

      if (updateError) {
        console.error(`Failed to update user ${user.id}:`, updateError);
        throw new Error(`Failed to update user ${user.first_name} ${user.last_name}`);
      }

      updatedUsers.push({
        ...user,
        wrap_captions: captions
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      users: updatedUsers,
      message: `Generated captions for ${updatedUsers.length} users`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-wrap-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
