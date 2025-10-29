-- Create sensor readings table
CREATE TABLE public.sensor_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  soil_moisture DECIMAL NOT NULL,
  temperature DECIMAL NOT NULL,
  humidity DECIMAL NOT NULL,
  water_level DECIMAL NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI predictions table
CREATE TABLE public.ai_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  next_watering TIMESTAMP WITH TIME ZONE NOT NULL,
  water_amount TEXT NOT NULL,
  confidence DECIMAL NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system alerts table
CREATE TABLE public.system_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for demonstration purposes)
CREATE POLICY "Allow public read access to sensor readings"
ON public.sensor_readings FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to sensor readings"
ON public.sensor_readings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read access to AI predictions"
ON public.ai_predictions FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to AI predictions"
ON public.ai_predictions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public read access to system alerts"
ON public.system_alerts FOR SELECT
USING (true);

CREATE POLICY "Allow public insert to system alerts"
ON public.system_alerts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public update to system alerts"
ON public.system_alerts FOR UPDATE
USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_sensor_readings_timestamp ON public.sensor_readings(timestamp DESC);
CREATE INDEX idx_ai_predictions_created_at ON public.ai_predictions(created_at DESC);
CREATE INDEX idx_system_alerts_timestamp ON public.system_alerts(timestamp DESC);
CREATE INDEX idx_system_alerts_is_read ON public.system_alerts(is_read);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.sensor_readings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_predictions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_alerts;