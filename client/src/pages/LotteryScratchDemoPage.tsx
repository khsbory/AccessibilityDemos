import { useState } from "react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import DemoSection from "@/components/demo/DemoSection";
import ExampleSection from "@/components/demo/ExampleSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import { useDocumentTitle } from "@/hooks/use-document-title";
import BadLotteryScratch from "@/components/demo/BadLotteryScratch";
import GoodLotteryScratch from "@/components/demo/GoodLotteryScratch";

export default function LotteryScratchDemoPage() {
  useDocumentTitle("복권 긁기 접근성");

  const problemList = [
    "스크린 리더 사용자는 마우스/터치로 복권을 긁을 수 없음",
    "스크린 리더가 복권 상태와 결과를 인식하지 못함",
    "키보드로 복권을 긁을 수 있는 방법이 없음",
    "복권 긁기 진행 상황을 알 수 없음"
  ];

  return (
    <DemoPageLayout
      title="복권 긁기 접근성"
      description="복권 긁기 인터페이스의 접근성 개선을 통해 모든 사용자가 복권을 즐길 수 있도록 하는 방법을 알아보세요."
    >
                        <ProblemIntroSection
                    description="일반적인 복권 긁기는 마우스나 터치로만 작동하여 스크린 리더 사용자는 사용할 수 없습니다. 또한 스크린 리더가 복권의 상태나 결과를 인식하지 못해 접근성에 문제가 있습니다."
                    problemList={problemList}
                  />

                        <ExampleSection type="bad" problemText="마우스/터치로만 긁을 수 있어 스크린 리더 사용자는 사용할 수 없습니다.">
                    <BadLotteryScratch />
                  </ExampleSection>

      <ExampleSection type="good" solutionText="스크린 리더 전용 버튼을 추가하여 모든 사용자가 복권을 사용할 수 있습니다.">
        <GoodLotteryScratch />
      </ExampleSection>

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용 - 마우스/터치만 지원",
          code: `// Canvas API로 복권 표면 구현
const canvas = useRef<HTMLCanvasElement>(null);

// 마우스/터치 이벤트만 처리
const handleMouseDown = (e: React.MouseEvent) => {
  // 마우스로만 긁기 가능
};

const handleTouchStart = (e: React.TouchEvent) => {
  // 터치로만 긁기 가능
};

/* 문제점 */
- 키보드 접근성 없음
- 스크린 리더가 복권 상태를 인식하지 못함
- 시각/운동 장애인은 사용할 수 없음
- 복권 결과를 알 수 없음`
        }}
        goodExample={{
          title: "접근성 적용 - 스크린 리더 버튼 추가",
          code: `// 스크린 리더 전용 버튼 추가
<button 
  className="sr-only" 
  aria-label="복권 긁기"
  onClick={handleScratch}
>
  복권 긁기
</button>

// 복권 상태를 ARIA로 명시
<div aria-live="polite" aria-label="복권 상태">
  {lotteryStatus}
</div>

// 복권 결과 알림
<div aria-live="assertive" aria-label="복권 결과">
  {lotteryResult}
</div>

/* 개선사항 */
- 스크린 리더 전용 버튼으로 키보드 접근성 제공
- aria-live로 복권 상태와 결과 실시간 알림
- 모든 사용자가 복권을 사용할 수 있음
- 복권 진행 상황을 명확히 안내`
        }}
        guidelines={[
          "sr-only 클래스로 스크린 리더 전용 버튼 구현",
          "aria-live 속성으로 복권 상태와 결과 실시간 알림",
          "aria-label로 복권 상태를 명확히 설명",
          "키보드 포커스 관리로 접근성 향상"
        ]}
      />

      <TestGuideSection
        testTitle="마우스, 터치, 스크린 리더로 테스트하기"
        badSteps={[
          { step: "마우스 테스트", description: "마우스로만 복권을 긁을 수 있음" },
          { step: "터치 테스트", description: "터치로만 복권을 긁을 수 있음" },
          { step: "스크린 리더 테스트", description: "복권 존재를 인식하지 못함" },
          { step: "키보드 테스트", description: "키보드로 복권을 사용할 수 없음" }
        ]}
        goodSteps={[
          { step: "스크린 리더 버튼 테스트", description: "스크린 리더가 '복권 긁기' 버튼을 읽어줌" },
          { step: "키보드 접근성 테스트", description: "Tab 키로 버튼에 접근 가능" },
          { step: "상태 알림 테스트", description: "복권 상태와 결과를 실시간으로 안내받음" },
          { step: "마우스/터치 테스트", description: "기존 기능도 정상 작동" }
        ]}
        badResult="스크린 리더 사용자는 복권을 사용할 수 없음"
        goodResult="모든 사용자가 복권을 즐길 수 있음"
        additionalNotes={[
          "sr-only 클래스는 시각적으로 숨기지만 스크린 리더는 읽음",
          "aria-live='polite'는 사용자 작업을 방해하지 않으면서 알림",
          "aria-live='assertive'는 중요한 결과를 즉시 알림"
        ]}
      />
    </DemoPageLayout>
  );
} 