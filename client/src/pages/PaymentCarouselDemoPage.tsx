import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

export default function PaymentCarouselDemoPage() {
  const [selectedBadCard, setSelectedBadCard] = useState(0);
  const [selectedGoodCard, setSelectedGoodCard] = useState(0);
  const badSwiperRef = useRef<SwiperType>();
  const goodSwiperRef = useRef<SwiperType>();

  const paymentCards = [
    { id: 1, name: "신한카드", number: "**** **** **** 1234", type: "VISA" },
    { id: 2, name: "KB국민카드", number: "**** **** **** 5678", type: "MasterCard" },
    { id: 3, name: "우리카드", number: "**** **** **** 9012", type: "VISA" },
    { id: 4, name: "하나카드", number: "**** **** **** 3456", type: "MasterCard" },
    { id: 5, name: "삼성카드", number: "**** **** **** 7890", type: "VISA" }
  ];

  const problemList = [
    "모바일에서 이전/다음 버튼이 화면 공간을 과도하게 차지",
    "버튼이 콘텐츠와 겹쳐서 시각적으로 부자연스러움",
    "터치 기반 환경에서 불필요한 UI 요소로 인한 혼란",
    "비활성 슬라이드에서 포커스 가능한 요소들이 접근 가능"
  ];

  const PaymentCard = ({ card, isActive, isInert = false }: { card: typeof paymentCards[0], isActive: boolean, isInert?: boolean }) => (
    <div 
      className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white min-h-[120px] ${isActive ? 'ring-2 ring-white' : ''} ${isInert ? 'opacity-70' : ''}`} 
      {...(isInert && { inert: true })}
      tabIndex={isInert ? -1 : 0}
      role="button"
      aria-label={`${card.name} 결제 카드 선택`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="text-sm opacity-80">{card.name}</div>
        <div className="text-xs bg-white/20 px-2 py-1 rounded">{card.type}</div>
      </div>
      <div className="text-lg font-mono mb-2">{card.number}</div>
      <div className="text-xs opacity-80">결제 카드</div>
    </div>
  );

  return (
    <DemoPageLayout 
      title="캐러셀에 버튼 추가"
      description="모바일 환경에서 캐러셀 내비게이션 버튼의 디자인과 접근성을 고려한 구현 방법을 비교해보세요."
    >
      <ProblemIntroSection 
        description="모바일에서 캐러셀을 사용할 때 이전/다음 버튼의 배치와 접근성 처리가 중요합니다. 스와이프 기능은 일반 사용자에게 직관적이지만, 접근성이 필요한 사용자를 위한 대체 수단도 제공해야 합니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad" 
        problemText="큰 버튼이 화면 공간을 차지하고 콘텐츠와 겹쳐서 사용성을 해칩니다. 또한 비활성 슬라이드의 요소들에도 접근할 수 있어 혼란을 야기합니다."
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
            
            {/* 큰 버튼들이 콘텐츠 위에 겹침 */}
            <button
              onClick={() => badSwiperRef.current?.slidePrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              aria-label="이전 카드"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => badSwiperRef.current?.slideNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
              aria-label="다음 카드"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
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
        solutionText="미니멀한 버튼으로 시각적 방해를 최소화하고, inert 속성으로 비활성 슬라이드의 접근성을 제한하여 사용자 경험을 개선합니다."
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">결제 수단 선택</h4>
          <div className="relative">
            <Swiper
              onBeforeInit={(swiper) => {
                goodSwiperRef.current = swiper;
              }}
              modules={[Navigation, A11y]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              onSlideChange={(swiper) => setSelectedGoodCard(swiper.activeIndex)}
              a11y={{
                prevSlideMessage: '이전 결제 수단',
                nextSlideMessage: '다음 결제 수단',
              }}
              className="payment-swiper-good"
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
            
            {/* 미니멀한 버튼들 */}
            <button
              onClick={() => goodSwiperRef.current?.slidePrev()}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-all duration-200 opacity-60 hover:opacity-100"
              aria-label="이전 결제 수단"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => goodSwiperRef.current?.slideNext()}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-all duration-200 opacity-60 hover:opacity-100"
              aria-label="다음 결제 수단"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <Button className="w-full">
              {paymentCards[selectedGoodCard].name}로 결제하기
            </Button>
          </div>
        </div>
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1", description: "Tab 키를 눌러 각 결제 카드로 포커스 이동해보세요" },
          { step: "2", description: "모든 카드(활성/비활성)에 접근 가능한지 확인하세요" },
          { step: "3", description: "큰 버튼들이 카드 내용과 겹치는지 확인하세요" }
        ]}
        goodSteps={[
          { step: "1", description: "Tab 키를 눌러 결제 카드로 포커스 이동해보세요" },
          { step: "2", description: "활성 카드(흰색 테두리)만 포커스되는지 확인하세요" },
          { step: "3", description: "비활성 카드들이 반투명하고 접근 불가한지 확인하세요" }
        ]}
        badResult="모든 카드에 Tab으로 접근할 수 있어 키보드 사용자가 혼란스러울 수 있고, 큰 버튼이 시각적으로 방해됩니다."
        goodResult="활성 카드만 Tab으로 접근 가능하고, 미니멀한 버튼으로 깔끔한 디자인을 유지합니다."
        additionalNotes={[
          "모바일에서는 스와이프가 주요 상호작용 방식입니다",
          "버튼은 접근성을 위한 보조 수단으로 제공되어야 합니다",
          "inert 속성으로 비활성 콘텐츠의 접근을 제한할 수 있습니다"
        ]}
      />

      <CodeExampleSection
        badExample={{
          title: "접근성 미적용",
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

{/* 큰 버튼들이 콘텐츠 위에 겹침 */}
<button className="absolute left-2 top-1/2 bg-black/60 p-3 rounded-full">
  <ChevronLeft className="w-6 h-6" />
</button>`
        }}
        goodExample={{
          title: "접근성 적용",
          code: `<Swiper
  modules={[Navigation, A11y]}
  spaceBetween={16}
  slidesPerView={1.2}
  centeredSlides={true}
  a11y={{
    prevSlideMessage: '이전 결제 수단',
    nextSlideMessage: '다음 결제 수단',
  }}
>
  {cards.map((card, index) => (
    <SwiperSlide key={card.id}>
      <div {...(index !== activeIndex && { inert: true })}>
        <PaymentCard card={card} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

{/* 미니멀한 버튼들 */}
<button className="absolute left-1 top-1/2 bg-black/20 p-1.5 rounded-full opacity-60">
  <ChevronLeft className="w-3 h-3" />
</button>`
        }}
        guidelines={[
          "Swiper의 A11y 모듈을 사용하여 스크린 리더 지원",
          "inert 속성으로 비활성 슬라이드의 접근성 제한",
          "미니멀한 버튼 디자인으로 시각적 방해 최소화",
          "적절한 aria-label로 버튼의 목적 명시",
          "호버 효과로 버튼의 상호작용성 표현"
        ]}
      />
    </DemoPageLayout>
  );
}