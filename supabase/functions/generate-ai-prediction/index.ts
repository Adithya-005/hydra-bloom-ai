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

    const { soil_moisture, temperature, humidity, water_level } = await req.json();

    console.log('Generating AI prediction for sensor data:', { soil_moisture, temperature, humidity, water_level });

    // Call Lovable AI for prediction
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an expert agricultural AI assistant specializing in smart irrigation. Analyze sensor data and provide watering recommendations. Always respond with valid JSON in this exact format: {"hours_until_watering": <number>, "water_amount": "<amount in liters>", "confidence": <number 0-100>, "reason": "<brief explanation>"}'
          },
          {
            role: 'user',
            content: `Analyze this plant sensor data and recommend when to water next:
- Soil Moisture: ${soil_moisture}%
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Water Tank Level: ${water_level}%

Provide your recommendation as JSON.`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI response:', aiContent);

    // Parse AI response
    const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response as JSON');
    }
    
    const prediction = JSON.parse(jsonMatch[0]);

    // Calculate next watering time
    const nextWatering = new Date();
    nextWatering.setHours(nextWatering.getHours() + prediction.hours_until_watering);

    // Store prediction in database
    const { data, error } = await supabase
      .from('ai_predictions')
      .insert({
        next_watering: nextWatering.toISOString(),
        water_amount: prediction.water_amount,
        confidence: prediction.confidence,
        reason: prediction.reason
      })
      .select()
      .single();

    if (error) {
      console.error('Error storing AI prediction:', error);
      throw error;
    }

    console.log('AI prediction stored successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-ai-prediction function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
