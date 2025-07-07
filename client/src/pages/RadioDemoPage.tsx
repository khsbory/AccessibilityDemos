import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Calendar, Copy, Check, Code } from "lucide-react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import DemoSection from "@/components/demo/DemoSection";
import { useToast } from "@/hooks/use-toast";

export default function RadioDemoPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
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

  const problemList = [
    "화살표 키로 라디오 버튼 이동 시 자동 선택으로 인한 DOM 갱신",
    "DOM 갱신으로 포커스가 리셋되어 연속 선택 불가",
    "키보드 사용자가 원하지 않는 옵션에서 멈춤",
    "첫 번째에서 마지막 옵션으로 바로 이동하기 어려움"
  ];

  return (
    <DemoPageLayout 
      title="라디오 버튼 자동 선택 이슈"
      description="라디오 버튼이 자동 선택되면서 DOM이 갱신될 때 키보드 사용자가 연속적으로 선택할 수 없는 접근성 문제를 확인해보세요."
    >
      <ProblemIntroSection 
        description="라디오 버튼에서 화살표 키로 이동할 때 자동으로 선택되면서 DOM이 갱신되는 경우, 키보드 사용자가 연속적으로 다른 옵션을 선택하기 어려운 문제가 발생합니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad"
        problemText="화살표 키로 라디오 버튼을 이동할 때 자동 선택되면서 바텀 시트가 닫혀 연속 선택이 불가능합니다."
      >
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
      </ExampleSection>

      <ExampleSection 
        type="good"
        solutionText="표준 HTML input을 사용하면서 마우스 클릭과 키보드 입력을 구분합니다. 마우스 사용자는 클릭으로, 키보드 사용자는 스페이스바로 선택할 수 있어 모든 사용자에게 최적화된 경험을 제공합니다."
      >
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
                          onChange={(e) => {
                            // 마우스 클릭인지 키보드인지 구분
                            if (e.nativeEvent instanceof MouseEvent) {
                              // 마우스 클릭은 허용
                              handleGoodSelection(period.value);
                            }
                            // 키보드 이벤트는 onKeyDown에서 처리
                          }}
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
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1단계", description: '"기간 선택" 버튼에 포커스 후 Enter 키로 바텀시트 열기' },
          { step: "2단계", description: "바텀시트가 열리면 자동으로 첫 번째 라디오 버튼(1개월)에 포커스됨" },
          { step: "3단계", description: "↓ 화살표 키를 눌러 다음 옵션으로 이동" }
        ]}
        goodSteps={[
          { step: "1단계", description: '"기간 선택 (접근성 적용)" 버튼에 포커스 후 Enter 키로 바텀시트 열기' },
          { step: "2단계", description: "바텀시트가 열리면 자동으로 첫 번째 라디오 버튼(1개월)에 포커스됨" },
          { step: "3단계", description: "↓ ↑ 화살표 키로 자유롭게 옵션 탐색 (선택되지 않음)" },
          { step: "4단계", description: "원하는 옵션에서 스페이스바로 선택" }
        ]}
        badResult="즉시 선택되면서 바텀시트가 닫힘 (연속 탐색 불가)"
        goodResult="연속적으로 모든 옵션 탐색 가능"
        additionalNotes={[
          "스크린 리더 사용자: 라디오 버튼에 포커스할 때 레이블이 자동으로 읽히는지 확인",
          "키보드 전용 사용자: 마우스 없이 모든 기능에 접근 가능한지 확인",
          "연속 선택 테스트: 첫 번째에서 마지막 옵션으로 바로 이동 가능한지 확인"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "잘못된 구현",
          code: `// 기본 HTML 라디오 - 화살표 키로 자동 선택됨
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
<label htmlFor="period-1month">1개월</label>`
        }}
        goodExample={{
          title: "올바른 구현",
          code: `// 마우스 클릭과 키보드 입력 구분 처리
<input 
  type="radio" 
  name="period"
  value="1month"
  onChange={(e) => {
    // 마우스 클릭인지 키보드인지 구분
    if (e.nativeEvent instanceof MouseEvent) {
      // 마우스 클릭은 허용
      handleSelection("1month");
    }
    // 키보드 이벤트는 onKeyDown에서 처리
  }}
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
<label htmlFor="period-1month">1개월</label>`
        }}
        guidelines={[
          "표준 HTML input[type=\"radio\"] 사용으로 완벽한 접근성 보장",
          "nativeEvent instanceof MouseEvent로 마우스/키보드 구분",
          "마우스 클릭은 onChange에서 즉시 처리",
          "키보드는 화살표 키 탐색 + 스페이스바 선택으로 분리",
          "fieldset과 legend로 그룹 의미 전달",
          "ARIA 없이도 모든 스크린 리더에서 완벽 지원"
        ]}
      />

      <DemoSection
        title="범용 라디오 버튼 접근성 훅"
        icon={Code}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground mb-4">
            위에서 구현한 라디오 버튼 키보드 접근성 로직을 범용 React 훅으로 추출했습니다. 이 훅을 사용하면 모든 라디오 버튼 그룹에서 동일한 접근성 기능을 쉽게 적용할 수 있습니다.
          </p>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">useRadioAccessibility 훅</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const hookCode = `import { useRef, useCallback } from 'react';

