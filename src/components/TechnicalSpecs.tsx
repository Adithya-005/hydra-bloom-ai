import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Zap, Database, Cloud } from "lucide-react";

export const TechnicalSpecs = () => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-bold">Technical Specifications</h3>
      
      <Tabs defaultValue="hardware" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hardware" className="space-y-3 mt-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Microcontroller</p>
            </div>
            <p className="text-xs text-muted-foreground">ESP32 / Raspberry Pi 4B</p>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-warning" />
              <p className="text-sm font-semibold">Sensors</p>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• DHT22 - Temperature & Humidity</li>
              <li>• Capacitive Soil Moisture Sensor</li>
              <li>• HC-SR04 - Water Level Detection</li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-info" />
              <p className="text-sm font-semibold">Actuators</p>
            </div>
            <p className="text-xs text-muted-foreground">12V DC Water Pump + Relay Module</p>
          </div>
        </TabsContent>
        
        <TabsContent value="software" className="space-y-3 mt-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">AI/ML Model</p>
            </div>
            <p className="text-xs text-muted-foreground">Random Forest Regression + LSTM</p>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-success" />
              <p className="text-sm font-semibold">Database</p>
            </div>
            <p className="text-xs text-muted-foreground">Cloud-based Time Series DB</p>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-secondary" />
              <p className="text-sm font-semibold">Tech Stack</p>
            </div>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Frontend: React + TypeScript</li>
              <li>• Backend: Node.js / Python</li>
              <li>• ML: TensorFlow / Scikit-learn</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
