import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? ''
    );

    const { action, type, title, message, alert_id } = await req.json();

    console.log('Managing alert, action:', action);

    if (action === 'create') {
      const { data, error } = await supabase
        .from('system_alerts')
        .insert({
          type,
          title,
          message,
          timestamp: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      console.log('Alert created:', data);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (action === 'mark_read') {
      const { data, error } = await supabase
        .from('system_alerts')
        .update({ is_read: true })
        .eq('id', alert_id)
        .select()
        .single();

      if (error) throw error;
      
      console.log('Alert marked as read:', data);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (action === 'get_all') {
      const { data, error } = await supabase
        .from('system_alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      console.log(`Fetched ${data?.length || 0} alerts`);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Error in manage-alerts function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
