import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Droplets } from "lucide-react";

const data = [
  { day: "Mon", usage: 45 },
  { day: "Tue", usage: 52 },
  { day: "Wed", usage: 38 },
  { day: "Thu", usage: 61 },
  { day: "Fri", usage: 42 },
  { day: "Sat", usage: 55 },
  { day: "Sun", usage: 48 },
];

export const WaterUsageChart = () => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-gradient-primary p-3 shadow-glow">
          <Droplets className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Water Usage</h3>
          <p className="text-sm text-muted-foreground">Weekly consumption (Liters)</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="usage" fill="hsl(var(--info))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-info">341L</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">48.7L</p>
          <p className="text-xs text-muted-foreground">Avg/Day</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-warning">-12%</p>
          <p className="text-xs text-muted-foreground">vs Last Week</p>
        </div>
      </div>
    </Card>
  );
};
