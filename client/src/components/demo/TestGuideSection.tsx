import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle, Check } from "lucide-react";
import DemoSection from "./DemoSection";

interface TestStep {
  step: string;
  description: string;
}

interface TestGuideProps {
  badSteps: TestStep[];
  goodSteps: TestStep[];
  badResult: string;
  goodResult: string;
  additionalNotes?: string[];
}

export default function TestGuideSection({ 
  badSteps, 
  goodSteps, 
  badResult, 
  goodResult,
  additionalNotes = []
}: TestGuideProps) {
  return (
    <DemoSection title="테스트 가이드" icon={Calendar} iconColor="text-blue-600">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bad Example Test */}
        <div>
          <div className="flex items-center mb-3">
            <Badge variant="destructive" className="mr-2">❌ 문제 상황 재현</Badge>
          </div>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-3">키보드로 테스트하기:</h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                {badSteps.map((step, index) => (
                  <li key={index}><strong>{step.step}:</strong> {step.description}</li>
                ))}
                <li className="text-red-700 font-medium">
                  <AlertTriangle className="inline h-3 w-3 mr-1" />
                  결과: {badResult}
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Good Example Test */}
        <div>
          <div className="flex items-center mb-3">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 mr-2">✅ 개선된 동작</Badge>
          </div>
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-foreground mb-3">키보드로 테스트하기:</h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                {goodSteps.map((step, index) => (
                  <li key={index}><strong>{step.step}:</strong> {step.description}</li>
                ))}
                <li className="text-emerald-700 font-medium">
                  <Check className="inline h-3 w-3 mr-1" />
                  결과: {goodResult}
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Test Instructions */}
      {additionalNotes.length > 0 && (
        <Card className="bg-blue-50 border-blue-200 mt-6">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">추가 테스트 방법</h4>
            <div className="text-blue-800 text-sm space-y-1">
              {additionalNotes.map((note, index) => (
                <p key={index}>{note}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DemoSection>
  );
}