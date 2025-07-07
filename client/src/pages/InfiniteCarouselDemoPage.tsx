import { useState, useRef, useEffect, useCallback, memo, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { createPortal } from 'react-dom';
import { useToast } from "@/hooks/use-toast";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import DemoPageLayout from "@/components/demo/DemoPageLayout";
import DemoSection from "@/components/demo/DemoSection";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

// 상수 데이터들 - 컴포넌트 외부에서 한 번만 생성
const baseCategories = [
  "식품", "생필품", "패션", "뷰티", "가전", "가구", "스포츠", "문구",
  "반려동물", "건강", "육아", "도서", "취미", "자동차", "여행"
];

function getEmojiForCategory(category: string): string {
  const emojiMap: Record<string, string> = {
    "식품": "🍎", "생필품": "🧴", "패션": "👗", "뷰티": "💄", "가전": "📱",
    "가구": "🪑", "스포츠": "⚽", "문구": "📝", "반려동물": "🐕", "건강": "💊",
    "육아": "👶", "도서": "📚", "취미": "🎨", "자동차": "🚗", "여행": "✈️"
  };
  return emojiMap[category] || "🏷️";
}

// 무한 루프를 위해 카테고리를 28번 반복 (총 420개) - 한 번만 생성
const categories = Array.from({ length: 28 }, (_, setIndex) => 
  baseCategories.map((category, index) => ({
    id: setIndex * baseCategories.length + index,
    name: category,
    emoji: getEmojiForCategory(category)
  }))
).flat();

const problemList = [
  "무한 루프 캐러셀에서 스크린 리더 사용자가 끝을 알 수 없음",
  "현재 위치나 전체 항목 수를 파악하기 어려움", 
  "가려진 카테고리 버튼들에도 접근 가능해 혼란 야기",
  "키보드로 탐색할 때 무한히 순환하여 탈출하기 어려움"
];

// Types
interface Category {
  id: number;
  name: string;
  emoji: string;
}

interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  isInert?: boolean;
}

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentDemo: "bad" | "good";
  categories: Category[];
  bottomSheetRef: React.RefObject<HTMLDivElement>;
  overlayRef: React.RefObject<HTMLDivElement>;
}

// CategoryButton 컴포넌트 - 독립적으로 정의 (memo와 forwardRef로 최적화)
const CategoryButton = memo(forwardRef<HTMLButtonElement, CategoryButtonProps>(({ category, isActive, isInert = false }, ref) => {
  const buttonProps = isInert 
    ? { inert: "" as any } 
    : {};
  
  return (
    <button 
      ref={ref}
      className={`min-w-0 flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all ${
        isActive 
          ? 'border-primary bg-primary text-primary-foreground' 
          : 'border-border bg-background text-foreground hover:border-primary/50'
      } ${isInert ? 'opacity-50' : ''}`}
      {...buttonProps}
      aria-label={`${category.name} 카테고리`}
    >
      <div className="flex flex-col items-center space-y-1">
        <span className="text-lg">{category.emoji}</span>
        <span className="text-xs font-medium">{category.name}</span>
      </div>
    </button>
  );
}));

