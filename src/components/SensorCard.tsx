import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: "optimal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
}

export const SensorCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend = "stable",
}: SensorCardProps) => {
  const statusColors = {
    optimal: "text-success border-success/20 bg-success/5",
    warning: "text-warning border-warning/20 bg-warning/5",
    critical: "text-destructive border-destructive/20 bg-destructive/5",
  };

  const trendIcons = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-2 p-6 transition-all duration-300 hover:shadow-card hover:scale-105",
        statusColors[status]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{value}</span>
            <span className="text-lg font-medium opacity-70">{unit}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="font-semibold">{trendIcons[trend]}</span>
            <span className="capitalize">{status}</span>
          </div>
        </div>
        <div className="rounded-full bg-gradient-primary p-3 shadow-glow">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-1 w-full",
          status === "optimal" && "bg-success",
          status === "warning" && "bg-warning",
          status === "critical" && "bg-destructive animate-pulse"
        )}
      />
    </Card>
  );
};