interface UseRadioAccessibilityOptions {
  radioIds: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  name: string;
}

/**
 * 라디오 버튼 접근성을 위한 범용 React 훅
 * 마우스 클릭과 키보드 입력을 구분하여 처리하고,
 * 화살표 키 네비게이션과 스페이스바 선택 기능을 제공합니다.
 * 
 * @param radioIds - 라디오 버튼 ID 목록
 * @param selectedValue - 현재 선택된 값
 * @param onValueChange - 값 변경 핸들러
 * @param name - 라디오 버튼 그룹 name 속성
 */
export function useRadioAccessibility({
  radioIds,
  selectedValue,
  onValueChange,
  name
}: UseRadioAccessibilityOptions) {
  const radioRefs = useRef<Record<string, HTMLInputElement | null>>({});

  /**
   * 키보드 이벤트 핸들러
   * 화살표 키로 포커스 이동, 스페이스바로 선택
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent, value: string) => {
    const currentIndex = radioIds.indexOf(value);
    let newIndex = currentIndex;

    // 화살표 키 기본 동작 차단 및 포커스 이동
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      
      // 다음 인덱스 계산 (순환)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % radioIds.length;
      } else {
        newIndex = currentIndex === 0 ? radioIds.length - 1 : currentIndex - 1;
      }
      
      // 포커스 이동 (선택하지 않음)
      const nextElement = radioRefs.current[radioIds[newIndex]];
      nextElement?.focus();
    }
    // 스페이스바로만 선택
    else if (e.key === ' ') {
      e.preventDefault();
      onValueChange(value);
    }
  }, [radioIds, onValueChange]);

  /**
   * 변경 이벤트 핸들러
   * 마우스 클릭과 키보드 입력을 구분하여 처리
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    // 마우스 클릭인지 키보드인지 구분
    if (e.nativeEvent instanceof MouseEvent) {
      // 마우스 클릭은 허용
      onValueChange(value);
    }
    // 키보드 이벤트는 onKeyDown에서 처리
  }, [onValueChange]);

  /**
   * 라디오 버튼에 적용할 props 생성
   */
  const getRadioProps = useCallback((value: string, id: string) => ({
    ref: (el: HTMLInputElement | null) => { radioRefs.current[value] = el; },
    type: 'radio' as const,
    name,
    value,
    id,
    checked: selectedValue === value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, value),
    className: "w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
  }), [selectedValue, name, handleChange, handleKeyDown]);

  return { getRadioProps };
}

