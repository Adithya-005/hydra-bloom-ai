import { Header } from "@/components/Header";
import { SensorCard } from "@/components/SensorCard";
import { AIPrediction } from "@/components/AIPrediction";
import { ControlPanel } from "@/components/ControlPanel";
import { WaterUsageChart } from "@/components/WaterUsageChart";
import { SystemStatus } from "@/components/SystemStatus";
import { AlertsPanel } from "@/components/AlertsPanel";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { Footer } from "@/components/Footer";
import { Droplets, Thermometer, Cloud, Gauge } from "lucide-react";
import { useSensorData } from "@/hooks/useSensorData";
import { useAIPrediction } from "@/hooks/useAIPrediction";
import { useSystemAlerts } from "@/hooks/useSystemAlerts";

const Index = () => {
  const { sensorData, isLoading: sensorsLoading } = useSensorData();
  const { prediction, isLoading: predictionLoading } = useAIPrediction();
  const { alerts, isLoading: alertsLoading, markAsRead } = useSystemAlerts();

  const getSensorStatus = (value: number, optimal: [number, number]): "optimal" | "warning" | "critical" => {
    if (value >= optimal[0] && value <= optimal[1]) return "optimal";
    if (value >= optimal[0] - 10 && value <= optimal[1] + 10) return "warning";
    return "critical";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        {/* Performance Overview */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <PerformanceMetrics />
          <TechnicalSpecs />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sensor Cards */}
          <div className="lg:col-span-8">
            <h2 className="mb-4 text-2xl font-bold">Live Sensor Data</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <SensorCard
                title="Soil Moisture"
                value={sensorData.soil_moisture.toFixed(1)}
                unit="%"
                icon={Droplets}
                status={getSensorStatus(sensorData.soil_moisture, [60, 80])}
                trend={sensorData.soil_moisture > 65 ? "up" : "down"}
              />
              <SensorCard
                title="Temperature"
                value={sensorData.temperature.toFixed(1)}
                unit="°C"
                icon={Thermometer}
                status={getSensorStatus(sensorData.temperature, [20, 30])}
                trend={sensorData.temperature > 28 ? "up" : "down"}
              />
              <SensorCard
                title="Humidity"
                value={sensorData.humidity.toFixed(1)}
                unit="%"
                icon={Cloud}
                status={getSensorStatus(sensorData.humidity, [65, 85])}
                trend="stable"
              />
              <SensorCard
                title="Water Level"
                value={sensorData.water_level.toFixed(1)}
                unit="%"
                icon={Gauge}
                status={getSensorStatus(sensorData.water_level, [70, 100])}
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
            {!predictionLoading && prediction && (
              <AIPrediction
                nextWatering={new Date(prediction.next_watering).toLocaleString()}
                confidence={prediction.confidence}
                waterAmount={prediction.water_amount}
                reason={prediction.reason}
              />
            )}
            <ControlPanel />
            <AlertsPanel alerts={alerts} onMarkAsRead={markAsRead} isLoading={alertsLoading} />
            <SystemStatus />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
