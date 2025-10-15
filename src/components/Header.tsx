import { Button } from "@/components/ui/button";
import { Download, Settings, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-primary shadow-glow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-lg">
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">SI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white md:text-3xl">AgroSmart Irrigation</h1>
              <p className="text-xs text-white/90 md:text-sm">AI-Powered Precision Agriculture System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success"></div>
              <span className="text-sm font-medium text-white">Live Monitoring</span>
            </div>
            
            <Button variant="outline" size="sm" className="relative bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs">3</Badge>
            </Button>
            
            <Button variant="outline" size="sm" className="hidden md:flex bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