// 사용 예시:
const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const radioIds = ["option1", "option2", "option3"];
  
  const { getRadioProps } = useRadioAccessibility({
    radioIds,
    selectedValue,
    onValueChange: setSelectedValue,
    name: "my-radio-group"
  });

  return (
    <fieldset>
      <legend>옵션을 선택하세요</legend>
      <div className="space-y-2">
        <div>
          <input {...getRadioProps("option1", "radio-option1")} />
          <label htmlFor="radio-option1">옵션 1</label>
        </div>
        <div>
          <input {...getRadioProps("option2", "radio-option2")} />
          <label htmlFor="radio-option2">옵션 2</label>
        </div>
        <div>
          <input {...getRadioProps("option3", "radio-option3")} />
          <label htmlFor="radio-option3">옵션 3</label>
        </div>
      </div>
    </fieldset>
  );
};`;
                
                try {
                  await navigator.clipboard.writeText(hookCode);
                  setCopied(true);
                  toast({
                    title: "코드 복사 완료",
                    description: "useRadioAccessibility 훅 코드가 클립보드에 복사되었습니다."
                  });
                  setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                  toast({
                    title: "복사 실패",
                    description: "코드 복사에 실패했습니다. 수동으로 복사해주세요.",
                    variant: "destructive"
                  });
                }
              }}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "복사됨" : "코드 복사"}
            </Button>
          </div>
          <div className="bg-background border rounded p-4 text-xs font-mono overflow-x-auto">
            <pre className="whitespace-pre-wrap">{`import { useRef, useCallback } from 'react';

interface UseRadioAccessibilityOptions {
  radioIds: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  name: string;
}

/**
 * 라디오 버튼 접근성을 위한 범용 React 훅
 * 마우스 클릭과 키보드 입력을 구분하여 처리하고,
 * 화살표 키 네비게이션과 스페이스바 선택 기능을 제공합니다.
 * 
 * @param radioIds - 라디오 버튼 ID 목록
 * @param selectedValue - 현재 선택된 값
 * @param onValueChange - 값 변경 핸들러
 * @param name - 라디오 버튼 그룹 name 속성
 */
export function useRadioAccessibility({
  radioIds,
  selectedValue,
  onValueChange,
  name
}: UseRadioAccessibilityOptions) {
  const radioRefs = useRef<Record<string, HTMLInputElement | null>>({});

  /**
   * 키보드 이벤트 핸들러
   * 화살표 키로 포커스 이동, 스페이스바로 선택
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent, value: string) => {
    const currentIndex = radioIds.indexOf(value);
    let newIndex = currentIndex;

    // 화살표 키 기본 동작 차단 및 포커스 이동
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      
      // 다음 인덱스 계산 (순환)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % radioIds.length;
      } else {
        newIndex = currentIndex === 0 ? radioIds.length - 1 : currentIndex - 1;
      }
      
      // 포커스 이동 (선택하지 않음)
      const nextElement = radioRefs.current[radioIds[newIndex]];
      nextElement?.focus();
    }
    // 스페이스바로만 선택
    else if (e.key === ' ') {
      e.preventDefault();
      onValueChange(value);
    }
  }, [radioIds, onValueChange]);

  /**
   * 변경 이벤트 핸들러
   * 마우스 클릭과 키보드 입력을 구분하여 처리
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    // 마우스 클릭인지 키보드인지 구분
    if (e.nativeEvent instanceof MouseEvent) {
      // 마우스 클릭은 허용
      onValueChange(value);
    }
    // 키보드 이벤트는 onKeyDown에서 처리
  }, [onValueChange]);

  /**
   * 라디오 버튼에 적용할 props 생성
   */
  const getRadioProps = useCallback((value: string, id: string) => ({
    ref: (el: HTMLInputElement | null) => { radioRefs.current[value] = el; },
    type: 'radio' as const,
    name,
    value,
    id,
    checked: selectedValue === value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, value),
    className: "w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
  }), [selectedValue, name, handleChange, handleKeyDown]);

  return { getRadioProps };
}

// 사용 예시:
const MyRadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const radioIds = ["option1", "option2", "option3"];
  
  const { getRadioProps } = useRadioAccessibility({
    radioIds,
    selectedValue,
    onValueChange: setSelectedValue,
    name: "my-radio-group"
  });

  return (
    <fieldset>
      <legend>옵션을 선택하세요</legend>
      <div className="space-y-2">
        <div>
          <input {...getRadioProps("option1", "radio-option1")} />
          <label htmlFor="radio-option1">옵션 1</label>
        </div>
        <div>
          <input {...getRadioProps("option2", "radio-option2")} />
          <label htmlFor="radio-option2">옵션 2</label>
        </div>
        <div>
          <input {...getRadioProps("option3", "radio-option3")} />
          <label htmlFor="radio-option3">옵션 3</label>
        </div>
      </div>
    </fieldset>
  );
};`}</pre>
          </div>
        </div>
      </DemoSection>
    </DemoPageLayout>
  );
}
