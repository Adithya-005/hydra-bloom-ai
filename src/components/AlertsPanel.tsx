import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemAlert } from "@/hooks/useSystemAlerts";

interface AlertsPanelProps {
  alerts: SystemAlert[];
  onMarkAsRead: (alertId: string) => void;
  isLoading: boolean;
}

export const AlertsPanel = ({ alerts, onMarkAsRead, isLoading }: AlertsPanelProps) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
      case "warning":
        return <AlertTriangle className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "warning":
        return "text-warning bg-warning/10 border-warning/20";
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "info":
        return "text-info bg-info/10 border-info/20";
      default:
        return "text-info bg-info/10 border-info/20";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return date.toLocaleDateString();
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
        <Badge variant="outline">{alerts.filter(a => !a.is_read).length} Active</Badge>
      </div>

      <ScrollArea className="h-[280px] pr-4">
        <div className="space-y-3">
          {isLoading ? (
            <p className="text-center text-sm text-muted-foreground">Loading alerts...</p>
          ) : alerts.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No alerts</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-lg border-2 p-3 transition-all hover:shadow-md cursor-pointer ${getAlertColor(alert.type)} ${alert.is_read ? 'opacity-50' : ''}`}
                onClick={() => !alert.is_read && onMarkAsRead(alert.id)}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                    <p className="text-xs mt-2 opacity-70">{formatTime(alert.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
