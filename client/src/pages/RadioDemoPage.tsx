import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Info, X, CheckCircle, Code, AlertTriangle, Check, Calendar } from "lucide-react";

export default function RadioDemoPage() {
  const [badSheetOpen, setBadSheetOpen] = useState(false);
  const [goodSheetOpen, setGoodSheetOpen] = useState(false);
  const [badSelectedPeriod, setBadSelectedPeriod] = useState("");
  const [goodSelectedPeriod, setGoodSelectedPeriod] = useState("");

  const periods = [
    { value: "1month", label: "1개월" },
    { value: "3months", label: "3개월" },
    { value: "6months", label: "6개월" },
    { value: "1year", label: "1년" },
    { value: "3years", label: "3년" },
    { value: "5years", label: "5년" }
  ];

  // 접근성이 적용되지 않은 경우 - 자동 선택시 즉시 닫힘
  const handleBadSelection = (value: string) => {
    setBadSelectedPeriod(value);
    setBadSheetOpen(false);
  };

  // 접근성이 적용된 경우 - 스페이스바로만 선택
  const handleGoodSelection = (value: string) => {
    setGoodSelectedPeriod(value);
    setGoodSheetOpen(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">라디오 버튼 자동 선택 이슈</h2>
        <p className="text-lg text-muted-foreground">라디오 버튼이 자동 선택되면서 DOM이 갱신될 때 키보드 사용자가 연속적으로 선택할 수 없는 접근성 문제를 확인해보세요.</p>
      </div>

      {/* Introduction Section */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Info className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              문제 소개
            </h3>
            <div className="prose max-w-none text-muted-foreground">
              <p className="mb-4">라디오 버튼에서 화살표 키로 이동할 때 자동으로 선택되면서 DOM이 갱신되는 경우, 키보드 사용자가 연속적으로 다른 옵션을 선택하기 어려운 문제가 발생합니다.</p>
              <h4 className="text-lg font-medium text-foreground mb-2">주요 문제점</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>화살표 키로 라디오 버튼 이동 시 자동 선택으로 인한 DOM 갱신</li>
                <li>DOM 갱신으로 포커스가 리셋되어 연속 선택 불가</li>
                <li>키보드 사용자가 원하지 않는 옵션에서 멈춤</li>
                <li>첫 번째에서 마지막 옵션으로 바로 이동하기 어려움</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Non-Accessible Example */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <X className="text-red-600 mr-3 h-6 w-6" aria-hidden="true" />
              접근성이 적용되지 않은 경우
            </h3>
            <Card className="bg-red-50 border-red-200 mb-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">선택된 기간:</Label>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {badSelectedPeriod ? periods.find(p => p.value === badSelectedPeriod)?.label : "선택되지 않음"}
                    </p>
                  </div>
                  
                  <Sheet open={badSheetOpen} onOpenChange={setBadSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        기간 선택
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[400px]">
                      <SheetHeader>
                        <SheetTitle>기간을 선택하세요</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <fieldset>
                          <legend className="sr-only">기간 선택</legend>
                          <div className="space-y-4">
                            {periods.map((period) => (
                              <div key={period.value} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="bad-period"
                                  value={period.value}
                                  id={`bad-${period.value}`}
                                  checked={badSelectedPeriod === period.value}
                                  onChange={() => handleBadSelection(period.value)}
                                  className="w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                />
                                <label htmlFor={`bad-${period.value}`} className="text-base cursor-pointer">
                                  {period.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-100 border-red-300">
              <CardContent className="p-4">
                <p className="text-red-800 text-sm flex items-start">
                  <AlertTriangle className="mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>문제:</strong> 화살표 키로 라디오 버튼을 이동할 때 자동 선택되면서 바텀 시트가 닫혀 연속 선택이 불가능합니다.
                  </span>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {/* Accessible Example */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="text-emerald-600 mr-3 h-6 w-6" aria-hidden="true" />
              접근성이 적용된 경우
            </h3>
            <Card className="bg-emerald-50 border-emerald-200 mb-4">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">선택된 기간:</Label>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {goodSelectedPeriod ? periods.find(p => p.value === goodSelectedPeriod)?.label : "선택되지 않음"}
                    </p>
                  </div>
                  
                  <Sheet open={goodSheetOpen} onOpenChange={setGoodSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        기간 선택 (접근성 적용)
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[400px]">
                      <SheetHeader>
                        <SheetTitle>기간을 선택하세요 (스페이스바로 선택)</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <fieldset>
                          <legend className="sr-only">기간 선택 (스페이스바로 선택)</legend>
                          <div className="space-y-4">
                            {periods.map((period, index) => (
                              <div key={period.value} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="good-period"
                                  value={period.value}
                                  id={`good-${period.value}`}
                                  checked={goodSelectedPeriod === period.value}
                                  onChange={() => {}} // 기본 onChange 무시
                                  onKeyDown={(e) => {
                                    // 화살표 키 기본 동작 차단
                                    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      
                                      // 수동 포커스 이동
                                      let nextIndex;
                                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                                        nextIndex = (index + 1) % periods.length;
                                      } else {
                                        nextIndex = index === 0 ? periods.length - 1 : index - 1;
                                      }
                                      
                                      const nextElement = document.getElementById(`good-${periods[nextIndex].value}`);
                                      nextElement?.focus();
                                    }
                                    // 스페이스바로만 선택
                                    else if (e.key === ' ') {
                                      e.preventDefault();
                                      handleGoodSelection(period.value);
                                    }
                                  }}
                                  className="w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                />
                                <label htmlFor={`good-${period.value}`} className="text-base cursor-pointer">
                                  {period.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-100 border-emerald-300">
              <CardContent className="p-4">
                <p className="text-emerald-800 text-sm flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>개선점:</strong> 표준 HTML input을 사용하면서 화살표 키 기본 동작만 차단했습니다. 스페이스바로만 선택되어 키보드 사용자가 연속적으로 옵션을 탐색할 수 있습니다.
                  </span>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {/* Code Section */}
      <section>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Code className="text-violet-600 mr-3 h-6 w-6" aria-hidden="true" />
              관련 코드
            </h3>
            
            <div className="space-y-6">
              {/* Bad Example Code */}
              <div>
                <div className="flex items-center mb-3">
                  <Badge variant="destructive" className="mr-2">❌ 잘못된 구현</Badge>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// 기본 HTML 라디오 - 화살표 키로 자동 선택됨
<input 
  type="radio" 
  name="period"
  value="1month"
  onChange={() => {
    // 선택 즉시 DOM 갱신으로 인한 바텀시트 닫힘
    setSelectedValue("1month");
    closeBottomSheet();
  }}
/>
<label htmlFor="period-1month">1개월</label>`}</code>
                </pre>
              </div>

              {/* Good Example Code */}
              <div>
                <div className="flex items-center mb-3">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 mr-2">✅ 올바른 구현</Badge>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// 표준 HTML + 키보드 동작 제어
<input 
  type="radio" 
  name="period"
  value="1month"
  onChange={() => {}} // 기본 onChange 무시
  onKeyDown={(e) => {
    // 화살표 키 기본 동작 차단
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      // 포커스만 이동 (선택하지 않음)
      focusNext();
    }
    // 스페이스바로만 선택
    if (e.key === ' ') {
      e.preventDefault();
      handleSelection("1month");
    }
  }}
/>
<label htmlFor="period-1month">1개월</label>`}</code>
                </pre>
              </div>

              {/* Guidelines */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">구현 가이드라인</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• 표준 HTML input[type="radio"] 사용으로 완벽한 접근성 보장</li>
                    <li>• 화살표 키 기본 동작만 preventDefault()로 차단</li>
                    <li>• 스페이스바로만 선택되도록 제어</li>
                    <li>• fieldset과 legend로 그룹 의미 전달</li>
                    <li>• ARIA 없이도 모든 스크린 리더에서 완벽 지원</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
