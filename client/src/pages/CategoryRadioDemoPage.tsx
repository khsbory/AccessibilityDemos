import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

// 카테고리 데이터 정의
const categoryData = {
  level1: [
    { value: "cosmetics", label: "화장품" },
    { value: "perfume", label: "향수" }
  ],
  level2: {
    cosmetics: [
      { value: "skincare", label: "스킨케어" },
      { value: "makeup", label: "메이크업" },
      { value: "haircare", label: "헤어케어" },
      { value: "bodycare", label: "바디케어" },
      { value: "suncare", label: "선케어" }
    ],
    perfume: [
      { value: "mens", label: "남성향수" },
      { value: "womens", label: "여성향수" },
      { value: "unisex", label: "유니섹스" },
      { value: "luxury", label: "럭셔리" },
      { value: "niche", label: "니치향수" }
    ]
  },
  level3: {
    skincare: [
      { value: "toner", label: "토너" },
      { value: "essence", label: "에센스" },
      { value: "serum", label: "세럼" },
      { value: "cream", label: "크림" }
    ],
    makeup: [
      { value: "foundation", label: "파운데이션" },
      { value: "lipstick", label: "립스틱" },
      { value: "eyeshadow", label: "아이섀도우" },
      { value: "mascara", label: "마스카라" }
    ],
    haircare: [
      { value: "shampoo", label: "샴푸" },
      { value: "conditioner", label: "컨디셔너" },
      { value: "treatment", label: "트리트먼트" },
      { value: "styling", label: "스타일링" }
    ],
    bodycare: [
      { value: "lotion", label: "로션" },
      { value: "bodywash", label: "바디워시" },
      { value: "scrub", label: "스크럽" },
      { value: "oil", label: "바디오일" }
    ],
    suncare: [
      { value: "sunscreen", label: "선크림" },
      { value: "sunblock", label: "선블록" },
      { value: "aftersun", label: "애프터썬" },
      { value: "spf", label: "SPF제품" }
    ],
    mens: [
      { value: "fresh", label: "프레시" },
      { value: "woody", label: "우디" },
      { value: "spicy", label: "스파이시" },
      { value: "citrus", label: "시트러스" }
    ],
    womens: [
      { value: "floral", label: "플로럴" },
      { value: "fruity", label: "프루티" },
      { value: "sweet", label: "스위트" },
      { value: "elegant", label: "엘레간트" }
    ],
    unisex: [
      { value: "clean", label: "클린" },
      { value: "minimal", label: "미니멀" },
      { value: "natural", label: "내추럴" },
      { value: "modern", label: "모던" }
    ],
    luxury: [
      { value: "premium", label: "프리미엄" },
      { value: "exclusive", label: "익스클루시브" },
      { value: "limited", label: "리미티드" },
      { value: "signature", label: "시그니처" }
    ],
    niche: [
      { value: "artisan", label: "아티젠" },
      { value: "indie", label: "인디" },
      { value: "boutique", label: "부티크" },
      { value: "craft", label: "크래프트" }
    ]
  }
};

