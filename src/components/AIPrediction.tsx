import { Card } from "@/components/ui/card";
import { Brain, Droplets, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AIPredictionProps {
  nextWatering: string;
  confidence: number;
  waterAmount: string;
  reason: string;
}

export const AIPrediction = ({
  nextWatering,
  confidence,
  waterAmount,
  reason,
}: AIPredictionProps) => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-gradient-primary p-3 shadow-glow animate-pulse-glow">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold">AI Prediction</h3>
          <p className="text-sm text-muted-foreground">Machine learning insights</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-primary/10 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Next Watering</p>
              <p className="text-lg font-bold text-primary">{nextWatering}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Amount</p>
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-info" />
              <p className="text-lg font-bold text-info">{waterAmount}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Confidence Level</span>
            <span className="font-semibold text-success">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Analysis</p>
          <p className="text-sm">{reason}</p>
        </div>
      </div>
    </Card>
  );
};