// BottomSheet 컴포넌트 - 독립적으로 정의 (memo로 최적화)
const BottomSheet = memo(({
  isOpen,
  onClose,
  currentDemo,
  categories,
  bottomSheetRef,
  overlayRef,
}: BottomSheetProps) => {
  // 내부 상태 관리
  const [selectedBadCategory, setSelectedBadCategory] = useState(0);
  const [selectedGoodCategory, setSelectedGoodCategory] = useState(0);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  
  // Swiper 참조
  const badSwiperRef = useRef<SwiperType>();
  const goodSwiperRef = useRef<SwiperType>();
  
  // 카테고리 버튼 ref 배열 - 접근성 적용 버전용
  const categoryButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // 접근성 적용 여부 결정
  const accessible = currentDemo === "good";
  
  // 포커스 관리 함수들 - useCallback으로 최적화
  const handlePrevClick = useCallback(() => {
    const currentSwiperRef = accessible ? goodSwiperRef : badSwiperRef;
    if (!currentSwiperRef.current) return;
    
    // Swiper의 realIndex 대신 React의 상태를 직접 사용
    const currentIndex = accessible ? selectedGoodCategory : selectedBadCategory;
    const currentGroup = Math.floor(currentIndex / 7);
    const targetGroup = currentGroup - 1;
    let targetIndex = targetGroup * 7;
    
    // 루프를 고려하여 인덱스 계산
    if (targetGroup < 0) {
      // 처음에서 이전으로 가면 마지막 그룹으로
      const lastGroup = Math.floor((categories.length - 1) / 7);
      targetIndex = lastGroup * 7;
    }
    
    console.log('Prev - current:', currentIndex, 'current group:', currentGroup, 'target group:', targetGroup, 'final target:', targetIndex);
    
    // 1. Swiper에 즉시 명령 (가장 먼저 실행)
    currentSwiperRef.current.slideToLoop(targetIndex);
    
    // 2. React 상태 업데이트는 잠시 후 실행하여 충돌 방지
    setTimeout(() => {
      if (accessible) {
        setSelectedGoodCategory(targetIndex);
        setCurrentActiveIndex(targetIndex);
        
        // 3. 접근성 적용 버전에서 첫 번째 카테고리 버튼으로 초점 이동
        setTimeout(() => {
          const firstButtonInGroup = categoryButtonRefs.current[targetIndex];
          if (firstButtonInGroup) {
            firstButtonInGroup.focus();
          }
        }, 100);
      } else {
        setSelectedBadCategory(targetIndex);
      }
    }, 50);
  }, [categories.length, selectedGoodCategory, selectedBadCategory, accessible]);

  const handleNextClick = useCallback(() => {
    const currentSwiperRef = accessible ? goodSwiperRef : badSwiperRef;
    if (!currentSwiperRef.current) return;
    
    // Swiper의 realIndex 대신 React의 상태를 직접 사용
    const currentIndex = accessible ? selectedGoodCategory : selectedBadCategory;
    const currentGroup = Math.floor(currentIndex / 7);
    const targetGroup = currentGroup + 1;
    let targetIndex = targetGroup * 7;
    
    // 루프를 고려하여 인덱스 계산
    if (targetIndex >= categories.length) {
      targetIndex = 0; // 마지막 그룹을 넘어가면 처음으로
    }
    
    console.log('Next - current:', currentIndex, 'current group:', currentGroup, 'target group:', targetGroup, 'final target:', targetIndex);
    
    // 1. Swiper에 즉시 명령 (가장 먼저 실행)
    currentSwiperRef.current.slideToLoop(targetIndex);
    
    // 2. React 상태 업데이트는 잠시 후 실행하여 충돌 방지
    setTimeout(() => {
      if (accessible) {
        setSelectedGoodCategory(targetIndex);
        setCurrentActiveIndex(targetIndex);
        
        // 3. 접근성 적용 버전에서 첫 번째 카테고리 버튼으로 초점 이동
        setTimeout(() => {
          const firstButtonInGroup = categoryButtonRefs.current[targetIndex];
          if (firstButtonInGroup) {
            firstButtonInGroup.focus();
          }
        }, 100);
      } else {
        setSelectedBadCategory(targetIndex);
      }
    }, 50);
  }, [categories.length, selectedGoodCategory, selectedBadCategory, accessible]);

  const handleTransitionEnd = useCallback((swiper: SwiperType) => {
    console.log('[onTransitionEnd] Transition End. realIndex:', swiper.realIndex);
    
    // 상태 업데이트 로직 제거 - 이제 클릭 핸들러에서 직접 처리
    // 접근성 미적용 버전에서만 상태 업데이트 (네비게이션 버튼이 없으므로)
    if (currentDemo === "bad") {
      setSelectedBadCategory(swiper.realIndex);
    }
    
    // 접근성 적용 버전은 클릭 핸들러에서 이미 처리되므로 여기서는 로그만 출력
  }, [currentDemo]);

  if (!isOpen) return null;

  const currentCategories = categories;
  const selectedIndex = accessible ? selectedGoodCategory : selectedBadCategory;
  const swiperRef = accessible ? goodSwiperRef : badSwiperRef;

  return createPortal(
    <div className="portal-root">
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={(e) => {
          if (e.target === overlayRef.current) {
            onClose();
          }
        }}
      >
        <div 
          ref={bottomSheetRef}
          className="fixed bottom-0 left-0 right-0 bg-background rounded-t-xl shadow-lg max-h-[50vh] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-title"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 id="category-title" className="text-lg font-semibold">
                카테고리 선택 ({accessible ? '접근성 적용' : '접근성 미적용'})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="카테고리 선택 닫기"
              >
                ✕
              </Button>
            </div>
            
            <div className="relative">
              <Swiper
                key={`${accessible ? 'good' : 'bad'}-carousel`}
                onSwiper={(swiper) => {
                  if (accessible) {
                    goodSwiperRef.current = swiper;
                  } else {
                    badSwiperRef.current = swiper;
                  }
                }}
                modules={[Navigation]}
                spaceBetween={8}
                slidesPerView={7}
                slidesPerGroup={1}
                centeredSlides={false}
                loop={true}
                loopAddBlankSlides={false}
                initialSlide={0}
                observer={true}
                observeParents={true}
                onTransitionEnd={handleTransitionEnd}
                className="category-swiper"
              >
                {currentCategories.map((category, index) => (
                  <SwiperSlide key={category.id}>
                    <CategoryButton 
                      ref={accessible ? (el) => { categoryButtonRefs.current[index] = el; } : undefined}
                      category={category} 
                      isActive={index === selectedIndex} 
                      isInert={accessible && (Math.floor(index / 7) !== Math.floor(selectedIndex / 7))}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* 네비게이션 버튼 */}
              <button
                onClick={handlePrevClick}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border text-foreground p-2 rounded-full transition-all duration-200"
                aria-label="이전 카테고리 그룹"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextClick}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border text-foreground p-2 rounded-full transition-all duration-200"
                aria-label="다음 카테고리 그룹"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <div>
                <span>
                  현재 {selectedIndex + 1}번째 카테고리: {currentCategories[selectedIndex]?.name}
                </span>
                <div className="mt-1 text-xs">
                  그룹 {Math.floor(selectedIndex / 7) + 1} / {Math.ceil(currentCategories.length / 7)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
});

export default function InfiniteCarouselDemoPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<"bad" | "good">("bad");
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const openBottomSheet = (demo: "bad" | "good") => {
    setCurrentDemo(demo);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    // 포커스를 트리거 버튼으로 복원
    setTimeout(() => {
      triggerButtonRef.current?.focus();
    }, 100);
  };

  // 바텀 시트 접근성 처리
  useEffect(() => {
    if (isBottomSheetOpen) {
      // 바텀 시트 외부 콘텐츠를 inert로 설정
      Array.from(document.body.children).forEach(child => {
        if (child !== bottomSheetRef.current?.closest('.portal-root')) {
          child.setAttribute('inert', '');
        }
      });

      // 첫 번째 포커스 가능한 요소에 포커스
      setTimeout(() => {
        const firstFocusable = bottomSheetRef.current?.querySelector('button') as HTMLElement;
        firstFocusable?.focus();
      }, 100);

      // 키보드 이벤트 처리
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeBottomSheet();
          return;
        }

        if (e.key === 'Tab') {
          const focusableElements = bottomSheetRef.current?.querySelectorAll(
            'button:not([disabled])'
          );
          if (!focusableElements || focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // inert 속성 제거
        Array.from(document.body.children).forEach(child => {
          child.removeAttribute('inert');
        });
      };
    }
  }, [isBottomSheetOpen]);

  return (
    <DemoPageLayout 
      title="무한 루프 캐러셀 접근성"
      description="무한 루프 캐러셀은 많은 항목을 효율적으로 보여주지만, 스크린 리더 사용자에게는 현재 위치 파악과 탐색 종료 시점을 알기 어려운 문제가 있습니다."
    >
      <ProblemIntroSection 
        description="쇼핑몰의 카테고리 선택과 같은 무한 루프 캐러셀은 많은 항목을 효율적으로 탐색할 수 있게 해주지만, 스크린 리더 사용자에게는 현재 위치를 파악하기 어렵고 언제 탐색을 멈춰야 할지 알기 어려운 문제가 있습니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad" 
        problemText="일반적인 무한 루프 캐러셀로 시각적으로는 직관적이지만, 스크린 리더 사용자는 현재 위치를 파악하기 어렵고 언제 탐색을 끝내야 할지 알 수 없습니다. 또한 가려진 카테고리들에도 접근할 수 있어 혼란을 야기합니다."
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">쇼핑 카테고리 선택</h4>
          <div className="text-center">
            <Button 
              ref={triggerButtonRef}
              onClick={() => openBottomSheet("bad")}
              className="w-full"
            >
              카테고리 선택하기 (접근성 미적용)
            </Button>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        type="good" 
        solutionText="무한 루프는 유지하되, 현재 위치 정보 제공, 네비게이션 버튼 추가, 그리고 inert로 가려진 영역 접근 차단을 통해 접근성을 개선합니다."
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">쇼핑 카테고리 선택</h4>
          <div className="text-center">
            <Button 
              onClick={() => openBottomSheet("good")}
              className="w-full"
            >
              카테고리 선택하기 (접근성 적용)
            </Button>
          </div>
        </div>
      </ExampleSection>

      <TestGuideSection
        testTitle="스크린 리더로 테스트하기"
        badSteps={[
          { step: "1", description: "보이스오버(iOS) 또는 톡백(Android)을 켜고 카테고리 선택 버튼을 눌러보세요" },
          { step: "2", description: "한 손가락 스와이프로 카테고리들을 탐색해보세요" },
          { step: "3", description: "현재 몇 번째 카테고리인지, 전체가 몇 개인지 파악해보세요" },
          { step: "4", description: "가려진 카테고리들에도 접근되는지 확인해보세요" }
        ]}
        goodSteps={[
          { step: "1", description: "보이스오버(iOS) 또는 톡백(Android)을 켜고 카테고리 선택 버튼을 눌러보세요" },
          { step: "2", description: "네비게이션 버튼으로 카테고리 그룹을 변경해보세요" },
          { step: "3", description: "현재 위치 정보가 음성으로 안내되는지 확인하세요" },
          { step: "4", description: "보이지 않는 카테고리에는 접근되지 않는지 확인하세요" }
        ]}
        badResult="무한 루프로 인해 끝을 알 수 없고, 가려진 카테고리들에도 접근되어 혼란스럽습니다."
        goodResult="현재 위치 정보가 제공되고, 네비게이션 버튼으로 명확한 제어가 가능하며, 보이는 영역에만 접근됩니다."
        additionalNotes={[
          "무한 루프 캐러셀은 많은 항목 탐색에 효율적",
          "하지만 스크린 리더 사용자에게는 혼란스러운 경험 제공",
          "현재 위치 정보와 명확한 네비게이션으로 접근성 개선 가능"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "무한 루프 캐러셀 (접근성 미적용)",
          code: `<Swiper
  spaceBetween={8}
  slidesPerView={7}
  loop={true}
  onSlideChange={(swiper) => setSelectedCategory(swiper.realIndex)}
>
  {categories.map((category, index) => (
    <SwiperSlide key={category.id}>
      <CategoryButton 
        category={category} 
        isActive={index === selectedIndex} 
      />
    </SwiperSlide>
  ))}
</Swiper>

{/* 문제점 */}
{/* - 현재 위치를 알 수 없음 */}
{/* - 무한 루프로 언제 끝날지 모름 */}
{/* - 가려진 카테고리에도 접근 가능 */}
{/* - 키보드 네비게이션 어려움 */}`
        }}
        goodExample={{
          title: "무한 루프 캐러셀 (접근성 적용)",
          code: `<Swiper
  modules={[Navigation]}
  spaceBetween={8}
  slidesPerView={7}
  loop={true}
  onSlideChange={(swiper) => setSelectedCategory(swiper.realIndex)}
>
  {categories.map((category, index) => (
    <SwiperSlide key={category.id}>
      <CategoryButton 
        category={category} 
        isActive={index === selectedIndex}
        isInert={accessible && (Math.floor(index / 7) !== Math.floor(selectedIndex / 7))}
      />
    </SwiperSlide>
  ))}
</Swiper>

{/* 네비게이션 버튼 */}
<button
  onClick={handlePrevClick}
  aria-label="이전 카테고리 그룹"
>
  <ChevronLeft />
</button>

<button
  onClick={handleNextClick}
  aria-label="다음 카테고리 그룹"
>
  <ChevronRight />
</button>

{/* 현재 위치 정보 */}
<div className="mt-4 text-center text-sm text-muted-foreground">
  현재 {selectedIndex + 1}번째 카테고리: {categories[selectedIndex]?.name}
  <div className="mt-1 text-xs">
    그룹 {Math.floor(selectedIndex / 7) + 1} / {Math.ceil(categories.length / 7)}
  </div>
</div>

// 포커스 관리 함수
const handlePrevClick = () => {
  swiperRef.current?.slidePrev();
  
  // 접근성 적용 버전에서만 포커스 이동
  if (accessible) {
    setTimeout(() => {
      const firstVisibleIndex = Math.floor(selectedIndex / 7) * 7;
      categoryButtonRefs.current[firstVisibleIndex]?.focus();
    }, 150);
  }
};

const handleNextClick = () => {
  swiperRef.current?.slideNext();
  
  // 접근성 적용 버전에서만 포커스 이동
  if (accessible) {
    setTimeout(() => {
      const firstVisibleIndex = Math.floor(selectedIndex / 7) * 7;
      categoryButtonRefs.current[firstVisibleIndex]?.focus();
    }, 150);
  }
};`
        }}
        guidelines={[
          "무한 루프 캐러셀에는 현재 위치 정보를 명확히 제공",
          "네비게이션 버튼으로 키보드 접근성 확보",
          "inert 속성으로 가려진 영역의 접근 차단 (접근성 적용 버전에서만)",
          "포커스 관리로 슬라이드 변경 후 첫 번째 보이는 카테고리로 포커스 이동",
          "그룹 단위 페이지네이션으로 현재 위치 파악 용이"
        ]}
      />

      {/* inert 속성 구현 코드 복사 영역 */}
      <DemoSection title="inert 속성 구현 코드" icon={ChevronRight} iconColor="text-green-500">
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">
              아래 코드를 복사하여 Swiper 캐러셀에서 가려진 영역 접근을 차단할 수 있습니다.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                const inertCode = `// CategoryButton 컴포넌트에서 inert 속성 적용
const CategoryButton = memo(forwardRef<HTMLButtonElement, CategoryButtonProps>(({ category, isActive, isInert = false }, ref) => {
  const buttonProps = isInert 
    ? { inert: "" as any } 
    : {};
  
  return (
    <button 
      ref={ref}
      className={\`min-w-0 flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all \${
        isActive 
          ? 'border-primary bg-primary text-primary-foreground' 
          : 'border-border bg-background text-foreground hover:border-primary/50'
      } \${isInert ? 'opacity-50' : ''}\`}
      {...buttonProps}
      aria-label={\`\${category.name} 카테고리\`}
    >
      <div className="flex flex-col items-center space-y-1">
        <span className="text-lg">{category.emoji}</span>
        <span className="text-xs font-medium">{category.name}</span>
      </div>
    </button>
  );
}));

// Swiper에서 사용할 때
<Swiper
  modules={[Navigation]}
  spaceBetween={8}
  slidesPerView={7}
  loop={true}
>
  {categories.map((category, index) => (
    <SwiperSlide key={category.id}>
      <CategoryButton 
        category={category} 
        isActive={index === selectedIndex}
        isInert={accessible && (Math.floor(index / 7) !== Math.floor(selectedIndex / 7))}
      />
    </SwiperSlide>
  ))}
</Swiper>

// TypeScript 타입 정의
interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  isInert?: boolean;
}

/* 핵심 포인트 */
// 1. inert 속성은 HTML 표준이지만 React에서는 타입 에러가 발생
// 2. { inert: "" as any }로 타입 우회
// 3. 접근성 적용 버전에서만 동작하도록 조건부 적용
// 4. 현재 그룹이 아닌 카테고리들에만 inert 적용
// 5. 시각적 피드백을 위해 opacity 조정`;
                
                try {
                  await navigator.clipboard.writeText(inertCode);
                  setCopied(true);
                  toast({
                    title: "코드 복사 완료",
                    description: "inert 속성 구현 코드가 클립보드에 복사되었습니다."
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
            <pre className="whitespace-pre-wrap">{`// CategoryButton 컴포넌트에서 inert 속성 적용
const CategoryButton = memo(forwardRef<HTMLButtonElement, CategoryButtonProps>(({ category, isActive, isInert = false }, ref) => {
  const buttonProps = isInert 
    ? { inert: "" as any } 
    : {};
  
  return (
    <button 
      ref={ref}
      className={\`min-w-0 flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all \${
        isActive 
          ? 'border-primary bg-primary text-primary-foreground' 
          : 'border-border bg-background text-foreground hover:border-primary/50'
      } \${isInert ? 'opacity-50' : ''}\`}
      {...buttonProps}
      aria-label={\`\${category.name} 카테고리\`}
    >
      <div className="flex flex-col items-center space-y-1">
        <span className="text-lg">{category.emoji}</span>
        <span className="text-xs font-medium">{category.name}</span>
      </div>
    </button>
  );
}));

// Swiper에서 사용할 때
<Swiper
  modules={[Navigation]}
  spaceBetween={8}
  slidesPerView={7}
  loop={true}
>
  {categories.map((category, index) => (
    <SwiperSlide key={category.id}>
      <CategoryButton 
        category={category} 
        isActive={index === selectedIndex}
        isInert={accessible && (Math.floor(index / 7) !== Math.floor(selectedIndex / 7))}
      />
    </SwiperSlide>
  ))}
</Swiper>

// TypeScript 타입 정의
interface CategoryButtonProps {
  category: Category;
  isActive: boolean;
  isInert?: boolean;
}

/* 핵심 포인트 */
// 1. inert 속성은 HTML 표준이지만 React에서는 타입 에러가 발생
// 2. { inert: "" as any }로 타입 우회
// 3. 접근성 적용 버전에서만 동작하도록 조건부 적용
// 4. 현재 그룹이 아닌 카테고리들에만 inert 적용
// 5. 시각적 피드백을 위해 opacity 조정`}</pre>
          </div>
        </div>
      </DemoSection>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        currentDemo={currentDemo}
        categories={categories}
        bottomSheetRef={bottomSheetRef}
        overlayRef={overlayRef}
      />
    </DemoPageLayout>
  );
}