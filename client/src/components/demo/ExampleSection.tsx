import { Card, CardContent } from "@/components/ui/card";
import { X, CheckCircle, AlertTriangle, Check } from "lucide-react";
import DemoSection from "./DemoSection";

interface ExampleSectionProps {
  type: "bad" | "good";
  children: React.ReactNode;
  problemText?: string;
  solutionText?: string;
}

export default function ExampleSection({ type, children, problemText, solutionText }: ExampleSectionProps) {
  const isBad = type === "bad";
  
  const config = {
    bad: {
      title: "접근성이 적용되지 않은 경우",
      icon: X,
      iconColor: "text-red-600",
      demoCardBg: "bg-red-50 border-red-200",
      alertCardBg: "bg-red-100 border-red-300",
      alertTextColor: "text-red-800",
      alertIcon: AlertTriangle,
      alertLabel: "문제:"
    },
    good: {
      title: "접근성이 적용된 경우",
      icon: CheckCircle,
      iconColor: "text-emerald-600",
      demoCardBg: "bg-emerald-50 border-emerald-200",
      alertCardBg: "bg-emerald-100 border-emerald-300",
      alertTextColor: "text-emerald-800",
      alertIcon: Check,
      alertLabel: "개선점:"
    }
  };

  const currentConfig = config[type];
  const alertText = isBad ? problemText : solutionText;

  return (
    <DemoSection title={currentConfig.title} icon={currentConfig.icon} iconColor={currentConfig.iconColor}>
      <Card className={`${currentConfig.demoCardBg} mb-4`}>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
      
      {alertText && (
        <Card className={currentConfig.alertCardBg}>
          <CardContent className="p-4">
            <p className={`${currentConfig.alertTextColor} text-sm flex items-start`}>
              <currentConfig.alertIcon className="mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
              <span>
                <strong>{currentConfig.alertLabel}</strong> {alertText}
              </span>
            </p>
          </CardContent>
        </Card>
      )}
    </DemoSection>
  );
}