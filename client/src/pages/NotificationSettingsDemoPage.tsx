import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import DemoSection from "@/components/demo/DemoSection";
import ExampleSection from "@/components/demo/ExampleSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDocumentTitle } from "@/hooks/use-document-title";

type NotificationOption = "all" | "important" | "none";

const notificationLabels = {
  all: "모든 알림 받기",
  important: "중요 알림만 받기", 
  none: "알림 끄기"
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (option: NotificationOption) => void;
  currentSetting: NotificationOption;
  accessible: boolean;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

function BottomSheet({ isOpen, onClose, onConfirm, currentSetting, accessible, triggerRef }: BottomSheetProps) {
  const [selectedOption, setSelectedOption] = useState<NotificationOption>(currentSetting);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const originalActiveElementRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      originalActiveElementRef.current = document.activeElement;
      setSelectedOption(currentSetting);

      if (accessible) {
        // Focus management for accessible version
        setTimeout(() => {
          cancelButtonRef.current?.focus();
        }, 100);

        // Add inert to background content
        const portalRoot = document.getElementById('notification-portal-root');
        Array.from(document.body.children).forEach(child => {
          if (child !== portalRoot) {
            child.setAttribute('inert', 'true');
          }
        });

        // Focus trap
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            onClose();
            return;
          }

          if (e.key === 'Tab') {
            const focusableElements = bottomSheetRef.current?.querySelectorAll(
              'button, input[type="radio"]'
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
          // Remove inert from background content
          Array.from(document.body.children).forEach(child => {
            child.removeAttribute('inert');
          });
          
          // Restore focus to trigger button
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
        };
      }
    }
  }, [isOpen, accessible, onClose, triggerRef, currentSetting]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedOption);
  };

  const handleRadioChange = (option: NotificationOption) => {
    setSelectedOption(option);
  };

  if (!isOpen) return null;

  const content = (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 z-50 flex items-end"
      onClick={handleOverlayClick}
    >
      <AnimatePresence>
        <motion.div
          ref={bottomSheetRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full bg-background rounded-t-lg shadow-lg"
          role={accessible ? "dialog" : undefined}
          aria-modal={accessible ? "true" : undefined}
          aria-labelledby={accessible ? "bottom-sheet-title" : undefined}
        >
          <div className="p-6">
            {accessible ? (
              <h2 id="bottom-sheet-title" className="text-lg font-semibold mb-4">
                알림 받기
              </h2>
            ) : (
              <div className="text-lg font-semibold mb-4">
                알림 받기
              </div>
            )}

            <div className="space-y-3 mb-6">
              {(['all', 'important', 'none'] as NotificationOption[]).map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'
                  }`}
                >
                  <input
                    type="radio"
                    name="notification"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleRadioChange(option)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {selectedOption === option && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{notificationLabels[option]}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button
                ref={cancelButtonRef}
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                ref={confirmButtonRef}
                onClick={handleConfirm}
                className="flex-1"
              >
                확인
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  // Create portal root if it doesn't exist
  let portalRoot = document.getElementById('notification-portal-root');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'notification-portal-root';
    document.body.appendChild(portalRoot);
  }

  return createPortal(content, portalRoot);
}

export default function NotificationSettingsDemoPage() {
  useDocumentTitle("알림 설정 바텀 시트 데모");
  
  const [currentSetting, setCurrentSetting] = useState<NotificationOption>("all");
  const [isAccessibleSheetOpen, setIsAccessibleSheetOpen] = useState(false);
  const [isInaccessibleSheetOpen, setIsInaccessibleSheetOpen] = useState(false);
  
  const accessibleButtonRef = useRef<HTMLButtonElement>(null);
  const inaccessibleButtonRef = useRef<HTMLButtonElement>(null);
  
  const { toast } = useToast();

  const handleConfirm = (option: NotificationOption) => {
    setCurrentSetting(option);
    setIsAccessibleSheetOpen(false);
    setIsInaccessibleSheetOpen(false);
    
    toast({
      title: "알림 설정이 변경되었습니다.",
      description: `${notificationLabels[option]}로 설정되었습니다.`,
    });
  };

  const badCode = `// 접근성이 적용되지 않은 바텀 시트
function BadBottomSheet({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="fixed bottom-0 w-full bg-white rounded-t-lg">
        <div className="p-6">
          <div className="text-lg font-semibold mb-4">
            알림 받기
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <input type="radio" name="notification" />
              <span>모든 알림 받기</span>
            </div>
            {/* 기타 옵션들... */}
          </div>
          
          <div className="flex space-x-3">
            <button onClick={onClose}>취소</button>
            <button>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  const goodCode = `// 접근성이 적용된 바텀 시트
function AccessibleBottomSheet({ isOpen, onClose, triggerRef }) {
  const originalActiveElementRef = useRef();
  const bottomSheetRef = useRef();

  useEffect(() => {
    if (isOpen) {
      originalActiveElementRef.current = document.activeElement;
      
      // 첫 번째 포커스 가능한 요소로 포커스 이동
      setTimeout(() => {
        const firstButton = bottomSheetRef.current?.querySelector('button');
        firstButton?.focus();
      }, 100);

      // 배경 콘텐츠 비활성화 (inert)
      const portalRoot = document.getElementById('portal-root');
      Array.from(document.body.children).forEach(child => {
        if (child !== portalRoot) {
          child.setAttribute('inert', 'true');
        }
      });

      // 키보드 이벤트 처리
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        // Focus trap 구현...
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // inert 속성 제거
        Array.from(document.body.children).forEach(child => {
          child.removeAttribute('inert');
        });
        // 원래 버튼으로 포커스 복귀
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50">
      <div
        ref={bottomSheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className="fixed bottom-0 w-full bg-white rounded-t-lg"
      >
        <div className="p-6">
          <h2 id="bottom-sheet-title" className="text-lg font-semibold mb-4">
            알림 받기
          </h2>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-3">
              <input type="radio" name="notification" className="sr-only" />
              <div className="radio-custom" />
              <span>모든 알림 받기</span>
            </label>
            {/* 기타 옵션들... */}
          </div>
          
          <div className="flex space-x-3">
            <button onClick={onClose}>취소</button>
            <button>확인</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
}`;

  return (
    <DemoPageLayout
      title="알림 설정 바텀 시트 접근성"
      description="바텀 시트 모달의 접근성 구현 여부에 따른 사용자 경험 차이를 체험해보세요."
    >
      <ProblemIntroSection
        description="웹에서 자주 사용되는 바텀 시트는 접근성이 제대로 구현되지 않으면 스크린 리더 사용자나 키보드 사용자에게 큰 어려움을 줍니다."
        problemList={[
          "바텀 시트가 열려도 키보드 포커스가 배경에 남아있어 사용자가 혼란스러워함",
          "스크린 리더가 바텀 시트를 모달로 인식하지 못해 내용을 제대로 전달하지 못함",
          "ESC 키로 닫을 수 없고, 배경 콘텐츠에 계속 접근 가능해 혼란 야기",
          "바텀 시트가 닫힌 후 포커스가 엉뚱한 곳으로 이동하여 사용자 경험 저하"
        ]}
      />

      <DemoSection
        title="데모 체험하기"
        icon={Settings}
        iconColor="text-blue-600"
      >
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <div className="max-w-md mx-auto bg-background rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">마이페이지</h3>
            
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                앱의 새로운 소식 및 이벤트 알림 설정을 변경할 수 있습니다.
              </p>
              <p className="text-sm font-medium">
                현재 설정: {notificationLabels[currentSetting]}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                ref={accessibleButtonRef}
                onClick={() => setIsAccessibleSheetOpen(true)}
                className="w-full"
                variant="default"
              >
                <Bell className="w-4 h-4 mr-2" />
                접근성 우수 사례로 설정 변경하기
              </Button>

              <Button
                ref={inaccessibleButtonRef}
                onClick={() => setIsInaccessibleSheetOpen(true)}
                className="w-full"
                variant="destructive"
              >
                <Bell className="w-4 h-4 mr-2" />
                접근성 미흡 사례로 설정 변경하기
              </Button>
            </div>
          </div>
        </div>
      </DemoSection>

      <ExampleSection type="bad" problemText="접근성이 적용되지 않은 바텀 시트의 문제점">
        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">주요 접근성 문제점</h4>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
              <li>• 시맨틱하지 않은 마크업 (div, span만 사용)</li>
              <li>• ARIA 속성 누락 (role, aria-modal, aria-labelledby 등)</li>
              <li>• 키보드 포커스가 바텀 시트로 이동하지 않음</li>
              <li>• 배경 콘텐츠가 여전히 접근 가능</li>
              <li>• ESC 키로 닫기 불가능</li>
              <li>• 포커스 가두기(Focus Trap) 미구현</li>
              <li>• 바텀 시트 닫힌 후 포커스 복귀 실패</li>
            </ul>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection type="good" solutionText="접근성이 적용된 바텀 시트의 해결책">
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">접근성 구현 방법</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• 시맨틱 마크업: &lt;h2&gt; 제목, 적절한 HTML 구조</li>
              <li>• ARIA 속성: role="dialog", aria-modal="true", aria-labelledby 설정</li>
              <li>• 초점 관리: 바텀 시트 열릴 때 첫 번째 버튼으로 포커스 이동</li>
              <li>• 배경 비활성화: inert 속성으로 배경 콘텐츠 접근 차단</li>
              <li>• 키보드 상호작용: ESC 키로 닫기, Tab 키로 포커스 순환</li>
              <li>• 포커스 가두기: Tab과 Shift+Tab이 바텀 시트 내부에서만 순환</li>
              <li>• 포커스 복귀: 바텀 시트 닫힌 후 원래 버튼으로 포커스 복귀</li>
            </ul>
          </div>
        </div>
      </ExampleSection>

      <CodeExampleSection
        badExample={{
          title: "접근성이 적용되지 않은 바텀 시트",
          code: badCode
        }}
        goodExample={{
          title: "접근성이 적용된 바텀 시트",
          code: goodCode
        }}
        guidelines={[
          "React Portal을 사용하여 바텀 시트를 body의 직계 자식으로 렌더링",
          "바텀 시트가 열릴 때 inert 속성으로 배경 콘텐츠 비활성화",
          "role='dialog', aria-modal='true' 속성으로 모달임을 명시",
          "useEffect를 사용한 포커스 관리 및 키보드 이벤트 처리",
          "바텀 시트 닫힌 후 원래 트리거 버튼으로 포커스 복귀"
        ]}
      />

      <TestGuideSection
        testTitle="스크린 리더로 테스트하기"
        badSteps={[
          { step: "접근성 미흡 사례 버튼 클릭", description: "바텀 시트가 열리지만 스크린 리더가 이를 인식하지 못함" },
          { step: "Tab 키로 탐색", description: "바텀 시트가 아닌 배경의 다른 요소들로 포커스가 이동됨" },
          { step: "ESC 키 눌러보기", description: "바텀 시트가 닫히지 않음" },
          { step: "바텀 시트 옵션 찾기", description: "스크린 리더가 바텀 시트 내용을 제대로 읽지 못해 혼란스러움" }
        ]}
        goodSteps={[
          { step: "접근성 우수 사례 버튼 클릭", description: "바텀 시트가 열리면서 '알림 받기' 제목이 자동으로 읽힘" },
          { step: "Tab 키로 탐색", description: "취소 버튼 → 라디오 옵션들 → 확인 버튼 순으로 포커스가 바텀 시트 내부에서만 순환" },
          { step: "ESC 키 눌러보기", description: "바텀 시트가 즉시 닫히고 원래 버튼으로 포커스 복귀" },
          { step: "라디오 옵션 선택", description: "각 옵션이 명확하게 읽히고 현재 선택 상태가 정확히 전달됨" }
        ]}
        badResult="스크린 리더 사용자가 바텀 시트의 존재와 내용을 파악하기 어려우며, 키보드 사용자는 바텀 시트와 상호작용할 수 없습니다."
        goodResult="스크린 리더가 바텀 시트를 모달로 인식하여 내용을 명확히 전달하고, 키보드만으로도 모든 기능을 원활하게 사용할 수 있습니다."
        additionalNotes={[
          "스크린 리더 사용자에게는 바텀 시트가 열릴 때 제목이 자동으로 읽히는 것이 중요합니다",
          "키보드 사용자는 Tab 키만으로 바텀 시트 내의 모든 요소에 접근할 수 있어야 합니다",
          "ESC 키로 바텀 시트를 닫을 수 있고, 닫힌 후 원래 위치로 포커스가 복귀되어야 합니다",
          "PC와 모바일 모든 환경에서 동일한 접근성 원칙이 적용되어야 합니다"
        ]}
      />

      {/* Bottom Sheets */}
      <BottomSheet
        isOpen={isAccessibleSheetOpen}
        onClose={() => setIsAccessibleSheetOpen(false)}
        onConfirm={handleConfirm}
        currentSetting={currentSetting}
        accessible={true}
        triggerRef={accessibleButtonRef}
      />

      <BottomSheet
        isOpen={isInaccessibleSheetOpen}
        onClose={() => setIsInaccessibleSheetOpen(false)}
        onConfirm={handleConfirm}
        currentSetting={currentSetting}
        accessible={false}
        triggerRef={inaccessibleButtonRef}
      />
    </DemoPageLayout>
  );
}