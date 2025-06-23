import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function PaymentCarouselDemoPage() {
  useDocumentTitle("모바일 캐러셀 접근성");
  
  const [selectedBadCard, setSelectedBadCard] = useState(0);
  const [selectedGoodCard, setSelectedGoodCard] = useState(0);
  const [ariaLive, setAriaLive] = useState<"off" | "polite">("off");
  const badSwiperRef = useRef<SwiperType>();
  const goodSwiperRef = useRef<SwiperType>();
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // 포커스 관리 함수들
  const handlePrevClick = () => {
    setAriaLive("polite");
    goodSwiperRef.current?.slidePrev();
    setTimeout(() => setAriaLive("off"), 1000);
    
    // 첫 번째 카드로 이동하면 이전 버튼이 사라지므로 다음 버튼에 포커스
    if (selectedGoodCard === 1 && nextButtonRef.current) {
      setTimeout(() => {
        nextButtonRef.current?.focus();
      }, 100);
    }
  };

  const handleNextClick = () => {
    setAriaLive("polite");
    goodSwiperRef.current?.slideNext();
    setTimeout(() => setAriaLive("off"), 1000);
    
    // 마지막 카드로 이동하면 다음 버튼이 사라지므로 이전 버튼에 포커스
    if (selectedGoodCard === paymentCards.length - 2 && prevButtonRef.current) {
      setTimeout(() => {
        prevButtonRef.current?.focus();
      }, 100);
    }
  };

  const paymentCards = [
    { id: 1, name: "신한카드", number: "**** **** **** 1234", type: "VISA" },
    { id: 2, name: "KB국민카드", number: "**** **** **** 5678", type: "MasterCard" },
    { id: 3, name: "우리카드", number: "**** **** **** 9012", type: "VISA" },
    { id: 4, name: "하나카드", number: "**** **** **** 3456", type: "MasterCard" },
    { id: 5, name: "삼성카드", number: "**** **** **** 7890", type: "VISA" }
  ];

  const problemList = [
    "모바일 캐러셀에서 일반적으로 버튼을 제공하지 않음",
    "스크린 리더 사용자가 슬라이드를 넘길 방법이 없음",
    "손목이나 손가락에 제약이 있는 사용자가 스와이프하기 어려움",
    "가려진 슬라이드의 콘텐츠에도 접근할 수 있어 혼란 야기"
  ];

  const PaymentCard = ({ card, isActive, isInert = false }: { card: typeof paymentCards[0], isActive: boolean, isInert?: boolean }) => {
    const cardProps = isInert 
      ? { inert: "" as any } 
      : {};
    
    return (
      <div 
        className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white min-h-[120px] ${isActive ? 'ring-2 ring-white' : ''} ${isInert ? 'opacity-70' : ''}`} 
        {...cardProps}
        aria-label={`${card.name} 결제 카드`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="text-sm opacity-80">{card.name}</div>
          <div className="text-xs bg-white/20 px-2 py-1 rounded">{card.type}</div>
        </div>
        <div className="text-lg font-mono mb-2">{card.number}</div>
        <div className="text-xs opacity-80">결제 카드</div>
      </div>
    );
  };

  return (
    <DemoPageLayout 
      title="모바일 캐러셀 접근성"
      description="모바일 캐러셀에서는 일반적으로 스와이프만 제공하고 버튼을 두지 않습니다. 하지만 이렇게 되면 스크린 리더 사용자나 손이 불편한 사용자는 슬라이드를 넘길 수 없는 문제가 발생합니다."
    >
      <ProblemIntroSection 
        description="모바일 캐러셀에서는 깔끔한 UI를 위해 일반적으로 버튼을 두지 않고 스와이프만 제공합니다. 하지만 이런 접근법은 스크린 리더 사용자나 손이 불편한 사용자를 배제하는 문제가 있습니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad" 
        problemText="모바일에서 일반적인 캐러셀 구현으로 깔끔하고 직관적입니다. 하지만 스크린 리더 사용자나 손이 불편한 사용자는 슬라이드를 넘길 방법이 없고, 가려진 슬라이드에도 접근할 수 있어 혼란을 야기합니다."
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">결제 수단 선택</h4>
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                badSwiperRef.current = swiper;
              }}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              onSlideChange={(swiper) => setSelectedBadCard(swiper.activeIndex)}
              className="payment-swiper-bad"
            >
              {paymentCards.map((card, index) => (
                <SwiperSlide key={card.id}>
                  <PaymentCard card={card} isActive={index === selectedBadCard} />
                </SwiperSlide>
              ))}
            </Swiper>
            

          </div>
          
          <div className="mt-4 text-center">
            <Button className="w-full">
              {paymentCards[selectedBadCard].name}로 결제하기
            </Button>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        type="good" 
        solutionText="스와이프 기능은 그대로 유지하면서, 스크린 리더와 손이 불편한 사용자를 위해 미니멀한 버튼을 추가합니다. aria-live로 변경사항을 알리고, inert로 가려진 슬라이드 접근을 차단합니다."
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">결제 수단 선택</h4>
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                goodSwiperRef.current = swiper;
              }}
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              onSlideChange={(swiper) => setSelectedGoodCard(swiper.activeIndex)}
              a11y={false}
              className="payment-swiper-good"
              aria-live={ariaLive}
              aria-label="결제 수단 캐러셀"
            >
              {paymentCards.map((card, index) => (
                <SwiperSlide key={card.id}>
                  <PaymentCard 
                    card={card} 
                    isActive={index === selectedGoodCard} 
                    isInert={index !== selectedGoodCard}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* 조건부 미니멀한 버튼들 */}
            {selectedGoodCard > 0 && (
              <button
                ref={prevButtonRef}
                onClick={handlePrevClick}
                className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-all duration-200 opacity-60 hover:opacity-100"
                aria-label="이전 결제 수단"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
            )}
            {selectedGoodCard < paymentCards.length - 1 && (
              <button
                ref={nextButtonRef}
                onClick={handleNextClick}
                className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-all duration-200 opacity-60 hover:opacity-100"
                aria-label="다음 결제 수단"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Button className="w-full">
              {paymentCards[selectedGoodCard].name}로 결제하기
            </Button>
          </div>
        </div>
      </ExampleSection>

      <TestGuideSection
        testTitle="스크린 리더로 테스트하기"
        badSteps={[
          { step: "1", description: "보이스오버(iOS) 또는 톡백(Android)을 켜고 한 손가락 스와이프로 탐색해보세요" },
          { step: "2", description: "캐러셀에서 다른 카드로 이동할 방법을 시도해보세요" },
          { step: "3", description: "가려진 카드의 내용이 읽히는지 확인해보세요" }
        ]}
        goodSteps={[
          { step: "1", description: "보이스오버(iOS) 또는 톡백(Android)을 켜고 한 손가락 스와이프로 탐색해보세요" },
          { step: "2", description: "미니멀한 이전/다음 버튼을 통해 카드를 변경해보세요" },
          { step: "3", description: "카드 변경 시 변경사항이 스크린 리더로 안내되는지 확인하세요" }
        ]}
        badResult="모든 결제 카드(가려진 카드들 포함)가 다 접근되지만, 정작 다른 카드로 변경할 방법이 없습니다."
        goodResult="버튼을 통해 카드 변경이 가능하고, 현재 보이는 카드에만 접근하도록 제한됩니다."
        additionalNotes={[
          "모바일 캐러셀은 일반적으로 버튼 없이 깔끔하게 구현",
          "하지만 이런 접근법은 일부 사용자를 배제하는 문제 존재",
          "미니멀한 버튼 추가로 모든 사용자를 포용하는 설계 가능"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "스와이프 전용",
          code: `<Swiper
  spaceBetween={16}
  slidesPerView={1.2}
  centeredSlides={true}
>
  {cards.map((card) => (
    <SwiperSlide key={card.id}>
      <PaymentCard card={card} />
    </SwiperSlide>
  ))}
</Swiper>

{/* 장점: 깔끔한 UI, 직관적 스와이프 */}
{/* 단점: 스크린 리더, 손 불편한 사용자 배제 */}`
        }}
        goodExample={{
          title: "스와이프 + 조건부 접근성 버튼",
          code: `<Swiper
  modules={[Navigation]}
  spaceBetween={16}
  slidesPerView={1.2}
  centeredSlides={true}
  a11y={false}
  aria-live={ariaLive}
  aria-label="결제 수단 캐러셀"
>
  {cards.map((card, index) => (
    <SwiperSlide key={card.id}>
      <div {...(index !== activeIndex && { inert: true })}>
        <PaymentCard card={card} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

{/* 조건부 미니멀 버튼들 */}
{selectedIndex > 0 && (
  <button 
    ref={prevButtonRef}
    onClick={() => {
      setAriaLive("polite");
      swiperRef.current?.slidePrev();
      setTimeout(() => setAriaLive("off"), 1000);
    }}
    className="absolute left-1 top-1/2 bg-black/20 p-1.5 rounded-full opacity-60"
    aria-label="이전 결제 수단"
  >
    <ChevronLeft className="w-3 h-3" />
  </button>
)}
{selectedIndex < cards.length - 1 && (
  <button 
    ref={nextButtonRef}
    onClick={() => {
      setAriaLive("polite");
      swiperRef.current?.slideNext();
      setTimeout(() => setAriaLive("off"), 1000);
    }}
    className="absolute right-1 top-1/2 bg-black/20 p-1.5 rounded-full opacity-60"
    aria-label="다음 결제 수단"
  >
    <ChevronRight className="w-3 h-3" />
  </button>
)}

// 포커스 관리를 포함한 클릭 핸들러
const handlePrevClick = () => {
  setAriaLive("polite");
  swiperRef.current?.slidePrev();
  setTimeout(() => setAriaLive("off"), 1000);
  
  // 첫 번째 카드로 이동하면 이전 버튼이 사라지므로 다음 버튼에 포커스
  if (selectedIndex === 1 && nextButtonRef.current) {
    setTimeout(() => nextButtonRef.current?.focus(), 100);
  }
};

const handleNextClick = () => {
  setAriaLive("polite");
  swiperRef.current?.slideNext();
  setTimeout(() => setAriaLive("off"), 1000);
  
  // 마지막 카드로 이동하면 다음 버튼이 사라지므로 이전 버튼에 포커스
  if (selectedIndex === cards.length - 2 && prevButtonRef.current) {
    setTimeout(() => prevButtonRef.current?.focus(), 100);
  }
};

{/* 장점: 조건부 버튼으로 논리적 탐색 + 포커스 관리 */}
{/* 스와이프: 일반 사용자, 조건부 버튼: 접근성 사용자 */}`
        }}
        guidelines={[
          "모바일 기본: 깔끔한 UI를 위해 스와이프만 제공",
          "접근성 개선: 스크린 리더와 손이 불편한 사용자를 위한 조건부 버튼 추가",
          "논리적 탐색: 첫 번째 카드에서 이전 버튼, 마지막 카드에서 다음 버튼 숨김",
          "포커스 관리: 클릭 핸들러에서 다음 상태를 예측하여 포커스 이동 처리",
          "타이밍 제어: 100ms 지연으로 DOM 업데이트 완료 후 포커스 이동 보장",
          "aria-live로 버튼 사용시에만 변경사항 음성 안내",
          "inert로 가려진 슬라이드 접근 차단하여 혼란 방지",
          "일반 사용자와 접근성 사용자 모두를 고려한 설계"
        ]}
      />
    </DemoPageLayout>
  );
}