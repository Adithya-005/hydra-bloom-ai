import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface SensorReading {
  soil_moisture: number;
  temperature: number;
  humidity: number;
  water_level: number;
}

export const useSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorReading>({
    soil_moisture: 0,
    temperature: 0,
    humidity: 0,
    water_level: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate sensor readings and store in database
  const generateAndStoreSensorData = async () => {
    const newData = {
      soil_moisture: Math.floor(Math.random() * 100),
      temperature: 20 + Math.random() * 15,
      humidity: 40 + Math.random() * 40,
      water_level: 30 + Math.random() * 70,
    };

    try {
      const { data, error } = await supabase.functions.invoke('store-sensor-data', {
        body: newData
      });

      if (error) throw error;
      
      setSensorData(newData);
      
      // Generate AI prediction based on new sensor data
      await supabase.functions.invoke('generate-ai-prediction', {
        body: newData
      });
    } catch (error) {
      console.error('Error storing sensor data:', error);
      toast({
        title: "Error",
        description: "Failed to store sensor data",
        variant: "destructive",
      });
    }
  };

  // Subscribe to realtime sensor updates
  useEffect(() => {
    const channel = supabase
      .channel('sensor-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sensor_readings'
        },
        (payload) => {
          const reading = payload.new as any;
          setSensorData({
            soil_moisture: parseFloat(reading.soil_moisture),
            temperature: parseFloat(reading.temperature),
            humidity: parseFloat(reading.humidity),
            water_level: parseFloat(reading.water_level),
          });
        }
      )
      .subscribe();

    // Initial data load
    generateAndStoreSensorData().then(() => setIsLoading(false));

    // Update sensor data every 5 seconds
    const interval = setInterval(generateAndStoreSensorData, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  return { sensorData, isLoading };
};
