import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricProps {
  label: string;
  value: string;
  change: number;
  period: string;
}

const Metric = ({ label, value, change, period }: MetricProps) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold mb-2">{value}</p>
      <div className="flex items-center gap-1 text-xs">
        {isNeutral ? (
          <Minus className="h-3 w-3 text-muted-foreground" />
        ) : isPositive ? (
          <TrendingUp className="h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="h-3 w-3 text-destructive" />
        )}
        <span className={isNeutral ? "text-muted-foreground" : isPositive ? "text-success" : "text-destructive"}>
          {Math.abs(change)}%
        </span>
        <span className="text-muted-foreground">{period}</span>
      </div>
    </div>
  );
};

export const PerformanceMetrics = () => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <h3 className="mb-4 text-lg font-bold">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-3">
        <Metric label="Water Efficiency" value="94.2%" change={12} period="vs last month" />
        <Metric label="Cost Savings" value="₹2,340" change={18} period="this month" />
        <Metric label="Crop Health" value="Excellent" change={0} period="stable" />
        <Metric label="System Uptime" value="99.8%" change={-0.1} period="vs target" />
      </div>
    </Card>
  );
};
