import { Info } from "lucide-react";
import DemoSection from "./DemoSection";

interface ProblemIntroSectionProps {
  description: string;
  problemList: string[];
}

export default function ProblemIntroSection({ description, problemList }: ProblemIntroSectionProps) {
  return (
    <DemoSection title="문제 소개" icon={Info}>
      <div className="prose max-w-none text-muted-foreground">
        <p className="mb-4">{description}</p>
        <h4 className="text-lg font-medium text-foreground mb-2">주요 문제점</h4>
        <ul className="list-disc list-inside space-y-1">
          {problemList.map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      </div>
    </DemoSection>
  );
}