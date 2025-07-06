import { useState, useEffect, useRef } from "react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import DemoSection from "@/components/demo/DemoSection";
import ExampleSection from "@/components/demo/ExampleSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, HeartIcon, Copy, Check } from "lucide-react";

import { useTabAccessibility } from "@/hooks/use-tab-accessibility";

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

// Good Example: Full ARIA implementation with keyboard navigation using reusable hook
function GoodTabControl() {
  const [activeTab, setActiveTab] = useState<TabId>("fruits");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const tabIds = tabsData.map(tab => tab.id);
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabId);
  };
  
  const { getTabProps, getTabListProps, getTabPanelProps } = useTabAccessibility({
    tabIds,
    activeTab,
    onTabChange: handleTabChange
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

  const activeTabData = tabsData.find(tab => tab.id === activeTab)!;

  return (
    <div className="w-full max-w-md mx-auto bg-background border rounded-lg p-4">
      {/* Tab List with proper ARIA */}
      <ul {...getTabListProps()} className="flex border-b mb-4">
        {tabsData.map((tab) => (
          <li key={tab.id} role="none" className="flex-1">
            <button
              {...getTabProps(tab.id)}
              onClick={() => setActiveTab(tab.id)}
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
        {...getTabPanelProps(activeTab)}
        className="min-h-[200px]"
      >
        <ul className="space-y-2">
          {activeTabData.items.map((item) => {
            const isFavorite = favorites.has(item);
            const itemId = `${activeTab}-${item.replace(/\s/g, '-')}`;
            return (
              <li key={item} className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded">
                <span id={itemId} className="text-foreground">{item}</span>
                <button
                  aria-pressed={isFavorite}
                  aria-label="찜하기"
                  aria-describedby={itemId}
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
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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
        description="일반적인 탭컨트롤의 경우 선택됨 상태를 읽어주지 않거나 단순히 버튼으로만 읽어주고 있어 화면의 레이아웃을 이해하기 어려운 경우가 많습니다. 또한 키보드 접근성이 제대로 되어 있지 않아 어려움을 겪기도 합니다."
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
          title: "접근성 적용 - 범용 훅 사용",
          code: `// 범용 탭 접근성 훅 사용
const { getTabProps, getTabListProps, getTabPanelProps } = useTabAccessibility({
  tabIds: tabsData.map(tab => tab.id),
  activeTab,
  onTabChange: setActiveTab
});

<!-- 탭 목록 - 훅으로 자동 ARIA 적용 -->
<ul {...getTabListProps()} className="flex border-b mb-4">
  {tabsData.map((tab) => (
    <li key={tab.id} role="none" className="flex-1">
      <button
        {...getTabProps(tab.id)}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    </li>
  ))}
</ul>

<!-- 탭 패널 - 훅으로 자동 관계 설정 -->
<div {...getTabPanelProps(activeTab)}>
  <ul>
    {activeTabData.items.map((item) => {
      const itemId = \`\${activeTab}-\${item.replace(/\\s/g, '-')}\`;
      return (
        <li key={item}>
          <span id={itemId}>{item}</span>
          <button
            aria-pressed={favorites.has(item)}
            aria-label="찜하기"
            aria-describedby={itemId}
          >
            <Heart className="h-4 w-4" />
          </button>
        </li>
      );
    })}
  </ul>
</div>

/* 훅이 자동으로 처리하는 기능들 */
- role="tablist", role="tab" 자동 적용
- aria-selected, aria-controls, aria-labelledby 자동 설정  
- tabindex 관리 (활성 탭: 0, 나머지: -1)
- 키보드 내비게이션 (←→, Home/End) 자동 구현
- 포커스 관리 자동 처리`
        }}
        guidelines={[
          "role='none'으로 불필요한 목록 의미 제거 (presentation 대신)",
          "useTabAccessibility 훅으로 복잡한 ARIA 로직 간소화",
          "getTabProps, getTabListProps, getTabPanelProps로 속성 자동 적용",
          "aria-pressed로 토글 버튼 상태 명시",
          "aria-label은 '찜하기'로 고정, aria-describedby로 품목명 연결, aria-pressed로 상태 구분"
        ]}
      />

      {/* 범용 훅 코드 복사 영역 */}
      <DemoSection title="범용 탭 접근성 훅" icon={Heart} iconColor="text-blue-500">
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              아래 훅을 복사하여 프로젝트에서 사용하면 탭 접근성을 자동으로 구현할 수 있습니다.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                const hookCode = `import { useRef, useCallback } from 'react';

interface UseTabAccessibilityOptions {
  tabIds: string[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * 탭 접근성을 위한 범용 React 훅
 * role="tablist"와 role="tab", aria-selected 마크업이 되어 있으면
 * 자동으로 키보드 접근성을 추가해주는 훅입니다.
 */
export function useTabAccessibility({
  tabIds,
  activeTab,
  onTabChange
}: UseTabAccessibilityOptions) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabIds.indexOf(tabId);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabIds.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabIds.length - 1;
        break;
      default:
        return;
    }

    const newTabId = tabIds[newIndex];
    onTabChange(newTabId);
    setTimeout(() => tabRefs.current[newTabId]?.focus(), 0);
  }, [tabIds, onTabChange]);

  const getTabProps = useCallback((tabId: string) => ({
    ref: (el: HTMLButtonElement | null) => { tabRefs.current[tabId] = el; },
    role: 'tab' as const,
    id: \`tab-\${tabId}\`,
    'aria-selected': activeTab === tabId,
    'aria-controls': \`panel-\${tabId}\`,
    tabIndex: activeTab === tabId ? 0 : -1,
    onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, tabId)
  }), [activeTab, handleKeyDown]);

  const getTabListProps = useCallback(() => ({
    role: 'tablist' as const
  }), []);

  const getTabPanelProps = useCallback((tabId: string) => ({
    role: 'tabpanel' as const,
    id: \`panel-\${tabId}\`,
    'aria-labelledby': \`tab-\${tabId}\`
  }), []);

  return { getTabProps, getTabListProps, getTabPanelProps };
}`;
                
                try {
                  await navigator.clipboard.writeText(hookCode);
                  setCopied(true);
                  toast({
                    title: "코드 복사 완료",
                    description: "useTabAccessibility 훅 코드가 클립보드에 복사되었습니다."
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

interface UseTabAccessibilityOptions {
  tabIds: string[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * 탭 접근성을 위한 범용 React 훅
 * role="tablist"와 role="tab", aria-selected 마크업이 되어 있으면
 * 자동으로 키보드 접근성을 추가해주는 훅입니다.
 */
export function useTabAccessibility({
  tabIds,
  activeTab,
  onTabChange
}: UseTabAccessibilityOptions) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabIds.indexOf(tabId);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabIds.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabIds.length - 1;
        break;
      default:
        return;
    }

    const newTabId = tabIds[newIndex];
    onTabChange(newTabId);
    setTimeout(() => tabRefs.current[newTabId]?.focus(), 0);
  }, [tabIds, onTabChange]);

  const getTabProps = useCallback((tabId: string) => ({
    ref: (el: HTMLButtonElement | null) => { tabRefs.current[tabId] = el; },
    role: 'tab' as const,
    id: \`tab-\${tabId}\`,
    'aria-selected': activeTab === tabId,
    'aria-controls': \`panel-\${tabId}\`,
    tabIndex: activeTab === tabId ? 0 : -1,
    onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, tabId)
  }), [activeTab, handleKeyDown]);

  const getTabListProps = useCallback(() => ({
    role: 'tablist' as const
  }), []);

  const getTabPanelProps = useCallback((tabId: string) => ({
    role: 'tabpanel' as const,
    id: \`panel-\${tabId}\`,
    'aria-labelledby': \`tab-\${tabId}\`
  }), []);

  return { getTabProps, getTabListProps, getTabPanelProps };
}`}</pre>
          </div>
        </div>
      </DemoSection>

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