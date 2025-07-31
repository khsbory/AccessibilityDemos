import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

export default function AndroidExpandCollapsePage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // 코드 복사 기능
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "코드 복사 완료",
        description: "AccessibilityUtil 코드가 클립보드에 복사되었습니다.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "코드 복사에 실패했습니다. 수동으로 복사해주세요.",
        variant: "destructive",
      });
    }
  };

  const accessibilityUtilCode = `object AccessibilityUtil {
    
    /**
     * 확장/축소 버튼으로 설정
     * @param view 대상 View
     * @param isExpanded 확장 상태
     */
    fun expandCollapseButton(view: View, isExpanded: Boolean) {
        view.accessibilityDelegate = object : View.AccessibilityDelegate() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfo
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                info.className = Button::class.java.name
                if (isExpanded) {
                    info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_COLLAPSE)
                } else if (view.isSelected) {
                    info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_COLLAPSE)
                    info.isSelected = false
                } else {
                    info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_EXPAND)
                }
            }

            override fun performAccessibilityAction(
                host: View,
                action: Int,
                args: Bundle?
            ): Boolean {
                if (action == AccessibilityNodeInfo.ACTION_COLLAPSE || action == AccessibilityNodeInfo.ACTION_EXPAND) {
                    view.performClick()
                }
                return super.performAccessibilityAction(host, action, args)
            }
        }
    }
}`;

  const actualImplementationCode = `/**
 * 실제 Android 확장축소 데모 구현
 */
@Composable
fun ViewDemoTab2() {
    val context = LocalContext.current
    
    AndroidView(
        factory = { ctx ->
            val view = LayoutInflater.from(ctx)
                .inflate(R.layout.expandable_demo_with_accessibility, null)
            
            // View 시스템에서 paneTitle 설정
            ViewCompat.setAccessibilityPaneTitle(view, context.getString(R.string.view_demo_with_accessibility_title))
            
            // 확장축소 로직 설정 (접근성 적용)
            setupExpandableDemo(view, true)
            
            view
        },
        modifier = Modifier.fillMaxSize()
    )
}

/**
 * 확장축소 데모 설정
 */
private fun setupExpandableDemo(rootView: View, withAccessibility: Boolean) {
    val fruitContent = rootView.findViewById<LinearLayout>(R.id.fruit_content)
    val fruitArrowButton = rootView.findViewById<Button>(R.id.fruit_arrow_button)
    
    // 과일 버튼 클릭 리스너
    fruitArrowButton.setOnClickListener {
        toggleExpandableSection(
            fruitContent,
            fruitArrowButton,
            withAccessibility,
            "과일"
        )
    }
    
    // 접근성 적용 시 expandCollapseButton 설정
    if (withAccessibility) {
        AccessibilityUtil.expandCollapseButton(fruitArrowButton, false)
    }
}

/**
 * 확장축소 섹션 토글
 */
private fun toggleExpandableSection(
    content: LinearLayout,
    arrowButton: Button,
    withAccessibility: Boolean,
    sectionName: String
) {
    val isExpanded = content.visibility == View.VISIBLE
    
    if (isExpanded) {
        // 축소
        content.visibility = View.GONE
        animateArrow(arrowButton, 0f)
        
        if (withAccessibility) {
            AccessibilityUtil.expandCollapseButton(arrowButton, false)
        }
    } else {
        // 확장
        content.visibility = View.VISIBLE
        animateArrow(arrowButton, 180f)
        
        if (withAccessibility) {
            AccessibilityUtil.expandCollapseButton(arrowButton, true)
        }
    }
}`;

  return (
    <DemoPageLayout 
      title="Android 확장축소 접근성 구현 가이드"
      description="실제 Android 앱에서 View 시스템을 사용한 확장축소 접근성 구현 방법을 학습합니다."
    >
      {/* 체험 방법 안내 */}
      <TestGuideSection 
        badSteps={[
          { step: "1", description: "Android Accessibility Demo App 다운로드" },
          { step: "2", description: "확장축소 데모 화면으로 진입" },
          { step: "3", description: "접근성 미적용 탭에서 화살표 버튼 포커스" },
          { step: "4", description: "스크린 리더로 화살표 버튼 읽기 확인" }
        ]}
        goodSteps={[
          { step: "1", description: "Android Accessibility Demo App 다운로드" },
          { step: "2", description: "확장축소 데모 화면으로 진입" },
          { step: "3", description: "접근성 적용 탭에서 화살표 버튼 포커스" },
          { step: "4", description: "스크린 리더로 확장/축소 기능 읽기 확인" }
        ]}
        badResult="라벨 없음 또는 단순 버튼으로만 읽힘"
        goodResult="접힘 또는 펼쳐짐, 과일 목록 버튼 과 같이 구체적으로 읽힘"
        testTitle="Android 앱에서 확장축소 접근성 체험"
      />

      {/* 상황 이해하기 */}
      <ProblemIntroSection 
        title="Android 확장축소 접근성 구현의 핵심 원칙"
        description="Android 확장축소 접근성 구현을 위한 핵심 원칙들을 살펴봅니다."
        problemList={[
          "1. AccessibilityUtil.expandCollapseButton() 메서드로 View의 접근성 액션 설정",
          "2. 확장/축소 상태 변경 시마다 접근성 설정 재호출 필수",
          "3. XML 레이아웃에서 contentDescription으로 버튼 목적 명시"
        ]}
      />

      {/* 실제 구현 방법 */}
      <CodeExampleSection 
        badExample={{
          title: "접근성 미적용",
          code: `// 단순한 화살표 버튼만 있는 경우
<Button
    android:id="@+id/fruit_arrow_button"
    android:src="@android:drawable/arrow_up_float" />

// 클릭 리스너만 설정
fruitArrowButton.setOnClickListener {
    toggleExpandableSection(content, arrowButton, false, "과일")
}`
        }}
        goodExample={{
          title: "AccessibilityUtil 적용",
          code: `// XML에서 contentDescription 설정
<Button
    android:id="@+id/fruit_arrow_button"
    android:src="@android:drawable/arrow_up_float"
    android:contentDescription="과일 목록" />

// 코드에서 접근성 설정
AccessibilityUtil.expandCollapseButton(fruitArrowButton, false)

// 상태 변경 시 접근성 재설정
if (isExpanded) {
    AccessibilityUtil.expandCollapseButton(arrowButton, false)
} else {
    AccessibilityUtil.expandCollapseButton(arrowButton, true)
}`
        }}
        guidelines={[
          "AccessibilityUtil.expandCollapseButton() 메서드 사용",
          "확장/축소 상태 변경 시마다 접근성 설정 재호출",
          "XML contentDescription에 실제 기능 설명 추가"
        ]}
      />

      {/* AccessibilityUtil 전체 코드 */}
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            AccessibilityUtil 클래스 전체 코드를 복사하여 프로젝트에서 사용하세요.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyToClipboard(accessibilityUtilCode)}
          >
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? "복사됨" : "코드 복사"}
          </Button>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{accessibilityUtilCode}</code>
        </pre>
      </div>




    </DemoPageLayout>
  );
} 