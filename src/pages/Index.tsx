import { useEffect, useState } from "react";
import { SensorCard } from "@/components/SensorCard";
import { AIPrediction } from "@/components/AIPrediction";
import { ControlPanel } from "@/components/ControlPanel";
import { WaterUsageChart } from "@/components/WaterUsageChart";
import { SystemStatus } from "@/components/SystemStatus";
import { Droplets, Thermometer, Cloud, Gauge } from "lucide-react";

const Index = () => {
  const [moisture, setMoisture] = useState(65);
  const [temperature, setTemperature] = useState(28);
  const [humidity, setHumidity] = useState(72);
  const [waterLevel, setWaterLevel] = useState(85);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMoisture((prev) => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setTemperature((prev) => Math.max(15, Math.min(45, prev + (Math.random() - 0.5) * 0.5)));
      setHumidity((prev) => Math.max(30, Math.min(100, prev + (Math.random() - 0.5) * 1)));
      setWaterLevel((prev) => Math.max(0, Math.min(100, prev - Math.random() * 0.1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSensorStatus = (value: number, optimal: [number, number]): "optimal" | "warning" | "critical" => {
    if (value >= optimal[0] && value <= optimal[1]) return "optimal";
    if (value >= optimal[0] - 10 && value <= optimal[1] + 10) return "warning";
    return "critical";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-primary shadow-glow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Irrigation System</h1>
              <p className="text-sm text-white/90">AI-Powered Agricultural Automation</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">VTU Final Year Project</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sensor Cards */}
          <div className="lg:col-span-8">
            <h2 className="mb-4 text-2xl font-bold">Live Sensor Data</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <SensorCard
                title="Soil Moisture"
                value={moisture.toFixed(1)}
                unit="%"
                icon={Droplets}
                status={getSensorStatus(moisture, [60, 80])}
                trend={moisture > 65 ? "up" : "down"}
              />
              <SensorCard
                title="Temperature"
                value={temperature.toFixed(1)}
                unit="°C"
                icon={Thermometer}
                status={getSensorStatus(temperature, [20, 30])}
                trend={temperature > 28 ? "up" : "down"}
              />
              <SensorCard
                title="Humidity"
                value={humidity.toFixed(1)}
                unit="%"
                icon={Cloud}
                status={getSensorStatus(humidity, [65, 85])}
                trend="stable"
              />
              <SensorCard
                title="Water Level"
                value={waterLevel.toFixed(1)}
                unit="%"
                icon={Gauge}
                status={getSensorStatus(waterLevel, [70, 100])}
                trend="down"
              />
            </div>

            {/* Water Usage Chart */}
            <div className="mt-6">
              <WaterUsageChart />
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            <AIPrediction
              nextWatering="Today, 6:30 PM"
              confidence={92}
              waterAmount="42L"
              reason="Based on soil moisture trends and weather forecast, optimal watering window detected in 3 hours."
            />
            <ControlPanel />
            <SystemStatus />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 rounded-lg border-2 border-primary/20 bg-gradient-card p-6 text-center shadow-card">
          <h3 className="mb-2 text-xl font-bold">Project Information</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This Smart Irrigation System uses machine learning algorithms to optimize water usage
            based on real-time sensor data, weather forecasts, and historical patterns.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="rounded-lg bg-primary/10 px-4 py-2">
              <span className="font-semibold text-primary">Technology:</span> IoT + AI/ML
            </div>
            <div className="rounded-lg bg-secondary/10 px-4 py-2">
              <span className="font-semibold text-secondary">Sensors:</span> DHT22, Soil Moisture, Ultrasonic
            </div>
            <div className="rounded-lg bg-accent/10 px-4 py-2">
              <span className="font-semibold text-accent">Platform:</span> Raspberry Pi + Cloud
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
