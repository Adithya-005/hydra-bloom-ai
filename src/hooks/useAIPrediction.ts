import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AIPrediction {
  next_watering: string;
  water_amount: string;
  confidence: number;
  reason: string;
}

export const useAIPrediction = () => {
  const [prediction, setPrediction] = useState<AIPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch latest prediction
    const fetchLatestPrediction = async () => {
      const { data, error } = await supabase
        .from('ai_predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching prediction:', error);
        setIsLoading(false);
        return;
      }

      if (data) {
        setPrediction({
          next_watering: data.next_watering,
          water_amount: data.water_amount,
          confidence: typeof data.confidence === 'string' ? parseFloat(data.confidence) : data.confidence,
          reason: data.reason,
        });
      }
      setIsLoading(false);
    };

    fetchLatestPrediction();

    // Subscribe to realtime prediction updates
    const channel = supabase
      .channel('prediction-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ai_predictions'
        },
        (payload) => {
          const pred = payload.new as any;
          setPrediction({
            next_watering: pred.next_watering,
            water_amount: pred.water_amount,
            confidence: typeof pred.confidence === 'string' ? parseFloat(pred.confidence) : pred.confidence,
            reason: pred.reason,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { prediction, isLoading };
};
