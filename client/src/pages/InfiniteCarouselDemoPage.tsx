import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { createPortal } from 'react-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

export default function InfiniteCarouselDemoPage() {
  
  const [selectedBadCategory, setSelectedBadCategory] = useState(0);
  const [selectedGoodCategory, setSelectedGoodCategory] = useState(0);
  const [ariaLive, setAriaLive] = useState<"off" | "polite">("off");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<"bad" | "good">("bad");
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const badSwiperRef = useRef<SwiperType>();
  const goodSwiperRef = useRef<SwiperType>();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  // 15개 쇼핑몰 카테고리 (무한 루프를 위해 여러 세트 생성)
  const baseCategories = [
    "식품", "생필품", "패션", "뷰티", "가전", "가구", "스포츠", "문구",
    "반려동물", "건강", "육아", "도서", "취미", "자동차", "여행"
  ];

  // 무한 루프를 위해 카테고리를 30번 반복 (총 450개) - Swiper 안정적 동작을 위해
  const categories = Array.from({ length: 30 }, (_, setIndex) => 
    baseCategories.map((category, index) => ({
      id: setIndex * baseCategories.length + index,
      name: category,
      emoji: getEmojiForCategory(category)
    }))
  ).flat();

  function getEmojiForCategory(category: string): string {
    const emojiMap: Record<string, string> = {
      "식품": "🍎", "생필품": "🧴", "패션": "👗", "뷰티": "💄", "가전": "📱",
      "가구": "🪑", "스포츠": "⚽", "문구": "📝", "반려동물": "🐕", "건강": "💊",
      "육아": "👶", "도서": "📚", "취미": "🎨", "자동차": "🚗", "여행": "✈️"
    };
    return emojiMap[category] || "🏷️";
  }

  const problemList = [
    "무한 루프 캐러셀에서 스크린 리더 사용자가 끝을 알 수 없음",
    "현재 위치나 전체 항목 수를 파악하기 어려움", 
    "가려진 카테고리 버튼들에도 접근 가능해 혼란 야기",
    "키보드로 탐색할 때 무한히 순환하여 탈출하기 어려움"
  ];

  // 포커스 관리 함수들 (Good 버전용)
  const handlePrevClick = () => {
    if (!goodSwiperRef.current) return;
    
    setAriaLive("polite");
    
    // 현재 realIndex에서 7개 그룹 이전으로 이동
    const currentRealIndex = goodSwiperRef.current.realIndex;
    const baseCategories = 15; // 기본 카테고리 수
    const currentGroup = Math.floor((currentRealIndex % baseCategories) / 7);
    const prevGroup = currentGroup > 0 ? currentGroup - 1 : Math.floor((baseCategories - 1) / 7);
    const targetIndex = prevGroup * 7;
    
    goodSwiperRef.current.slideTo(targetIndex);
    
    setTimeout(() => setAriaLive("off"), 1000);
    
    // 포커스를 첫 번째 보이는 카테고리 버튼으로 이동
    setTimeout(() => {
      const activeSlide = bottomSheetRef.current?.querySelector('.swiper-slide-active');
      const firstVisibleButton = activeSlide?.querySelector('button') as HTMLElement;
      firstVisibleButton?.focus();
    }, 300);
  };

  const handleNextClick = () => {
    if (!goodSwiperRef.current) return;
    
    setAriaLive("polite");
    
    // 현재 realIndex에서 7개 그룹 다음으로 이동
    const currentRealIndex = goodSwiperRef.current.realIndex;
    const baseCategories = 15; // 기본 카테고리 수
    const currentGroup = Math.floor((currentRealIndex % baseCategories) / 7);
    const totalGroups = Math.ceil(baseCategories / 7);
    const nextGroup = currentGroup < totalGroups - 1 ? currentGroup + 1 : 0;
    const targetIndex = nextGroup * 7;
    
    goodSwiperRef.current.slideTo(targetIndex);
    
    setTimeout(() => setAriaLive("off"), 1000);
    
    // 포커스를 첫 번째 보이는 카테고리 버튼으로 이동
    setTimeout(() => {
      const activeSlide = bottomSheetRef.current?.querySelector('.swiper-slide-active');
      const firstVisibleButton = activeSlide?.querySelector('button') as HTMLElement;
      firstVisibleButton?.focus();
    }, 300);
  };

  const openBottomSheet = (demo: "bad" | "good") => {
    setCurrentDemo(demo);
    setCurrentActiveIndex(0); // 활성 인덱스 초기화
    setSelectedBadCategory(0);
    setSelectedGoodCategory(0);
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

  const CategoryButton = ({ category, isActive, isInert = false }: { 
    category: typeof categories[0], 
    isActive: boolean, 
    isInert?: boolean 
  }) => {
    const buttonProps = isInert 
      ? { inert: "" as any } 
      : {};
    
    return (
      <button 
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
  };

  const BottomSheet = () => {
    if (!isBottomSheetOpen) return null;

    const accessible = currentDemo === "good";
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
              closeBottomSheet();
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
                  onClick={closeBottomSheet}
                  aria-label="카테고리 선택 닫기"
                >
                  ✕
                </Button>
              </div>
              
              <div className="relative">
                <Swiper
                  key={`${accessible ? 'good' : 'bad'}-${isBottomSheetOpen}`}
                  onBeforeInit={(swiper) => {
                    if (accessible) {
                      goodSwiperRef.current = swiper;
                    } else {
                      badSwiperRef.current = swiper;
                    }
                  }}
                  onInit={(swiper) => {
                    // 초기화 후 첫 번째 슬라이드로 이동
                    swiper.slideTo(0, 0);
                  }}
                  modules={accessible ? [Navigation] : []}
                  spaceBetween={8}
                  slidesPerView={7}
                  slidesPerGroup={1}
                  centeredSlides={false}
                  loop={true}
                  loopAdditionalSlides={30} // 추가 슬라이드 수 설정
                  onSlideChange={(swiper) => {
                    if (accessible) {
                      setSelectedGoodCategory(swiper.realIndex);
                    } else {
                      setSelectedBadCategory(swiper.realIndex);
                    }
                  }}
                  a11y={false}
                  className="category-swiper"
                  aria-live={accessible ? ariaLive : "off"}
                  aria-label={accessible ? "카테고리 목록" : undefined}
                >
                  {currentCategories.map((category, index) => (
                    <SwiperSlide key={category.id}>
                      <CategoryButton 
                        category={category} 
                        isActive={index === selectedIndex} 
                        isInert={accessible && (Math.floor((index % 15) / 7) !== Math.floor((selectedIndex % 15) / 7))}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* 접근성 적용 버전에만 네비게이션 버튼 표시 */}
                {accessible && (
                  <>
                    <button
                      ref={prevButtonRef}
                      onClick={handlePrevClick}
                      className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border text-foreground p-2 rounded-full transition-all duration-200"
                      aria-label="이전 카테고리 그룹"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      ref={nextButtonRef}
                      onClick={handleNextClick}
                      className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border border-border text-foreground p-2 rounded-full transition-all duration-200"
                      aria-label="다음 카테고리 그룹"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {accessible ? (
                  <div>
                    <span aria-live="polite">
                      현재 {selectedIndex + 1}번째 카테고리: {currentCategories[selectedIndex]?.name}
                    </span>
                    <div className="mt-1 text-xs">
                      그룹 {Math.floor((selectedIndex % 15) / 7) + 1} / {Math.ceil(15 / 7)}
                    </div>
                  </div>
                ) : (
                  <span>
                    선택된 카테고리: {currentCategories[selectedIndex]?.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

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
        solutionText="무한 루프는 유지하되, 현재 위치 정보 제공, aria-live로 변경사항 안내, 네비게이션 버튼 추가, 그리고 inert로 가려진 영역 접근 차단을 통해 접근성을 개선합니다."
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
  a11y={{
    prevSlideMessage: '이전 카테고리 그룹',
    nextSlideMessage: '다음 카테고리 그룹',
  }}
  aria-live={ariaLive}
  aria-label="카테고리 목록"
>
  {categories.map((category, index) => (
    <SwiperSlide key={category.id}>
      <CategoryButton 
        category={category} 
        isActive={index === selectedIndex}
        isInert={Math.floor(index / 7) !== Math.floor(selectedIndex / 7)}
      />
    </SwiperSlide>
  ))}
</Swiper>

{/* 네비게이션 버튼 */}
<button
  onClick={() => {
    setAriaLive("polite");
    swiperRef.current?.slidePrev();
    setTimeout(() => setAriaLive("off"), 1000);
    
    // 첫 번째 보이는 카테고리로 포커스 이동
    setTimeout(() => {
      const firstVisible = container.querySelector('.swiper-slide-active button');
      firstVisible?.focus();
    }, 150);
  }}
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
<div aria-live="polite">
  현재 {selectedIndex + 1}번째 카테고리: {categories[selectedIndex]?.name}
</div>

// 포커스 관리
const handleNextClick = () => {
  setAriaLive("polite");
  swiperRef.current?.slideNext();
  setTimeout(() => setAriaLive("off"), 1000);
  
  // 갱신된 첫 번째 요소로 포커스 이동
  setTimeout(() => {
    const firstVisibleButton = container.querySelector('.swiper-slide-active button');
    firstVisibleButton?.focus();
  }, 150);
};`
        }}
        guidelines={[
          "무한 루프 캐러셀에는 현재 위치 정보를 명확히 제공",
          "aria-live로 슬라이드 변경사항을 스크린 리더에 안내",
          "네비게이션 버튼으로 키보드 접근성 확보",
          "inert 속성으로 가려진 영역의 접근 차단",
          "포커스 관리로 슬라이드 변경 후 적절한 요소에 포커스 이동"
        ]}
      />

      <BottomSheet />
    </DemoPageLayout>
  );
}