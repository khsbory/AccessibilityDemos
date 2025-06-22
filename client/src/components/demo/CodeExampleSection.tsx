import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import DemoSection from "./DemoSection";

interface CodeExample {
  title: string;
  code: string;
}

interface CodeExampleProps {
  badExample: CodeExample;
  goodExample: CodeExample;
  guidelines: string[];
}

export default function CodeExampleSection({ badExample, goodExample, guidelines }: CodeExampleProps) {
  return (
    <DemoSection title="관련 코드" icon={Code} iconColor="text-violet-600" className="">
      <div className="space-y-6">
        {/* Bad Example Code */}
        <div>
          <div className="flex items-center mb-3">
            <Badge variant="destructive" className="mr-2">❌ {badExample.title}</Badge>
          </div>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{badExample.code}</code>
          </pre>
        </div>

        {/* Good Example Code */}
        <div>
          <div className="flex items-center mb-3">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 mr-2">✅ {goodExample.title}</Badge>
          </div>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{goodExample.code}</code>
          </pre>
        </div>

        {/* Guidelines */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">구현 가이드라인</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              {guidelines.map((guideline, index) => (
                <li key={index}>• {guideline}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DemoSection>
  );
}