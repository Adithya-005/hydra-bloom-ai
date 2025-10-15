import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, GraduationCap, Mail, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-card shadow-card">
      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h4 className="font-bold">Academic Project</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Final Year Engineering Project
              <br />
              VTU - Visvesvaraya Technological University
              <br />
              B.E. in Electronics & Communication
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-secondary" />
              <h4 className="font-bold">Project Scope</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              IoT-based Smart Agriculture
              <br />
              AI/ML for Water Conservation
              <br />
              Sustainable Farming Solutions
            </p>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" />
              <h4 className="font-bold">Technologies</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">IoT</Badge>
              <Badge variant="outline">AI/ML</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">TensorFlow</Badge>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-info" />
              <h4 className="font-bold">Contact</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Industry Collaboration Welcome
              <br />
              Open for Innovation & Feedback
              <br />
              Ready for Deployment
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-muted-foreground md:text-left">
              © 2025 AgroSmart Irrigation System. Developed for academic & industrial applications.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-success/20 text-success">Production Ready</Badge>
              <Badge className="bg-primary/20 text-primary">Scalable</Badge>
              <Badge className="bg-info/20 text-info">Industry 4.0</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
