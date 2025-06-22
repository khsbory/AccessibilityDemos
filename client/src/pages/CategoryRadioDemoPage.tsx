import { useState, useRef } from "react";
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
  const [badSelectedLevel2, setBadSelectedLevel2] = useState<string>(""); // 현재 선택된 2단계

  // 접근성 적용 상태
  const [goodSheetOpen, setGoodSheetOpen] = useState(false);
  const [goodSelected, setGoodSelected] = useState("cosmetics/perfume"); // 1단계 기본 선택
  const [goodLevel2Options, setGoodLevel2Options] = useState<any[]>([]);
  const [goodLevel3Options, setGoodLevel3Options] = useState<any[]>([]);
  const [goodSelectedLevel2, setGoodSelectedLevel2] = useState<string>(""); // 현재 선택된 2단계

  // 트리거 버튼 참조
  const badTriggerRef = useRef<HTMLButtonElement>(null);
  const goodTriggerRef = useRef<HTMLButtonElement>(null);

  // 서버에서 데이터를 받아오는 함수 (실제로는 API 호출)
  const fetchLevel3Data = async (level2Value: string) => {
    // 실제 구현에서는 API 호출
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        const data = categoryData.level3[level2Value as keyof typeof categoryData.level3] || [];
        resolve(data);
      }, 200); // 200ms 지연으로 서버 호출 시뮬레이션
    });
  };

  // 접근성 미적용 - 1단계 선택 (기본값으로 복귀)
  const handleBadLevel1Selection = (value: string) => {
    setBadSelected(value);
    setBadLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setBadLevel3Options([]); // 3단계 초기화
    setBadSelectedLevel2(""); // 선택된 2단계 초기화
  };

  // 접근성 미적용 - 2단계 선택
  const handleBadLevel2Selection = async (value: string) => {
    setBadSelected(value);
    setBadSelectedLevel2(value);
    // 서버에서 동적으로 3단계 데이터 로드
    const level3Data = await fetchLevel3Data(value);
    setBadLevel3Options(level3Data);
  };

  // 접근성 미적용 - 3단계 선택
  const handleBadLevel3Selection = (value: string) => {
    setBadSelected(value);
    // 바텀 시트는 자동으로 닫지 않음
  };

  // 접근성 미적용 - 적용 버튼
  const handleBadApply = () => {
    setBadSheetOpen(false);
    // 포커스 복원
    setTimeout(() => {
      badTriggerRef.current?.focus();
    }, 100);
  };

  // 접근성 미적용 - 취소 버튼  
  const handleBadCancel = () => {
    setBadSelected("cosmetics/perfume"); // 기본값으로 복원
    setBadLevel2Options([]);
    setBadLevel3Options([]);
    setBadSelectedLevel2("");
    setBadSheetOpen(false);
    // 포커스 복원
    setTimeout(() => {
      badTriggerRef.current?.focus();
    }, 100);
  };

  // 접근성 적용 - 1단계 선택 (기본값으로 복귀)
  const handleGoodLevel1Selection = (value: string) => {
    setGoodSelected(value);
    setGoodLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setGoodLevel3Options([]); // 3단계 초기화
    setGoodSelectedLevel2(""); // 선택된 2단계 초기화
  };

  // 접근성 적용 - 2단계 선택
  const handleGoodLevel2Selection = async (value: string) => {
    setGoodSelected(value);
    setGoodSelectedLevel2(value);
    // 서버에서 동적으로 3단계 데이터 로드
    const level3Data = await fetchLevel3Data(value);
    setGoodLevel3Options(level3Data);
  };

  // 접근성 적용 - 3단계 선택
  const handleGoodLevel3Selection = (value: string) => {
    setGoodSelected(value);
    // 바텀 시트는 자동으로 닫지 않음
  };

  // 접근성 적용 - 적용 버튼
  const handleGoodApply = () => {
    setGoodSheetOpen(false);
    // 포커스 복원
    setTimeout(() => {
      goodTriggerRef.current?.focus();
    }, 100);
  };

  // 접근성 적용 - 취소 버튼
  const handleGoodCancel = () => {
    setGoodSelected("cosmetics/perfume"); // 기본값으로 복원
    setGoodLevel2Options([]);
    setGoodLevel3Options([]);
    setGoodSelectedLevel2("");
    setGoodSheetOpen(false);
    // 포커스 복원
    setTimeout(() => {
      goodTriggerRef.current?.focus();
    }, 100);
  };

  // 바텀 시트 열 때 2단계 옵션 초기화
  const openBadSheet = () => {
    setBadLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setBadLevel3Options([]);
    setBadSelectedLevel2("");
    setBadSheetOpen(true);
  };

  const openGoodSheet = () => {
    setGoodLevel2Options(categoryData.level2.cosmetics.concat(categoryData.level2.perfume));
    setGoodLevel3Options([]);
    setGoodSelectedLevel2("");
    setGoodSheetOpen(true);
  };

  const problemList = [
    "2단계 카테고리 선택 시 3단계가 표시되면서 다른 2단계 카테고리가 DOM에서 숨겨져 탐색 불가",
    "키보드 포커스가 3단계로 이동하여 사용자가 다른 2단계 카테고리 비교 탐색 불가능",
    "라디오 버튼에 적절한 포커스 스타일링 없어 현재 위치 파악 어려움",
    "계층 구조 변경 시 포커스 이동으로 인한 키보드 사용자 방향감각 상실"
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
        description="계층형 카테고리에서 2단계 카테고리를 선택하면 3단계가 표시되면서 다른 2단계 카테고리들이 DOM에서 숨겨져, 키보드 사용자가 다른 2단계 카테고리를 비교 탐색할 수 없는 문제가 발생합니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad"
        problemText="2단계 카테고리 선택 시 3단계가 표시되면서 다른 2단계 카테고리들이 DOM에서 숨겨져 비교 탐색이 불가능하고, 라디오 버튼에 포커스 스타일이 없어 현재 위치를 파악하기 어렵습니다."
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
              <Button ref={badTriggerRef} variant="outline" className="w-full" onClick={openBadSheet}>
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
                      name="bad-category"
                      value="cosmetics/perfume"
                      id="bad-level1-cosmetics-perfume"
                      checked={badSelected === "cosmetics/perfume"}
                      onChange={() => handleBadLevel1Selection("cosmetics/perfume")}
                      className="sr-only"
                    />
                    <label 
                      htmlFor="bad-level1-cosmetics-perfume"
                      className={`text-base font-medium cursor-pointer px-3 py-2 rounded ${
                        badSelected === "cosmetics/perfume" 
                          ? "bg-primary text-primary-foreground" 
                          : "border hover:bg-gray-50"
                      }`}
                    >
                      화장품/향수
                    </label>
                  </div>
                </div>

                {/* 2단계 */}
                {badLevel2Options.length > 0 && (
                  <div>
                    <ul className="space-y-3">
                      {badLevel2Options.map((item) => {
                        const isSelected = badSelected === item.value;
                        const hasLevel3 = badSelectedLevel2 === item.value && badLevel3Options.length > 0;
                        const isOtherSelected = badSelectedLevel2 && badSelectedLevel2 !== item.value;
                        
                        // 다른 2단계가 선택되고 3단계가 표시중이면 숨김
                        if (isOtherSelected && badLevel3Options.length > 0) {
                          return null;
                        }
                        
                        return (
                          <li key={item.value}>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="bad-category"
                                  value={item.value}
                                  id={`bad-level2-${item.value}`}
                                  checked={isSelected}
                                  onChange={() => handleBadLevel2Selection(item.value)}
                                  className="sr-only"
                                />
                                <label 
                                  htmlFor={`bad-level2-${item.value}`} 
                                  className={`text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left ${
                                    isSelected ? "bg-primary text-primary-foreground border-primary" : ""
                                  }`}
                                >
                                  {item.label}
                                </label>
                              </div>
                              
                              {/* 3단계 - 선택된 2단계 바로 아래에 표시 */}
                              {hasLevel3 && (
                                <div className="ml-6 space-y-2">
                                  <ul className="space-y-2">
                                    {badLevel3Options.map((subItem) => (
                                      <li key={subItem.value}>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="radio"
                                            name="bad-category"
                                            value={subItem.value}
                                            id={`bad-level3-${subItem.value}`}
                                            checked={badSelected === subItem.value}
                                            onChange={() => handleBadLevel3Selection(subItem.value)}
                                            className="sr-only"
                                          />
                                          <label 
                                            htmlFor={`bad-level3-${subItem.value}`} 
                                            className={`text-sm cursor-pointer px-3 py-2 border rounded hover:bg-gray-50 w-full text-left ${
                                              badSelected === subItem.value ? "bg-primary text-primary-foreground border-primary" : ""
                                            }`}
                                          >
                                            {subItem.label}
                                          </label>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* 적용/취소 버튼 - 접근성 미적용 */}
                <div className="flex gap-3 mt-8 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleBadCancel}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button 
                    onClick={handleBadApply}
                    className="flex-1"
                  >
                    적용
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ExampleSection>

      <ExampleSection 
        type="good"
        solutionText="화살표 키로는 탐색만 하고 스페이스바/엔터로만 선택되도록 하여 2단계 카테고리를 자유롭게 비교 탐색할 수 있고, 명확한 포커스 스타일링과 aria-current로 현재 위치를 표시합니다."
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
              <Button ref={goodTriggerRef} variant="outline" className="w-full" onClick={openGoodSheet}>
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
                      name="good-category"
                      value="cosmetics/perfume"
                      id="good-level1-cosmetics-perfume"
                      checked={goodSelected === "cosmetics/perfume"}
                      onChange={() => handleGoodLevel1Selection("cosmetics/perfume")}
                      className="hidden"
                    />
                    <label 
                      htmlFor="good-level1-cosmetics-perfume"
                      role="button"
                      tabIndex={0}
                      aria-current={goodSelected === "cosmetics/perfume" ? "true" : undefined}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleGoodLevel1Selection("cosmetics/perfume");
                        }
                      }}
                      className={`text-base font-medium cursor-pointer px-3 py-2 rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        goodSelected === "cosmetics/perfume" 
                          ? "bg-primary text-primary-foreground" 
                          : "border hover:bg-gray-50"
                      }`}
                    >
                      화장품/향수
                    </label>
                  </div>
                </div>

                {/* 2단계 */}
                {goodLevel2Options.length > 0 && (
                  <div>
                    <ul className="space-y-3" aria-label="2단계">
                      {goodLevel2Options.map((item) => {
                        const isSelected = goodSelected === item.value;
                        const hasLevel3 = goodSelectedLevel2 === item.value && goodLevel3Options.length > 0;
                        const isOtherSelected = goodSelectedLevel2 && goodSelectedLevel2 !== item.value;
                        
                        // 다른 2단계가 선택되고 3단계가 표시중이면 숨김
                        if (isOtherSelected && goodLevel3Options.length > 0) {
                          return null;
                        }
                        
                        return (
                          <li key={item.value}>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="good-category"
                                  value={item.value}
                                  id={`good-level2-${item.value}`}
                                  checked={isSelected}
                                  onChange={() => handleGoodLevel2Selection(item.value)}
                                  className="hidden"
                                />
                                <label 
                                  htmlFor={`good-level2-${item.value}`} 
                                  role="button"
                                  tabIndex={0}
                                  aria-current={isSelected ? "true" : undefined}
                                  onKeyDown={(e) => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                      e.preventDefault();
                                      handleGoodLevel2Selection(item.value);
                                    }
                                  }}
                                  className={`text-base cursor-pointer px-4 py-2 border rounded hover:bg-gray-50 w-full text-left focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                    isSelected ? "bg-primary text-primary-foreground border-primary" : ""
                                  }`}
                                >
                                  {item.label}
                                </label>
                              </div>
                              
                              {/* 3단계 - 선택된 2단계 바로 아래에 표시 */}
                              {hasLevel3 && (
                                <div className="ml-6 space-y-2">
                                  <ul className="space-y-2" aria-label="3단계">
                                    {goodLevel3Options.map((subItem) => (
                                      <li key={subItem.value}>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="radio"
                                            name="good-category"
                                            value={subItem.value}
                                            id={`good-level3-${subItem.value}`}
                                            checked={goodSelected === subItem.value}
                                            onChange={() => handleGoodLevel3Selection(subItem.value)}
                                            className="hidden"
                                          />
                                          <label 
                                            htmlFor={`good-level3-${subItem.value}`} 
                                            role="button"
                                            tabIndex={0}
                                            aria-current={goodSelected === subItem.value ? "true" : undefined}
                                            onKeyDown={(e) => {
                                              if (e.key === ' ' || e.key === 'Enter') {
                                                e.preventDefault();
                                                handleGoodLevel3Selection(subItem.value);
                                              }
                                            }}
                                            className={`text-sm cursor-pointer px-3 py-2 border rounded hover:bg-gray-50 w-full text-left focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                                              goodSelected === subItem.value ? "bg-primary text-primary-foreground border-primary" : ""
                                            }`}
                                          >
                                            {subItem.label}
                                          </label>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* 적용/취소 버튼 - 접근성 적용 */}
                <div className="flex gap-3 mt-8 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleGoodCancel}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button 
                    onClick={handleGoodApply}
                    className="flex-1"
                  >
                    적용
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1단계", description: '"카테고리 선택" 버튼 클릭하여 바텀시트 열기' },
          { step: "2단계", description: "Tab 키로 2단계 라디오 버튼 중 하나에 포커스" },
          { step: "3단계", description: "클릭하여 2단계 카테고리 선택 → 3단계가 자동 표시됨" },
          { step: "4단계", description: "다른 2단계 카테고리 비교를 위해 탐색 시도" },
          { step: "5단계", description: "이미 선택되지 않은 2단계 카테고리들이 DOM에서 숨겨져 접근 불가" },
          { step: "6단계", description: "키보드로 다른 2단계 카테고리 탐색 및 비교 불가능" }
        ]}
        goodSteps={[
          { step: "1단계", description: '"카테고리 선택 (접근성 적용)" 버튼 클릭하여 바텀시트 열기' },
          { step: "2단계", description: "Tab 키로 2단계 카테고리 목록 탐색" },
          { step: "3단계", description: "화살표 키로 2단계 카테고리들을 자유롭게 탐색 (선택되지 않음)" },
          { step: "4단계", description: "스페이스바/Enter로 원하는 2단계 카테고리 선택" },
          { step: "5단계", description: "3단계가 표시되더라도 다른 2단계 카테고리 탐색 가능" },
          { step: "6단계", description: "3단계에서 스페이스바로 선택 후 적용 버튼으로 완료" }
        ]}
        badResult="2단계 카테고리 선택 시 3단계 표시되면서 다른 2단계 카테고리들이 숨겨져 비교 탐색 불가능"
        goodResult="화살표 키로 모든 2단계 카테고리를 자유롭게 탐색할 수 있고, 포커스 스타일과 aria-current로 현재 위치 명확히 파악 가능"
        additionalNotes={[
          "접근성 미적용: 2단계 선택 시 3단계 표시되면서 다른 2단계 카테고리가 DOM에서 숨겨짐",
          "접근성 적용: 모든 2단계 카테고리가 항상 접근 가능하여 자유로운 비교 탐색 지원",
          "화살표 키로 탐색만 하고 스페이스바/Enter로만 선택하여 의도치 않은 선택 방지",
          "aria-current와 포커스 스타일링으로 현재 선택 상태 명확히 표시"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용 코드",
          code: `// 2단계 카테고리가 선택되면 다른 2단계들이 DOM에서 숨겨짐
{badLevel2Options.map((item) => {
  const isOtherSelected = badSelectedLevel2 && badSelectedLevel2 !== item.value;
  
  // 다른 2단계가 선택되고 3단계가 표시중이면 숨김
  if (isOtherSelected && badLevel3Options.length > 0) {
    return null; // DOM에서 완전히 제거
  }
  
  return (
    <input
      type="radio"
      name="bad-category"
      value={item.value}
      checked={isSelected}
      onChange={() => handleBadLevel2Selection(item.value)}
      className="sr-only" // 화면에서 숨김
    />
  );
})}

// 2단계 선택 시 즉시 3단계 로드하여 DOM 갱신
const handleBadLevel2Selection = (value) => {
  setBadSelected(value);
  setBadSelectedLevel2(value);
  // 3단계 데이터 로드로 다른 2단계들 숨겨짐
  setBadLevel3Options(categoryData.level3[value] || []);
};`
        }}
        goodExample={{
          title: "접근성 적용 코드",
          code: `// 라디오 버튼을 완전히 숨기고 레이블에 button 역할 부여
<input
  type="radio"
  name="category"
  value={item.value}
  checked={isSelected}
  onChange={() => handleSelection(item.value)}
  className="hidden"
/>
<label 
  htmlFor={inputId}
  role="button"
  tabIndex={0}
  aria-current={isSelected ? "true" : undefined}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelection(item.value);
    }
  }}
  className="focus:ring-2 focus:ring-primary cursor-pointer"
>
  카테고리명
</label>

// UL에 aria-label로 계층 정보 제공
<ul aria-label="2단계" className="space-y-3">
  {items.map(item => ...)}
</ul>`
        }}
        guidelines={[
          "라디오 버튼을 hidden으로 숨기고 레이블에 role='button' 적용",
          "tabIndex={0}으로 키보드 포커스 가능하게 설정",
          "onKeyDown으로 스페이스바/Enter 키 이벤트만 처리",
          "aria-current로 현재 선택된 항목 명확히 표시",
          "UL 태그에 aria-label로 계층 구조 정보 제공",
          "포커스 스타일링으로 현재 위치 시각적 표시"
        ]}
      />
    </DemoPageLayout>
  );
}