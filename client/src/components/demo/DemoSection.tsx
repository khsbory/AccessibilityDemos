import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DemoSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DemoSection({ 
  title, 
  icon: Icon, 
  iconColor = "text-primary", 
  children, 
  className = "mb-8" 
}: DemoSectionProps) {
  return (
    <section className={className}>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
            <Icon className={`${iconColor} mr-3 h-6 w-6`} aria-hidden="true" />
            {title}
          </h3>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}