export default function CategoryRadioDemoPage() {
  // 접근성 미적용 상태
  const [badSheetOpen, setBadSheetOpen] = useState(false);
  const [badSelected, setBadSelected] = useState("cosmetics/perfume"); // 1단계 기본 선택
  const [badLevel2Options, setBadLevel2Options] = useState<any[]>([]);
  const [badLevel3Options, setBadLevel3Options] = useState<any[]>([]);

  // 접근성 적용 상태
  const [goodSheetOpen, setGoodSheetOpen] = useState(false);
  const [goodSelected, setGoodSelected] = useState("cosmetics/perfume"); // 1단계 기본 선택
  const [goodLevel2Options, setGoodLevel2Options] = useState<any[]>([]);
  const [goodLevel3Options, setGoodLevel3Options] = useState<any[]>([]);

  // 접근성 미적용 - 2단계 선택
  const handleBadLevel2Selection = (value: string) => {
    setBadSelected(value);
    // 동적으로 3단계 데이터 로드
    const level3Data = categoryData.level3[value as keyof typeof categoryData.level3] || [];
    setBadLevel3Options(level3Data);
    setBadLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
  };

  // 접근성 미적용 - 3단계 선택
  const handleBadLevel3Selection = (value: string) => {
    setBadSelected(value);
    setBadSheetOpen(false);
  };

  // 접근성 적용 - 2단계 선택
  const handleGoodLevel2Selection = (value: string) => {
    setGoodSelected(value);
    // 동적으로 3단계 데이터 로드
    const level3Data = categoryData.level3[value as keyof typeof categoryData.level3] || [];
    setGoodLevel3Options(level3Data);
    setGoodLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
  };

  // 접근성 적용 - 3단계 선택
  const handleGoodLevel3Selection = (value: string) => {
    setGoodSelected(value);
    setGoodSheetOpen(false);
  };

  // 바텀 시트 열 때 2단계 옵션 초기화
  const openBadSheet = () => {
    setBadLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setBadLevel3Options([]);
    setBadSheetOpen(true);
  };

  const openGoodSheet = () => {
    setGoodLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setGoodLevel3Options([]);
    setGoodSheetOpen(true);
  };

  const problemList = [
    "라디오 버튼이 화면에 보이지만 스크린리더에서 접근 불가",
    "레이블 클릭 시 키보드 포커스 관리 부재",
    "계층적 구조에 대한 적절한 의미 전달 부족",
    "카테고리 그룹화에 대한 명확한 구조 정보 부재"
  ];

  const getSelectedLabel = (selected: string) => {
    if (selected === "cosmetics/perfume") return "화장품/향수";
    
    // 2단계 카테고리 찾기
    for (const category of Object.keys(categoryData.level2)) {
      const items = categoryData.level2[category as keyof typeof categoryData.level2];
      const found = items.find(item => item.value === selected);
      if (found) return found.label;
    }
    
    // 3단계 카테고리 찾기
    for (const category of Object.keys(categoryData.level3)) {
      const items = categoryData.level3[category as keyof typeof categoryData.level3];
      const found = items.find(item => item.value === selected);
      if (found) return found.label;
    }
    
    return selected;
  };

  return (
    <DemoPageLayout 
      title="라디오 버튼 계층형 카테고리"
      description="계층형 카테고리에서 라디오 버튼의 접근성 구현 방법을 확인해보세요."
    >
      <ProblemIntroSection 
        description="계층형 카테고리에서 라디오 버튼을 구현할 때, 적절한 접근성 속성과 키보드 탐색이 없으면 스크린리더 사용자가 구조를 이해하고 탐색하기 어려운 문제가 발생합니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad"
        problemText="라디오 버튼이 화면에 표시되지만 스크린리더에서 인식되지 않고, 계층 구조에 대한 정보가 부족합니다."
      >
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">선택된 카테고리:</Label>
            <p className="text-lg font-semibold text-foreground mt-1">
              {getSelectedLabel(badSelected)}
            </p>
          </div>
          
          <Sheet open={badSheetOpen} onOpenChange={setBadSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full" onClick={openBadSheet}>
                <ChevronRight className="mr-2 h-4 w-4" />
                카테고리 선택
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[500px]">
              <SheetHeader>
                <SheetTitle>카테고리를 선택하세요</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* 1단계 - 기본 선택됨 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="bad-level1"
                      value="cosmetics/perfume"
                      checked={badSelected === "cosmetics/perfume"}
                      readOnly
                      className="sr-only"
                    />
                    <label className="text-base font-medium cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded">
                      화장품/향수
                    </label>
                  </div>
                </div>

                {/* 2단계 */}
                {badLevel2Options.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">2단계 카테고리</h3>
                    <ul className="space-y-3">
                      {badLevel2Options.map((item) => (
                        <li key={item.value}>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="bad-level2"
                              value={item.value}
                              id={`bad-level2-${item.value}`}
                              checked={badSelected === item.value}
                              onChange={() => handleBadLevel2Selection(item.value)}
                              className="sr-only"
                            />
                            <label 
                              htmlFor={`bad-level2-${item.value}`} 
                              className="text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3단계 */}
                {badLevel3Options.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">3단계 카테고리</h3>
                    <ul className="space-y-3">
                      {badLevel3Options.map((item) => (
                        <li key={item.value}>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="bad-level3"
                              value={item.value}
                              id={`bad-level3-${item.value}`}
                              checked={badSelected === item.value}
                              onChange={() => handleBadLevel3Selection(item.value)}
                              className="sr-only"
                            />
                            <label 
                              htmlFor={`bad-level3-${item.value}`} 
                              className="text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ExampleSection>

      <ExampleSection 
        type="good"
        solutionText="라디오 버튼을 숨기고 레이블에 button 역할과 키보드 접근성을 적용하여 스크린리더와 키보드 사용자 모두가 접근할 수 있습니다."
      >
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-foreground">선택된 카테고리:</Label>
            <p className="text-lg font-semibold text-foreground mt-1">
              {getSelectedLabel(goodSelected)}
            </p>
          </div>
          
          <Sheet open={goodSheetOpen} onOpenChange={setGoodSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full" onClick={openGoodSheet}>
                <ChevronRight className="mr-2 h-4 w-4" />
                카테고리 선택 (접근성 적용)
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[500px]">
              <SheetHeader>
                <SheetTitle>카테고리를 선택하세요</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* 1단계 - 기본 선택됨 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="good-level1"
                      value="cosmetics/perfume"
                      checked={goodSelected === "cosmetics/perfume"}
                      readOnly
                      className="hidden"
                    />
                    <label className="text-base font-medium cursor-pointer bg-primary text-primary-foreground px-3 py-2 rounded">
                      화장품/향수
                    </label>
                  </div>
                </div>

                {/* 2단계 */}
                {goodLevel2Options.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">2단계 카테고리</h3>
                    <ul className="space-y-3" aria-label="2단계">
                      {goodLevel2Options.map((item) => (
                        <li key={item.value}>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="good-level2"
                              value={item.value}
                              id={`good-level2-${item.value}`}
                              checked={goodSelected === item.value}
                              onChange={() => handleGoodLevel2Selection(item.value)}
                              className="hidden"
                            />
                            <label 
                              htmlFor={`good-level2-${item.value}`} 
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault();
                                  handleGoodLevel2Selection(item.value);
                                }
                              }}
                              className="text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3단계 */}
                {goodLevel3Options.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-3">3단계 카테고리</h3>
                    <ul className="space-y-3" aria-label="3단계">
                      {goodLevel3Options.map((item) => (
                        <li key={item.value}>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="good-level3"
                              value={item.value}
                              id={`good-level3-${item.value}`}
                              checked={goodSelected === item.value}
                              onChange={() => handleGoodLevel3Selection(item.value)}
                              className="hidden"
                            />
                            <label 
                              htmlFor={`good-level3-${item.value}`} 
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault();
                                  handleGoodLevel3Selection(item.value);
                                }
                              }}
                              className="text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1단계", description: '"카테고리 선택" 버튼에 포커스 후 Enter 키로 바텀시트 열기' },
          { step: "2단계", description: "바텀시트가 열리면 화장품/향수가 기본 선택된 상태" },
          { step: "3단계", description: "2단계 카테고리 중 하나를 클릭하여 선택" },
          { step: "4단계", description: "3단계 카테고리가 나타나면 원하는 항목 선택" }
        ]}
        goodSteps={[
          { step: "1단계", description: '"카테고리 선택 (접근성 적용)" 버튼에 포커스 후 Enter 키로 바텀시트 열기' },
          { step: "2단계", description: "Tab 키로 2단계 카테고리 목록 탐색" },
          { step: "3단계", description: "스페이스바나 Enter로 2단계 카테고리 선택" },
          { step: "4단계", description: "3단계 카테고리 목록에서 Tab으로 탐색 후 스페이스바로 선택" }
        ]}
        badResult="라디오 버튼이 스크린리더에서 인식되지 않아 키보드로만 탐색 가능"
        goodResult="모든 옵션이 스크린리더에서 읽히고 키보드로 완전히 조작 가능"
        additionalNotes={[
          "스크린리더 사용자: 각 단계별로 '2단계', '3단계' 라벨이 읽힘",
          "키보드 사용자: Tab으로 탐색, 스페이스바/Enter로 선택 가능",
          "계층 구조가 명확하게 전달됨"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용 코드",
          code: `// 라디오 버튼이 sr-only로 숨겨져 있어 스크린리더에서 접근 불가
<input
  type="radio"
  className="sr-only"
  onChange={handleSelection}
/>
<label className="cursor-pointer">
  카테고리명
</label>

// UL에 의미 정보 없음
<ul className="space-y-3">
  <li>카테고리 항목</li>
</ul>`
        }}
        goodExample={{
          title: "접근성 적용 코드",
          code: `// 라디오 버튼을 완전히 숨기고 레이블에 button 역할 부여
<input
  type="radio"
  className="hidden"
  onChange={handleSelection}
/>
<label 
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelection(value);
    }
  }}
  className="focus:ring-2 focus:ring-primary"
>
  카테고리명
</label>

// UL에 aria-label로 단계 정보 제공
<ul aria-label="2단계">
  <li>카테고리 항목</li>
</ul>`
        }}
        guidelines={[
          "라디오 버튼을 hidden으로 숨기고 레이블에 role='button' 적용",
          "tabIndex={0}으로 키보드 포커스 가능하게 설정",
          "onKeyDown으로 스페이스바/Enter 키 이벤트 처리",
          "UL 태그에 aria-label로 계층 정보 제공",
          "포커스 스타일링으로 현재 위치 명확히 표시"
        ]}
      />
    </DemoPageLayout>
  );
}