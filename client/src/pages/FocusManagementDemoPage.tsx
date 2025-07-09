import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Copy, Check } from "lucide-react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";
import DemoSection from "@/components/demo/DemoSection";
import { useFocusManagement } from "@/hooks/use-focus-management";
import { useToast } from "@/hooks/use-toast";

// 알림 타입 정의
interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

// 알림 타입별 색상 매핑
const getNotificationBadgeColor = (type: string) => {
  switch (type) {
    case "order": return "bg-blue-500";
    case "delivery": return "bg-green-500";
    case "promotion": return "bg-purple-500";
    case "system": return "bg-gray-500";
    default: return "bg-gray-500";
  }
};

// 접근성이 적용되지 않은 알림 리스트 컴포넌트
function BadNotificationList({ notifications, onDelete }: { notifications: Notification[], onDelete: (index: number) => void }) {
  return (
    <div className="space-y-3">
      <h4 id="bad-notifications-title" className="text-lg font-semibold mb-4">알림</h4>
      {notifications.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">알림이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notification, index) => (
            <li key={notification.id} className="flex items-start justify-between p-4 bg-white border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getNotificationBadgeColor(notification.type)}>
                    {notification.title}
                  </Badge>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
              {/* 접근성 미적용: title 속성 없음, aria-label 없음 */}
              <button
                onClick={() => onDelete(index)}
                className="ml-2 p-1 text-gray-500 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 접근성이 적용된 알림 리스트 컴포넌트
function GoodNotificationList({ notifications, onDelete }: { notifications: Notification[], onDelete: (index: number) => void }) {
  // 초점 관리 훅 사용
  const { getDeleteButtonProps } = useFocusManagement({
    items: notifications,
    onItemDelete: onDelete,
    titleHeadingId: "good-notifications-title",
    getItemTitle: (notification: Notification) => notification.message
  });

  return (
    <div className="space-y-3">
      <h4 id="good-notifications-title" className="text-lg font-semibold mb-4">알림</h4>
      {notifications.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">알림이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notification, index) => (
            <li key={notification.id} className="flex items-start justify-between p-4 bg-white border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getNotificationBadgeColor(notification.type)}>
                    {notification.title}
                  </Badge>
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
              {/* 접근성 적용: title 속성, aria-label, 초점 관리 */}
              <button {...getDeleteButtonProps(notification, index)}>
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function FocusManagementDemoPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // 알림 데이터 상태
  const [badNotifications, setBadNotifications] = useState<Notification[]>([]);
  const [goodNotifications, setGoodNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // 서버에서 알림 데이터 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setBadNotifications([...data]);
        setGoodNotifications([...data]);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 접근성 미적용 - 알림 삭제
  const handleBadDelete = (index: number) => {
    setBadNotifications(prev => prev.filter((_, i) => i !== index));
  };

  // 접근성 적용 - 알림 삭제
  const handleGoodDelete = (index: number) => {
    setGoodNotifications(prev => prev.filter((_, i) => i !== index));
  };

  // 코드 복사 기능
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "복사 완료",
      description: "클립보드에 복사되었습니다.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const problemList = [
    "항목 삭제 후 포커스가 예상치 못한 곳으로 이동하거나 사라짐",
    "마지막 항목 삭제 시 키보드 사용자가 갈 곳을 잃게 됨",
    "삭제 버튼에 어떤 항목을 삭제하는지에 대한 정보 부족"
  ];

  if (loading) {
    return (
      <DemoPageLayout title="초점 관리하기" description="로딩 중...">
        <div className="text-center py-8">
          <p>데이터를 불러오는 중...</p>
        </div>
      </DemoPageLayout>
    );
  }

  return (
    <DemoPageLayout 
      title="초점 관리하기"
      description="항목을 삭제할 때 키보드 사용자와 스크린 리더 사용자를 고려한 적절한 초점 관리가 필요합니다."
    >
      <ProblemIntroSection 
        description="리스트에서 항목을 삭제할 때 포커스가 사라지거나 예상치 못한 곳으로 이동하면 키보드 사용자는 혼란을 겪게 됩니다. 특히 마지막 항목을 삭제했을 때 갈 곳을 잃는 문제가 발생합니다. 특히 안드로이드 톡백에서는 요소가 사라지면 웹뷰 상단으로 이동되어 탐색 맥락 자체를 잃어버리게 됩니다."
        problemList={problemList}
      />

      <ExampleSection 
        type="bad"
        problemText="항목 삭제 후 포커스가 관리되지 않아 키보드 사용자가 방향감각을 잃습니다. 삭제 버튼에도 어떤 알림을 삭제하는지에 대한 정보가 없어 스크린 리더 사용자가 구분하기 어렵습니다."
      >
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <BadNotificationList 
              notifications={badNotifications}
              onDelete={handleBadDelete}
            />
          </CardContent>
        </Card>
      </ExampleSection>

      <ExampleSection 
        type="good"
        solutionText="삭제 후 적절한 초점 이동으로 사용자 경험을 개선합니다. 다음 항목→이전 항목→제목 순서로 초점을 이동하고, 각 삭제 버튼에는 해당 알림의 내용을 설명하는 정보를 제공합니다."
      >
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-6">
            <GoodNotificationList 
              notifications={goodNotifications}
              onDelete={handleGoodDelete}
            />
          </CardContent>
        </Card>
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1단계", description: "Tab 키를 눌러 첫 번째 삭제 버튼에 포커스" },
          { step: "2단계", description: "Enter 키 또는 스페이스바로 알림 삭제" },
          { step: "3단계", description: "포커스가 어디로 갔는지 확인 - 키보드에서는 초점이 사라짐, 안드로이드 톡백 포커스는 웹뷰 상단으로 이동, 아이폰 보이스오버는 일관되지 못한 곳으로 초점 이동" },
          { step: "4단계", description: "다시 Tab 키를 여러 번 눌러 다음 삭제 버튼 찾기" }
        ]}
        goodSteps={[
          { step: "1단계", description: "Tab 키를 눌러 첫 번째 삭제 버튼에 포커스" },
          { step: "2단계", description: "Enter 키 또는 스페이스바로 알림 삭제" },
          { step: "3단계", description: "자동으로 다음 삭제 버튼에 포커스 이동 확인" },
          { step: "4단계", description: "마지막 항목 삭제 시 제목으로 포커스 이동 확인" }
        ]}
        badResult="삭제 후 포커스가 사라져 Tab 키를 다시 눌러야 함"
        goodResult="삭제 후 자동으로 적절한 위치로 포커스 이동"
        additionalNotes={[
          "스크린 리더로 테스트할 때 각 삭제 버튼이 어떤 알림에 대한 것인지 읽어주는지 확인하세요.",
          "모든 알림을 삭제했을 때 '모든 알림이 삭제되었습니다' 메시지가 읽히는지 확인하세요."
        ]}
      />

      {/* 커스텀 훅 코드 섹션 */}
      <DemoSection title="재사용 가능한 훅 코드" icon={Bell} iconColor="text-orange-600">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium">useFocusManagement Hook</h4>
              <Button
                onClick={() => copyToClipboard(focusManagementHookCode)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "복사됨" : "복사"}
              </Button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{focusManagementHookCode}</code>
            </pre>
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>사용법:</strong> 위 훅을 복사하여 프로젝트에서 재사용할 수 있습니다. 
              리스트 항목 삭제 시 적절한 초점 관리가 자동으로 처리됩니다.</p>
            </div>
          </CardContent>
        </Card>
      </DemoSection>

      <CodeExampleSection
        badExample={{
          title: "접근성이 적용되지 않은 코드",
          code: `// 문제가 있는 삭제 버튼
<button onClick={() => onDelete(index)}>
  <X className="w-4 h-4" />
</button>

// 포커스 관리 없음`
        }}
        goodExample={{
          title: "접근성이 적용된 코드", 
          code: `// 초점 관리 훅 사용
const { getDeleteButtonProps } = useFocusManagement({
  items: notifications,
  onItemDelete: onDelete,
  titleHeadingId: "notifications-title",
  getItemTitle: (item) => item.message
});

// 개선된 삭제 버튼
<button {...getDeleteButtonProps(notification, index)}>
  <X className="w-4 h-4" />
</button>`
        }}
        guidelines={[
          "삭제 후 다음 항목의 삭제 버튼으로 포커스 이동",
          "마지막 항목이면 이전 항목의 삭제 버튼으로 이동",
          "모든 항목 삭제 시 제목 헤딩으로 포커스 이동",
          "삭제 버튼에 title과 aria-label로 명확한 설명 제공",
          "스크린 리더를 위한 상태 변경 알림 (aria-live) 활용"
        ]}
      />
    </DemoPageLayout>
  );
}

// 초점 관리 훅 코드 (복사용)
const focusManagementHookCode = `import { useRef, useCallback } from 'react';

interface UseFocusManagementOptions {
  items: any[];
  onItemDelete: (index: number) => void;
  titleHeadingId: string;
  getItemTitle: (item: any) => string;
}

export function useFocusManagement({
  items,
  onItemDelete,
  titleHeadingId,
  getItemTitle
}: UseFocusManagementOptions) {
  const deleteButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const handleDelete = useCallback((index: number, itemId: number) => {
    onItemDelete(index);

    setTimeout(() => {
      const remainingCount = items.length - 1;

      if (remainingCount === 0) {
        const titleHeading = document.getElementById(titleHeadingId);
        if (titleHeading) {
          titleHeading.setAttribute('tabindex', '-1');
          titleHeading.focus();
        }
        return;
      }

      let nextFocusIndex = index < remainingCount ? index : index - 1;
      const nextItem = items.filter((_, i) => i !== index)[nextFocusIndex];
      
      if (nextItem) {
        const nextButton = deleteButtonRefs.current[nextItem.id];
        nextButton?.focus();
      }
    }, 50);
  }, [items, onItemDelete, titleHeadingId]);

  const getDeleteButtonProps = useCallback((item: any, index: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      deleteButtonRefs.current[item.id] = el;
    },
    onClick: () => handleDelete(index, item.id),
    title: getItemTitle(item),
    'aria-label': \`\${getItemTitle(item)} 삭제\`,
    className: "ml-2 p-1 text-gray-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
  }), [handleDelete, getItemTitle]);

  return { getDeleteButtonProps };
}`; 