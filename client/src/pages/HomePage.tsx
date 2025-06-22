import { Card, CardContent } from "@/components/ui/card";
import { Target, Map, Star, CheckCircle, Code, Accessibility, Smartphone, Monitor, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">웹 접근성 데모 사이트</h2>
        <p className="text-lg text-muted-foreground mb-8">웹 접근성의 중요성을 이해하고 올바른 구현 방법을 학습할 수 있는 데모 사이트입니다.</p>
      </div>

      {/* Purpose Section */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Target className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              사이트 목적
            </h3>
            <div className="prose max-w-none text-muted-foreground">
              <p className="mb-4">
                지금까지 접근성 개선을 위해서 이슈들을 진단하고 해결 방안을 제시해 왔지만, 
                구현하기 전에 접근성이 잘 되었을 때 어떻게 동작하는지를 테스트할 수 있는 환경이 필요하다는 판단하에 
                이러한 페이지를 만들었습니다.
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-foreground mb-3">해당 페이지의 특징</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>다양한 접근성 케이스를 제공하여 직접 체험할 수 있습니다</li>
                  <li>각 케이스별로 문제점을 명확히 제시합니다</li>
                  <li>접근성이 적용된 경우와 적용되지 않은 경우에 대한 실제 데모를 준비했습니다</li>
                  <li>관련 코드를 분석하고 구현 방법을 학습할 수 있습니다</li>
                  <li>실제 스크린 리더와 키보드 내비게이션으로 차이점을 직접 확인할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
