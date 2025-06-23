import { useState, useRef } from "react";
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

export default function PaymentCarouselDemoPage() {
  const [selectedBadCard, setSelectedBadCard] = useState(0);
  const [selectedGoodCard, setSelectedGoodCard] = useState(0);
  const [ariaLive, setAriaLive] = useState<"off" | "polite">("off");
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
    "스와이프만으로는 키보드 사용자가 캐러셀을 조작할 수 없음",
    "스크린 리더 사용자에게 캐러셀 변경 사항이 전달되지 않음",
    "손목이나 손가락에 제약이 있는 사용자가 스와이프하기 어려움",
    "접근성 도구 없이는 캐러셀이 단순한 정적 콘텐츠로만 인식됨"
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
      title="캐러셀에 버튼 추가"
      description="모바일 환경에서 캐러셀 내비게이션 버튼의 디자인과 접근성을 고려한 구현 방법을 비교해보세요."
    >
      <ProblemIntroSection 
        description="모바일에서 캐러셀을 사용할 때 이전/다음 버튼의 배치와 접근성 처리가 중요합니다. 스와이프 기능은 일반 사용자에게 직관적이지만, 접근성이 필요한 사용자를 위한 대체 수단도 제공해야 합니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad" 
        problemText="모바일에서는 스와이프가 직관적이고 자연스러운 상호작용 방식입니다. 버튼이 없어도 사용에 문제가 없지만, 접근성이 필요한 사용자를 위한 대안이 제공되지 않습니다."
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
        solutionText="기본 스와이프 기능은 유지하면서, 접근성이 필요한 사용자를 위해 미니멀한 버튼을 추가합니다. aria-live 속성과 inert로 적절한 접근성을 제공합니다."
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
            
            {/* 미니멀한 버튼들 */}
            <button
              onClick={() => {
                setAriaLive("polite");
                goodSwiperRef.current?.slidePrev();
                setTimeout(() => setAriaLive("off"), 1000);
              }}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-all duration-200 opacity-60 hover:opacity-100"
              aria-label="이전 결제 수단"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                setAriaLive("polite");
                goodSwiperRef.current?.slideNext();
                setTimeout(() => setAriaLive("off"), 1000);
              }}
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
          { step: "1", description: "캐러셀을 스와이프하여 카드를 변경해보세요" },
          { step: "2", description: "Tab 키로 키보드 탐색을 시도해보세요" },
          { step: "3", description: "스크린 리더로 캐러셀 변경을 확인해보세요" }
        ]}
        goodSteps={[
          { step: "1", description: "캐러셀을 스와이프하여 카드를 변경해보세요" },
          { step: "2", description: "미니멀한 이전/다음 버튼을 클릭해보세요" },
          { step: "3", description: "Tab 키로 활성 카드만 접근되는지 확인하세요" }
        ]}
        badResult="스와이프는 완벽하게 작동하지만, 키보드나 스크린 리더 사용자는 캐러셀을 조작할 방법이 없습니다."
        goodResult="스와이프와 버튼 모두 사용 가능하며, 접근성 도구로도 원활하게 조작할 수 있습니다."
        additionalNotes={[
          "모바일에서 스와이프는 가장 직관적인 상호작용 방식",
          "접근성 버튼은 필수가 아닌 '추가 지원'의 개념",
          "두 방식이 서로 간섭하지 않도록 설계하는 것이 핵심"
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
{/* 단점: 접근성 도구 지원 부족 */}`
        }}
        goodExample={{
          title: "스와이프 + 접근성 버튼",
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

{/* 접근성을 위한 미니멀 버튼 */}
<button 
  onClick={() => {
    setAriaLive("polite");
    swiperRef.current?.slidePrev();
    setTimeout(() => setAriaLive("off"), 1000);
  }}
  className="absolute left-1 top-1/2 bg-black/20 p-1.5 rounded-full opacity-60"
>
  <ChevronLeft className="w-3 h-3" />
</button>

{/* 장점: 모든 사용자 지원 */}
{/* 스와이프: 직관적, 버튼: 접근성 */}`
        }}
        guidelines={[
          "1단계: 스와이프 기능으로 기본 사용성 확보",
          "2단계: 접근성이 필요한 사용자를 위한 미니멀 버튼 추가",
          "aria-live 동적 제어로 필요할 때만 음성 안내",
          "inert로 비활성 슬라이드 접근 제한하여 혼란 방지",
          "모바일 우선 + 포용적 디자인의 균형점 찾기"
        ]}
      />
    </DemoPageLayout>
  );
}