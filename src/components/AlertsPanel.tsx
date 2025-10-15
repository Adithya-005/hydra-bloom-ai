import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: "warning" | "success" | "info" | "critical";
  title: string;
  message: string;
  time: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Low Water Level",
    message: "Tank water level below 20%. Refill recommended.",
    time: "2 mins ago",
  },
  {
    id: "2",
    type: "success",
    title: "Watering Completed",
    message: "Scheduled irrigation cycle completed successfully.",
    time: "1 hour ago",
  },
  {
    id: "3",
    type: "info",
    title: "Weather Update",
    message: "Rain forecasted tomorrow. AI adjusted watering schedule.",
    time: "3 hours ago",
  },
];

export const AlertsPanel = () => {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "info":
        return "text-info bg-info/10 border-info/20";
    }
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-accent p-3 shadow-glow">
            <Bell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Alerts & Notifications</h3>
            <p className="text-xs text-muted-foreground">Real-time system updates</p>
          </div>
        </div>
        <Badge variant="outline">{alerts.length} Active</Badge>
      </div>

      <ScrollArea className="h-[280px] pr-4">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-lg border-2 p-3 transition-all hover:shadow-md ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <p className="font-semibold text-sm">{alert.title}</p>
                  <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                  <p className="text-xs mt-2 opacity-70">{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
