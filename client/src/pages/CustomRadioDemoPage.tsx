import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import DemoSection from "@/components/demo/DemoSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import { Copy, Check } from "lucide-react";
import { useState as useReactState } from "react";
import { Button } from "@/components/ui/button";
import { useCustomRadioGroupAccessibility } from "@/hooks/use-custom-radio-group-accessibility";
import { useRef } from "react";

const problemList = [
  "스크린 리더가 현재 선택된 결제 수단을 알 수 없음",
  "확장/축소 상태를 알 수 없음",
  "선택 상태가 시각적으로만 표시되어 보조기기 사용자는 인지 불가"
];

const paymentOptions = [
  { value: "shinhan", label: "신한카드 5% 할인" },
  { value: "hana", label: "하나카드 7% 할인" }
];

const customRadioHookCode = `import { useRef, useCallback } from 'react';

interface UseCustomRadioGroupAccessibilityOptions {
  optionValues: string[];
  selected: string | null;
  setSelected: (value: string) => void;
}

/**
 * 커스텀 라디오 버튼 그룹 접근성 훅
 * - 키보드 네비게이션(←→, ↑↓), 포커스 관리, 선택 상태 자동 처리
 * - ARIA 속성(예: role, aria-checked 등)은 개발자가 직접 부여
 */
export function useCustomRadioGroupAccessibility({
  optionValues,
  selected,
  setSelected
}: UseCustomRadioGroupAccessibilityOptions) {
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // 각 버튼에 부여할 props 생성
  const getItemProps = useCallback((value: string) => {
    const isSelected = selected === value;
    const isFirst = optionValues[0] === value;
    // 선택된 값이 없으면 첫 번째만 tabIndex=0, 나머지는 -1
    // 선택된 값이 있으면 해당 값만 tabIndex=0, 나머지는 -1
    const tabIndex = selected == null ? (isFirst ? 0 : -1) : (isSelected ? 0 : -1);
    return {
      ref: (el: HTMLButtonElement | null) => { itemRefs.current[value] = el; },
      tabIndex,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const idx = optionValues.indexOf(value);
        let nextIdx = idx;
        if (["ArrowRight", "ArrowDown"].includes(e.key)) {
          e.preventDefault();
          nextIdx = (idx + 1) % optionValues.length;
          itemRefs.current[optionValues[nextIdx]]?.focus();
        } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          nextIdx = idx === 0 ? optionValues.length - 1 : idx - 1;
          itemRefs.current[optionValues[nextIdx]]?.focus();
        } else if (e.key === " ") {
          e.preventDefault();
          setSelected(value);
        }
      },
      onClick: () => setSelected(value)
    };
  }, [optionValues, selected, setSelected]);

  return { getItemProps };
}
`;

function CopyHookButton() {
  const [copied, setCopied] = useReactState(false);
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(customRadioHookCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="shrink-0"
    >
      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
      {copied ? "복사됨" : "코드 복사"}
    </Button>
  );
}

