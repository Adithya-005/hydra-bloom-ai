import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, Power, Droplets } from "lucide-react";
import { useState } from "react";

export const ControlPanel = () => {
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isPumpActive, setIsPumpActive] = useState(false);

  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-gradient-accent p-3 shadow-glow">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Control Panel</h3>
          <p className="text-sm text-muted-foreground">System management</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <Power className={isAutoMode ? "h-5 w-5 text-success" : "h-5 w-5 text-muted-foreground"} />
            <div>
              <p className="font-semibold">Auto Mode</p>
              <p className="text-xs text-muted-foreground">
                {isAutoMode ? "AI-controlled watering" : "Manual control"}
              </p>
            </div>
          </div>
          <Switch checked={isAutoMode} onCheckedChange={setIsAutoMode} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Manual Controls</p>
          <div className="grid gap-2">
            <Button
              variant={isPumpActive ? "destructive" : "default"}
              className="w-full justify-start gap-2"
              disabled={isAutoMode}
              onClick={() => setIsPumpActive(!isPumpActive)}
            >
              <Droplets className="h-4 w-4" />
              {isPumpActive ? "Stop Pump" : "Start Pump"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border-2 border-dashed border-primary/30 p-3">
          <p className="text-xs text-center text-muted-foreground">
            {isAutoMode
              ? "System is in automatic mode. AI will manage watering schedule."
              : "Manual mode active. You have full control over the irrigation system."}
          </p>
        </div>
      </div>
    </Card>
  );
};
