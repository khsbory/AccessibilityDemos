import { Info } from "lucide-react";
import DemoSection from "./DemoSection";

interface ProblemIntroSectionProps {
  title?: string;
  description: string;
  problemList: string[];
  subtitle?: string;
}

export default function ProblemIntroSection({ 
  title = "문제 소개", 
  description, 
  problemList,
  subtitle
}: ProblemIntroSectionProps) {
  return (
    <DemoSection title={title} icon={Info}>
      <div className="prose max-w-none text-muted-foreground">
        <p className="mb-4">{description}</p>
        {subtitle && (
          <h4 className="text-lg font-medium text-foreground mb-2">{subtitle}</h4>
        )}
        <ul className="list-disc list-inside space-y-1">
          {problemList.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      </div>
    </DemoSection>
  );
}