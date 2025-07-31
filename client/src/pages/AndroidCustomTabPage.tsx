import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

export default function AndroidCustomTabPage() {
  const { toast } = useToast();
  const [copiedTab, setCopiedTab] = useState(false);
  const [copiedCheckbox, setCopiedCheckbox] = useState(false);

  // 탭 코드 복사 기능
  const copyTabCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTab(true);
      toast({
        title: "탭 코드 복사 완료",
        description: "탭 접근성 코드가 클립보드에 복사되었습니다.",
      });
      setTimeout(() => setCopiedTab(false), 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "코드 복사에 실패했습니다. 수동으로 복사해주세요.",
        variant: "destructive",
      });
    }
  };

  // 체크박스 코드 복사 기능
  const copyCheckboxCode = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCheckbox(true);
      toast({
        title: "체크박스 코드 복사 완료",
        description: "체크박스 접근성 코드가 클립보드에 복사되었습니다.",
      });
      setTimeout(() => setCopiedCheckbox(false), 2000);
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "코드 복사에 실패했습니다. 수동으로 복사해주세요.",
        variant: "destructive",
      });
    }
  };

    const tabAccessibilityCode = `object AccessibilityUtil {

    /**
     * View를 탭으로 설정 (위치 정보 포함)
     * @param view 대상 View
     * @param index 탭의 위치 (0부터 시작)
     * @param totalTabs 총 탭 개수
     */
    fun setAsTab(view: View, index: Int, totalTabs: Int) {
        ViewCompat.setAccessibilityDelegate(view, object : AccessibilityDelegateCompat() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfoCompat
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                
                val isSelected = host.isSelected
                info.roleDescription = "tab"
                
                val collectionItemInfo = AccessibilityNodeInfoCompat.CollectionItemInfoCompat.obtain(
                    index, 1, 0, 1, false, isSelected
                )
                info.setCollectionItemInfo(collectionItemInfo)
                
                if (isSelected) {
                    info.isClickable = false
                    info.removeAction(AccessibilityNodeInfoCompat.AccessibilityActionCompat.ACTION_CLICK)
                }
            }
        })
    }

    /**
     * ViewGroup에서 isSelected 속성을 가진 뷰들을 자동으로 탭으로 설정
     * @param container 탭들이 포함된 ViewGroup
     */
    fun setAsTabGroupBySelected(container: ViewGroup) {
        val tabs = mutableListOf<View>()
        for (i in 0 until container.childCount) {
            val child = container.getChildAt(i)
            if (child.hasOnClickListeners() || child.isClickable) {
                tabs.add(child)
            }
        }
        
        container.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_YES
        
        ViewCompat.setAccessibilityDelegate(container, object : AccessibilityDelegateCompat() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfoCompat
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                
                val collectionInfo = AccessibilityNodeInfoCompat.CollectionInfoCompat.obtain(
                    1, tabs.size, false, 
                    AccessibilityNodeInfoCompat.CollectionInfoCompat.SELECTION_MODE_SINGLE
                )
                info.setCollectionInfo(collectionInfo)
            }
        })
        
        tabs.forEachIndexed { index, tab ->
            setAsTab(tab, index, tabs.size)
        }
    }
}`;

  const checkboxAccessibilityCode = `object AccessibilityUtil {

    /**
     * View를 체크박스로 설정
     * @param view 대상 View
     * @param isChecked 체크 상태
     */
    fun setAsCheckBox(view: View, isChecked: Boolean) {
        view.accessibilityDelegate = object : View.AccessibilityDelegate() {
            override fun onInitializeAccessibilityNodeInfo(
                host: View,
                info: AccessibilityNodeInfo
            ) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                info.className = CheckBox::class.java.name
                info.isCheckable = true
                if (view.isSelected) {
                    info.isChecked = true
                    info.isSelected = false
                } else if (isChecked) {
                    info.isChecked = true
                } else {
                    info.isChecked = false
                }
            }
        }
    }
}`;

  return (
    <DemoPageLayout
      title="Android 커스텀 탭 접근성 구현 가이드"
      description="TextView, ImageView 등 일반 뷰를 조합하여 만든 커스텀 탭과 컨트롤에 접근성을 적용하여, 스크린 리더 사용자에게 정확한 역할과 상태 정보를 제공하는 방법을 학습합니다."
    >
      {/* 체험 방법 안내 */}
      <TestGuideSection
        testTitle="Android 앱에서 커스텀 탭 접근성 체험"
        badSteps={[
          { step: "1", description: "Android Accessibility Demo App 다운로드" },
          { step: "2", description: "커스텀 탭 데모 화면으로 진입" },
          { step: "3", description: "'접근성 미적용' 탭에서 '과일' 또는 '채소' 탭 포커스" },
          { step: "4", description: "스크린 리더의 음성 안내 확인" },
        ]}
        goodSteps={[
          { step: "1", description: "Android Accessibility Demo App 다운로드" },
          { step: "2", description: "커스텀 탭 데모 화면으로 진입" },
          { step: "3", description: "'접근성 적용' 탭에서 '과일' 또는 '채소' 탭 포커스" },
          { step: "4", description: "스크린 리더의 음성 안내 확인" },
        ]}
        badResult="단순 텍스트(예: '과일')로만 읽히며, '탭'이라는 역할이나 선택 상태('선택됨')를 알려주지 않습니다. 체크박스 또한 '체크박스' 역할이나 상태 안내가 없습니다."
        goodResult="'과일, 탭, 2개 중 1번째, 선택됨'과 같이 역할, 위치, 상태 정보를 명확하게 읽어줍니다. 체크박스도 '사과, 체크박스, 선택 안됨'과 같이 정확히 안내합니다."
      />

      {/* 상황 이해하기 */}
      <ProblemIntroSection
        title="커스텀 탭 접근성 구현의 핵심 원칙"
        description="TabLayout과 같은 표준 컴포넌트가 아닌 TextView 등으로 직접 UI를 구성할 경우, 스크린 리더는 해당 뷰가 '탭' 역할을 하는지 알 수 없습니다. 따라서 개발자가 직접 접근성 정보를 제공해야 합니다."
        problemList={[
          "1. 탭 역할을 하는 뷰 그룹에 AccessibilityUtil.setAsTabGroupBySelected()를 호출하여 '탭 그룹'으로 설정해야 합니다.",
          "2. 탭의 선택 상태는 view.isSelected 속성으로 관리해야 합니다. (배경색 직접 변경 등 시각적 처리만으로는 안 됨)",
          "3. 탭 선택 상태가 변경될 때마다 setAsTabGroupBySelected()를 다시 호출하여 접근성 정보를 갱신해야 합니다.",
          "4. 커스텀 체크박스 역시 AccessibilityUtil.setAsCheckBox()를 사용하여 역할과 상태를 명시해야 합니다.",
        ]}
      />

      {/* 실제 구현 방법 */}
      <CodeExampleSection
        badExample={{
          title: "접근성 미적용",
          code: `// 클릭 시 배경색만 직접 변경
private fun selectTabNoAccessibility(
    selectedTab: TextView,
    unselectedTab: TextView,
    ...
) {
    // isSelected를 사용하지 않고 시각적 효과만 줌
    selectedTab.setBackgroundColor(0xFF2196F3.toInt())
    unselectedTab.setBackgroundColor(0xFFFFFFFF.toInt())
    ...
}

// 체크박스도 isSelected 속성만 변경하고 접근성 설정 없음
checkboxContainer.setOnClickListener {
    checkbox.isSelected = !checkbox.isSelected
}`,
        }}
        goodExample={{
          title: "AccessibilityUtil 적용",
          code: `// 탭 컨테이너를 탭 그룹으로 설정
val tabContainer = rootView.findViewById<LinearLayout>(R.id.tab_container)
AccessibilityUtil.setAsTabGroupBySelected(tabContainer)

// 클릭 시 isSelected 상태 변경 후 접근성 정보 갱신
private fun selectTabWithAccessibility(
    selectedTab: TextView, ...
) {
    // isSelected 속성으로 상태 관리
    selectedTab.isSelected = true
    unselectedTab.isSelected = false
    ...
    // 상태 변경 후 반드시 접근성 정보 갱신
    val tabContainer = selectedTab.parent as LinearLayout
    AccessibilityUtil.setAsTabGroupBySelected(tabContainer)
}

// 커스텀 체크박스에 역할 및 상태 설정
checkboxContainer.setOnClickListener {
    checkbox.isSelected = !checkbox.isSelected
    AccessibilityUtil.setAsCheckBox(textView, checkbox.isSelected)
}`,
        }}
        guidelines={[
          "탭 컨테이너에 setAsTabGroupBySelected() 적용",
          "선택 상태는 반드시 isSelected 속성으로 관리",
          "탭 선택 변경 시마다 setAsTabGroupBySelected() 재호출하여 갱신",
          "커스텀 체크박스에는 setAsCheckBox()를 사용하여 접근성 정보 제공",
        ]}
      />

      {/* 탭 AccessibilityUtil 코드 */}
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            커스텀 탭 접근성 적용에 필요한 AccessibilityUtil 코드를 복사하여
            프로젝트에서 사용하세요.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyTabCode(tabAccessibilityCode)}
          >
            {copiedTab ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copiedTab ? "복사됨" : "탭 코드 복사"}
          </Button>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{tabAccessibilityCode}</code>
        </pre>
      </div>

      {/* 체크박스 AccessibilityUtil 코드 */}
      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            커스텀 체크박스 접근성 적용에 필요한 AccessibilityUtil 코드를 복사하여
            프로젝트에서 사용하세요.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyCheckboxCode(checkboxAccessibilityCode)}
          >
            {copiedCheckbox ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copiedCheckbox ? "복사됨" : "체크박스 코드 복사"}
          </Button>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code>{checkboxAccessibilityCode}</code>
        </pre>
      </div>
    </DemoPageLayout>
  );
} 