import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, Battery, AlertCircle } from "lucide-react";

export const SystemStatus = () => {
  const statusItems = [
    { icon: Activity, label: "System", status: "Online", variant: "default" as const },
    { icon: Wifi, label: "Connection", status: "Strong", variant: "default" as const },
    { icon: Battery, label: "Battery", status: "95%", variant: "default" as const },
    { icon: AlertCircle, label: "Alerts", status: "None", variant: "outline" as const },
  ];

  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-bold">System Status</h3>
      <div className="space-y-3">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{item.label}</span>
            </div>
            <Badge variant={item.variant}>{item.status}</Badge>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-success/10 p-3 text-center">
        <p className="text-sm font-semibold text-success">All systems operational</p>
      </div>
    </Card>
  );
};
