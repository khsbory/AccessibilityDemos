import { useState, useEffect, useRef } from "react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import DemoSection from "@/components/demo/DemoSection";
import ExampleSection from "@/components/demo/ExampleSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, HeartIcon } from "lucide-react";
import { useDocumentTitle } from "@/hooks/use-document-title";

type TabId = "fruits" | "vegetables" | "meat";

interface TabData {
  id: TabId;
  label: string;
  items: string[];
}

const tabsData: TabData[] = [
  {
    id: "fruits",
    label: "과일",
    items: ["사과", "바나나", "딸기", "포도", "오렌지"]
  },
  {
    id: "vegetables", 
    label: "채소",
    items: ["당근", "오이", "토마토", "시금치", "양파"]
  },
  {
    id: "meat",
    label: "육류", 
    items: ["소고기", "돼지고기", "닭고기", "양고기", "오리고기"]
  }
];

// Bad Example: No ARIA, mouse-only interaction
function BadTabControl() {
  const [activeTab, setActiveTab] = useState<TabId>("fruits");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (item: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item)) {
        newFavorites.delete(item);
      } else {
        newFavorites.add(item);
      }
      return newFavorites;
    });
  };

  const activeTabData = tabsData.find(tab => tab.id === activeTab)!;

  return (
    <div className="w-full max-w-md mx-auto bg-background border rounded-lg p-4">
      {/* Tab List - No ARIA roles */}
      <ul className="flex border-b mb-4">
        {tabsData.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-2 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Panel - No ARIA roles */}
      <div className="min-h-[200px]">
        <ul className="space-y-2">
          {activeTabData.items.map((item) => (
            <li key={item} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
              <span className="text-foreground">{item}</span>
              <button
                onClick={() => toggleFavorite(item)}
                className={`p-1 rounded transition-colors ${
                  favorites.has(item)
                    ? "text-red-500 hover:text-red-600"
                    : "text-muted-foreground hover:text-red-500"
                }`}
              >
                <Heart className={`h-4 w-4 ${favorites.has(item) ? "fill-current" : ""}`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Good Example: Full ARIA implementation with keyboard navigation
function GoodTabControl() {
  const [activeTab, setActiveTab] = useState<TabId>("fruits");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    fruits: null,
    vegetables: null,
    meat: null
  });

  const toggleFavorite = (item: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item)) {
        newFavorites.delete(item);
      } else {
        newFavorites.add(item);
      }
      return newFavorites;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: TabId) => {
    const tabIds = tabsData.map(tab => tab.id);
    const currentIndex = tabIds.indexOf(tabId);
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabIds.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabIds.length - 1;
        break;
      default:
        return;
    }

    const newTabId = tabIds[newIndex];
    setActiveTab(newTabId);
    tabRefs.current[newTabId]?.focus();
  };

  const activeTabData = tabsData.find(tab => tab.id === activeTab)!;

  return (
    <div className="w-full max-w-md mx-auto bg-background border rounded-lg p-4">
      {/* Tab List with proper ARIA */}
      <ul role="tablist" className="flex border-b mb-4">
        {tabsData.map((tab) => (
          <li key={tab.id} role="presentation" className="flex-1">
            <button
              ref={(el) => tabRefs.current[tab.id] = el}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              className={`w-full py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Panel with proper ARIA */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="min-h-[200px]"
      >
        <ul role="presentation" className="space-y-2">
          {activeTabData.items.map((item) => {
            const isFavorite = favorites.has(item);
            return (
              <li key={item} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                <span className="text-foreground">{item}</span>
                <button
                  aria-pressed={isFavorite}
                  aria-label={isFavorite ? `${item} 찜 취소` : `${item} 찜하기`}
                  onClick={() => toggleFavorite(item)}
                  className={`p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isFavorite
                      ? "text-red-500 hover:text-red-600"
                      : "text-muted-foreground hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function TabControlDemoPage() {
  useDocumentTitle("탭 컨트롤 접근성");

  const problemList = [
    "키보드로 탭 간 이동이 불가능 (화살표 키, Home/End 키 미지원)",
    "스크린 리더가 탭 구조를 인식하지 못해 탭과 패널의 관계를 알 수 없음",
    "'찜하기' 버튼 상태를 스크린 리더가 읽지 못해 현재 찜 상태를 알 수 없음",
    "Tab 키로 탭 목록을 순차적으로 방문해야 하는 비효율성"
  ];

  return (
    <DemoPageLayout
      title="탭 컨트롤 접근성"
      description="탭 인터페이스의 키보드 네비게이션과 ARIA 속성 적용을 통한 접근성 개선사항을 비교해보세요."
    >
      <ProblemIntroSection
        description="일반적인 탭 컨트롤은 마우스 클릭으로만 조작 가능하고, 보조기기가 탭과 패널의 관계를 인식하지 못하는 문제가 있습니다."
        problemList={problemList}
      />

      <ExampleSection type="bad" problemText="키보드 내비게이션 불가, ARIA 속성 없음으로 스크린 리더가 탭 구조를 인식하지 못합니다.">
        <BadTabControl />
      </ExampleSection>

      <ExampleSection type="good" solutionText="완전한 키보드 지원과 ARIA 속성으로 모든 사용자가 탭을 효율적으로 사용할 수 있습니다.">
        <GoodTabControl />
      </ExampleSection>

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용 - 기본 버튼",
          code: `<!-- 탭 목록 -->
<ul className="flex border-b mb-4">
  {tabsData.map((tab) => (
    <li key={tab.id} className="flex-1">
      <button
        onClick={() => setActiveTab(tab.id)}
        className="w-full py-2 px-4 text-sm font-medium"
      >
        {tab.label}
      </button>
    </li>
  ))}
</ul>

<!-- 탭 패널 -->
<div className="min-h-[200px]">
  <ul className="space-y-2">
    {activeTabData.items.map((item) => (
      <li key={item}>
        <span>{item}</span>
        <button onClick={() => toggleFavorite(item)}>
          <Heart className="h-4 w-4" />
        </button>
      </li>
    ))}
  </ul>
</div>

/* 문제점 */
- ARIA 속성 없음 (role, aria-selected, aria-controls)
- 키보드 내비게이션 불가 (화살표 키, Home/End)
- tabindex 관리 없음 (모든 탭이 Tab 키 대상)
- 찜하기 버튼 상태 정보 없음`
        }}
        goodExample={{
          title: "접근성 적용 - 완전한 ARIA 구현",
          code: `<!-- 탭 목록 - ARIA 완전 적용 -->
<ul role="tablist" className="flex border-b mb-4">
  {tabsData.map((tab) => (
    <li key={tab.id} role="presentation" className="flex-1">
      <button
        ref={(el) => tabRefs.current[tab.id] = el}
        role="tab"
        id={\`tab-\${tab.id}\`}
        aria-selected={activeTab === tab.id}
        aria-controls={\`panel-\${tab.id}\`}
        tabIndex={activeTab === tab.id ? 0 : -1}
        onClick={() => setActiveTab(tab.id)}
        onKeyDown={(e) => handleKeyDown(e, tab.id)}
      >
        {tab.label}
      </button>
    </li>
  ))}
</ul>

<!-- 탭 패널 - 관계 명시 -->
<div
  role="tabpanel"
  id={\`panel-\${activeTab}\`}
  aria-labelledby={\`tab-\${activeTab}\`}
>
  <ul role="presentation">
    {activeTabData.items.map((item) => (
      <li key={item}>
        <span>{item}</span>
        <button
          aria-pressed={favorites.has(item)}
          aria-label={isFavorite ? \`\${item} 찜 취소\` : \`\${item} 찜하기\`}
        >
          <Heart className="h-4 w-4" />
        </button>
      </li>
    ))}
  </ul>
</div>

/* 키보드 내비게이션 */
const handleKeyDown = (e, tabId) => {
  switch (e.key) {
    case "ArrowRight": // 다음 탭
    case "ArrowLeft":  // 이전 탭  
    case "Home":       // 첫 번째 탭
    case "End":        // 마지막 탭
  }
}`
        }}
        guidelines={[
          "role='tablist'로 탭 컨테이너 정의",
          "role='tab'과 aria-selected로 각 탭의 상태 명시",
          "aria-controls와 aria-labelledby로 탭과 패널 관계 연결",
          "활성 탭만 tabindex='0', 나머지는 tabindex='-1'",
          "화살표 키로 탭 간 이동, Home/End로 처음/끝 이동",
          "aria-pressed로 토글 버튼 상태 명시",
          "동적 aria-label로 버튼 상태에 따른 명확한 설명 제공"
        ]}
      />

      <TestGuideSection
        testTitle="키보드와 스크린 리더로 테스트하기"
        badSteps={[
          { step: "Tab 키 테스트", description: "Tab 키로 모든 탭 버튼을 순차적으로 방문해야 함" },
          { step: "화살표 키 테스트", description: "화살표 키로 탭 간 이동 불가" },
          { step: "스크린 리더 테스트", description: "탭 구조 인식 없이 단순 버튼으로만 읽음" },
          { step: "찜하기 상태 테스트", description: "버튼 상태 변화를 스크린 리더가 알리지 않음" }
        ]}
        goodSteps={[
          { step: "Tab 키로 탭 영역 진입", description: "활성 탭으로 바로 포커스 이동" },
          { step: "화살표 키로 탭 탐색", description: "←→ 키로 탭 간 빠른 이동, 양 끝에서 순환" },
          { step: "Home/End 키 테스트", description: "처음/마지막 탭으로 즉시 이동" },
          { step: "Tab 키로 패널 진입", description: "활성 탭에서 Tab 키로 패널 첫 번째 요소로 이동" },
          { step: "찜하기 버튼 테스트", description: "aria-pressed와 aria-label로 상태 변화 명확히 안내" },
          { step: "스크린 리더 확인", description: "'탭 목록 3개 중 1번째, 과일 탭 선택됨' 등으로 정확한 정보 제공" }
        ]}
        badResult="키보드 사용자는 비효율적인 탐색, 스크린 리더 사용자는 탭 구조 파악 불가"
        goodResult="모든 사용자가 효율적인 키보드 내비게이션과 명확한 상태 정보로 탭을 완전히 활용 가능"
        additionalNotes={[
          "탭 패널에는 tabindex='0'을 추가하지 않음 (비표준이며 포커스 문제 야기)",
          "화살표 키는 탭 변경과 동시에 포커스 이동 (WAI-ARIA 표준)",
          "찜하기 버튼은 토글 버튼으로 aria-pressed 필수"
        ]}
      />
    </DemoPageLayout>
  );
}