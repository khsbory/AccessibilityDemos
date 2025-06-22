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
              <p className="mb-4">이 사이트는 웹 접근성에 대한 이해를 높이고, 접근성이 잘 구현된 사례와 그렇지 않은 사례를 비교하여 학습할 수 있도록 제작되었습니다.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>접근성 문제가 있는 UI 요소들의 실제 사례 제공</li>
                <li>올바른 접근성 구현 방법 안내</li>
                <li>스크린 리더 사용자 경험 개선 방법 학습</li>
                <li>키보드 내비게이션 최적화 기법 습득</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Guidelines Section */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Map className="text-emerald-600 mr-3 h-6 w-6" aria-hidden="true" />
              이용 안내
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-foreground">데모 카테고리</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="text-primary mt-1 h-5 w-5" aria-hidden="true" />
                    <div>
                      <h5 className="font-medium text-foreground">모바일 데모</h5>
                      <p className="text-sm text-muted-foreground">모바일 환경에서의 접근성 이슈와 해결방안</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Monitor className="text-primary mt-1 h-5 w-5" aria-hidden="true" />
                    <div>
                      <h5 className="font-medium text-foreground">PC 웹 데모</h5>
                      <p className="text-sm text-muted-foreground">데스크탑 웹에서의 접근성 구현 사례</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="text-primary mt-1 h-5 w-5" aria-hidden="true" />
                    <div>
                      <h5 className="font-medium text-foreground">공통 웹 데모</h5>
                      <p className="text-sm text-muted-foreground">플랫폼 공통 접근성 원칙과 구현</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-foreground">사용 방법</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>관심 있는 데모 카테고리를 선택하세요</li>
                  <li>구체적인 접근성 이슈를 확인하세요</li>
                  <li>접근성이 적용된 버전과 비교해보세요</li>
                  <li>관련 코드와 구현 가이드를 참고하세요</li>
                </ol>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <p className="text-sm text-primary">
                      <Accessibility className="inline mr-2 h-4 w-4" aria-hidden="true" />
                      스크린 리더나 키보드만을 사용하여 데모를 체험해보시기 바랍니다.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <Star className="text-violet-600 mr-3 h-6 w-6" aria-hidden="true" />
              주요 특징
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                  <CheckCircle className="text-green-600 h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="font-medium text-foreground mb-2">실제 사례 기반</h4>
                <p className="text-sm text-muted-foreground">실제 웹사이트에서 발견되는 접근성 문제들을 기반으로 제작</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <Code className="text-blue-600 h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="font-medium text-foreground mb-2">코드 예제 제공</h4>
                <p className="text-sm text-muted-foreground">각 데모마다 올바른 구현을 위한 HTML, CSS, JavaScript 코드 제공</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Accessibility className="text-purple-600 h-6 w-6" aria-hidden="true" />
                </div>
                <h4 className="font-medium text-foreground mb-2">WCAG 준수</h4>
                <p className="text-sm text-muted-foreground">WCAG 2.1 AA 레벨 기준에 따른 접근성 가이드라인 적용</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