// 커스텀 라디오 버튼 접근성 데모 페이지
export default function CustomRadioDemoPage() {
  // Bad 예제 상태
  const [badOpen, setBadOpen] = useReactState(false);
  const [badSelected, setBadSelected] = useReactState<string | null>(null);

  // Good 예제 상태
  const [goodOpen, setGoodOpen] = useReactState(false);
  const [goodSelected, setGoodSelected] = useReactState<string | null>(null);
  const goodTriggerRef = useRef<HTMLButtonElement>(null);
  // 커스텀 라디오 접근성 훅: 키보드/포커스/선택 상태 자동, ARIA는 직접 부여
  const { getItemProps } = useCustomRadioGroupAccessibility({
    optionValues: paymentOptions.map((opt) => opt.value),
    selected: goodSelected,
    setSelected: setGoodSelected
  });

  return (
    <DemoPageLayout
      title="커스텀 라디오 버튼 접근성"
      description="커스텀 버튼 UI에서 라디오 그룹의 접근성(키보드, ARIA, 포커스 관리) 구현 방법을 비교해보세요."
    >
      <ProblemIntroSection
        description="스크린 리더 사용자가 현재 화면의 레이아웃을 이해할 수 없습니다."
        problemList={problemList}
      />

      {/* Bad Example */}
      <ExampleSection
        type="bad"
        problemText="키보드/스크린리더 접근성 없이 시각적으로만 구현된 커스텀 라디오 버튼입니다."
      >
        <div className="max-w-md mx-auto">
          {/* Bad: 접근성 속성/키보드 지원 없음, 시각적 선택만 표시 */}
          <Button onClick={() => setBadOpen((v: any) => !v)} aria-expanded={undefined} className="w-full mb-4">
            결제 수단 할인 {badOpen ? "▲" : "▼"}
          </Button>
          {badOpen && (
            <ul className="border rounded p-2 mb-4">
              {paymentOptions.map((opt) => (
                <li key={opt.value} className="mb-2 last:mb-0" style={{ listStyle: "none" }}>
                  <button
                    type="button"
                    className={`w-full px-4 py-2 rounded border text-left transition-colors ${badSelected === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-gray-300"}`}
                    onClick={() => setBadSelected(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            {badSelected && (
              <Button variant="outline" onClick={() => { setBadOpen(false); setBadSelected(null); }}>
                취소
              </Button>
            )}
          </div>
        </div>
      </ExampleSection>

      {/* Good Example (접근성/키보드/ARIA는 이후 단계에서 추가) */}
      <ExampleSection
        type="good"
        solutionText="키보드/스크린리더 접근성, ARIA, 포커스 관리가 모두 적용된 커스텀 라디오 버튼입니다."
      >
        <div className="max-w-md mx-auto">
          {/* Good: role/aria-checked 등 ARIA 속성 명시, 키보드/포커스/선택 상태는 훅으로 자동 관리 */}
          <Button
            ref={goodTriggerRef}
            onClick={() => setGoodOpen((v: any) => !v)}
            aria-expanded={goodOpen}
            className="w-full mb-4"
          >
            결제 수단 할인 {goodOpen ? "▲" : "▼"}
          </Button>
          {goodOpen && (
            <ul className="border rounded p-2 mb-4" role="radiogroup" aria-label="결제 수단 할인 선택">
              {paymentOptions.map((opt) => (
                <li key={opt.value} className="mb-2 last:mb-0" style={{ listStyle: "none" }} role="none">
                  <button
                    type="button"
                    {...getItemProps(opt.value)} // 키보드/포커스/선택 상태 자동
                    role="radio" // ARIA 역할 명시
                    aria-checked={goodSelected === opt.value} // ARIA 선택 상태 명시
                    className={`w-full px-4 py-2 rounded border text-left transition-colors ${goodSelected === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-gray-300"}`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-2">
            {goodSelected && (
              <Button
                variant="outline"
                onClick={() => {
                  setGoodOpen(false);
                  setGoodSelected(null);
                  setTimeout(() => {
                    goodTriggerRef.current?.focus();
                  }, 100);
                }}
              >
                취소
              </Button>
            )}
          </div>
        </div>
      </ExampleSection>

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용 코드",
          code: `// 접근성 없는 커스텀 라디오 버튼
<ul>
  <li>
    <button type="button" onClick={...}>
      신한카드 5% 할인
    </button>
  </li>
  <li>
    <button type="button" onClick={...}>
      하나카드 7% 할인
    </button>
  </li>
</ul>
// 키보드/스크린리더 접근성 없음, 시각적 선택만 표시`
        }}
        goodExample={{
          title: "접근성 적용 코드 (훅 사용)",
          code: `// 접근성 적용 커스텀 라디오 버튼
<ul role="radiogroup" aria-label="결제 수단 할인 선택">
  <li role="none">
    <button
      type="button"
      {...getItemProps("shinhan")}
      role="radio"
      aria-checked={selected === "shinhan"}
    >
      신한카드 5% 할인
    </button>
  </li>
  <li role="none">
    <button
      type="button"
      {...getItemProps("hana")}
      role="radio"
      aria-checked={selected === "hana"}
    >
      하나카드 7% 할인
    </button>
  </li>
</ul>
// getItemProps: 키보드(←→, ↑↓) 이동, 스페이스( )로만 선택, 포커스/선택 상태 자동, ARIA는 직접 부여`
        }}
        guidelines={[
          'ul에 role="radiogroup"와 aria-label 명시',
          'li에 role="none"으로 목록 의미 제거',
          'button에 role="radio"와 aria-checked 명시',
          'getItemProps로 키보드/포커스/선택 상태 자동 관리',
          '적용/취소 버튼은 ul 외부에 위치'
        ]}
      />

      <DemoSection title="커스텀 라디오 접근성 훅 전체 코드" icon={Copy} iconColor="text-blue-500">
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              아래 훅을 복사해서 커스텀 라디오 버튼 그룹에 적용하면 키보드/포커스/선택 상태가 자동으로 관리됩니다.<br />
              <b>ARIA 속성(예: role, aria-checked 등)은 반드시 직접 부여해야 합니다.</b>
            </p>
            <CopyHookButton />
          </div>
          <pre className="whitespace-pre-wrap text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            {customRadioHookCode}
          </pre>
        </div>
      </DemoSection>
    </DemoPageLayout>
  );
} 