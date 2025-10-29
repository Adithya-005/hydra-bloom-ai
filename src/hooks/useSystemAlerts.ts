import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SystemAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  is_read: boolean;
}

export const useSystemAlerts = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch alerts
    const fetchAlerts = async () => {
      const { data, error } = await supabase.functions.invoke('manage-alerts', {
        body: { action: 'get_all' }
      });

      if (error) {
        console.error('Error fetching alerts:', error);
        setIsLoading(false);
        return;
      }

      if (data?.data) {
        setAlerts(data.data);
      }
      setIsLoading(false);
    };

    fetchAlerts();

    // Subscribe to realtime alert updates
    const channel = supabase
      .channel('alert-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_alerts'
        },
        () => {
          fetchAlerts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const markAsRead = async (alertId: string) => {
    await supabase.functions.invoke('manage-alerts', {
      body: { action: 'mark_read', alert_id: alertId }
    });
  };

  return { alerts, isLoading, markAsRead };
};
