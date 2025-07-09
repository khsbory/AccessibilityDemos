# 서버 실행 가이드 (Windows)

이 문서는 Windows 환경에서 개발 서버를 실행하는 방법을 안내합니다.

## 문제 상황

기본적으로 `package.json`에 정의된 `dev` 스크립트 (`npm run dev`)는 Windows 환경에서 다음과 같은 두 가지 주요 문제로 인해 정상적으로 실행되지 않습니다.

1.  **`NODE_ENV` 인식 불가**: Windows Command Prompt(cmd) 또는 PowerShell은 `NODE_ENV=development`와 같은 형식의 환경 변수 설정을 직접적으로 지원하지 않습니다. 이로 인해 `'NODE_ENV' is not recognized...` 오류가 발생합니다.
2.  **`reusePort` 옵션 미지원**: `server/index.ts` 파일에 설정된 `reusePort: true` 옵션은 Windows의 특정 환경에서 지원되지 않아 `Error: listen ENOTSUP: operation not supported on socket` 오류를 유발할 수 있습니다.

## 해결 방법

위 문제들을 해결하고 서버를 성공적으로 실행하기 위해 다음 단계를 따릅니다.

### 1. `server/index.ts` 파일 수정 (필요시)

`reusePort` 관련 오류가 발생할 경우, `server/index.ts` 파일을 열어 `server.listen` 부분의 `reusePort: true` 옵션을 아래와 같이 제거하거나 주석 처리합니다.

**수정 전:**
```typescript
server.listen({
  port,
  host: "0.0.0.0",
  reusePort: true,
}, () => {
  log(`serving on port ${port}`);
});
```

**수정 후:**
```typescript
server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  log(`serving on port ${port}`);
});
```
*(참고: 이 작업은 이미 현재 프로젝트에 반영되었습니다.)*


### 2. 서버 실행

터미널에서 다음 명령어를 입력하여 개발 서버를 시작합니다. 이 명령어는 `cross-env`를 사용하여 Windows와 다른 운영체제에서 모두 호환되는 방식으로 환경 변수를 설정합니다.

```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

### 3. 접속 확인

서버가 성공적으로 실행되면 터미널에 다음과 유사한 로그가 출력됩니다.

```
7:06:40 PM [express] serving on port 5000
```

이제 웹 브라우저를 열고 다음 주소로 이동하여 애플리케이션에 접속할 수 있습니다.

**http://localhost:5000** 

---

# 새로운 접근성 데모 추가 가이드

이 문서는 기존 프로젝트에 새로운 접근성 데모를 추가하는 방법을 단계별로 안내합니다.

## 프로젝트 구조 이해

### 디렉토리 구조
```
client/src/
├── components/
│   ├── demo/                    # 데모 공통 컴포넌트들
│   │   ├── DemoPageLayout.tsx   # 데모 페이지 기본 레이아웃
│   │   ├── ProblemIntroSection.tsx # 문제 소개 섹션
│   │   ├── ExampleSection.tsx   # Bad/Good 예제 섹션
│   │   ├── TestGuideSection.tsx # 테스트 가이드 섹션
│   │   ├── CodeExampleSection.tsx # 코드 예제 섹션
│   │   └── DemoSection.tsx      # 기본 섹션 래퍼
│   └── ui/                      # Shadcn UI 컴포넌트들
├── hooks/                       # 접근성 관련 커스텀 훅들
├── pages/                       # 데모 페이지들
└── App.tsx                      # 라우팅 설정
```

### 데모 페이지 기본 구조
모든 데모 페이지는 다음과 같은 일관된 구조를 따릅니다:

1. **DemoPageLayout** - 제목과 설명
2. **ProblemIntroSection** - 문제점 소개
3. **ExampleSection (type="bad")** - 문제가 있는 예제
4. **ExampleSection (type="good")** - 개선된 예제
5. **TestGuideSection** - 테스트 방법 안내
6. **CodeExampleSection** - 코드 예제와 가이드라인

## 1단계: 새로운 데모 페이지 생성

### 기본 템플릿
`client/src/pages/`에 새로운 데모 페이지를 생성합니다.

```typescript
// YourNewDemoPage.tsx
import { useState } from "react";
import DemoPageLayout from "@/components/demo/DemoPageLayout";
import ProblemIntroSection from "@/components/demo/ProblemIntroSection";
import ExampleSection from "@/components/demo/ExampleSection";
import TestGuideSection from "@/components/demo/TestGuideSection";
import CodeExampleSection from "@/components/demo/CodeExampleSection";

export default function YourNewDemoPage() {
  const [badState, setBadState] = useState(false);
  const [goodState, setGoodState] = useState(false);

  const problemList = [
    "첫 번째 문제점 설명",
    "두 번째 문제점 설명",
    "세 번째 문제점 설명"
  ];

  return (
    <DemoPageLayout 
      title="데모 제목"
      description="데모에 대한 간단한 설명"
    >
      <ProblemIntroSection 
        description="문제 상황에 대한 자세한 설명"
        problemList={problemList}
      />

      <ExampleSection 
        type="bad"
        problemText="문제가 있는 예제에 대한 설명"
      >
        {/* 접근성이 적용되지 않은 컴포넌트 */}
      </ExampleSection>

      <ExampleSection 
        type="good"
        solutionText="개선된 예제에 대한 설명"
      >
        {/* 접근성이 적용된 컴포넌트 */}
      </ExampleSection>

      <TestGuideSection
        badSteps={[
          { step: "1단계", description: "테스트 단계 설명" },
        ]}
        goodSteps={[
          { step: "1단계", description: "개선된 테스트 단계 설명" },
        ]}
        badResult="문제가 있는 경우의 결과"
        goodResult="개선된 경우의 결과"
      />

      <CodeExampleSection
        badExample={{
          title: "접근성이 적용되지 않은 코드",
          code: `// 예제 코드`
        }}
        goodExample={{
          title: "접근성이 적용된 코드", 
          code: `// 개선된 예제 코드`
        }}
        guidelines={[
          "구현 가이드라인 1",
          "구현 가이드라인 2"
        ]}
      />
    </DemoPageLayout>
  );
}
```

## 2단계: 컴포넌트 Props 가이드

### DemoPageLayout Props
```typescript
interface DemoPageLayoutProps {
  title: string;              // 페이지 제목
  description: string;        // 페이지 설명
  children: React.ReactNode;  // 페이지 내용
  setDocumentTitle?: boolean; // 자동 페이지 타이틀 설정 (기본값: true)
}
```

### ProblemIntroSection Props
```typescript
interface ProblemIntroSectionProps {
  description: string;    // 문제 상황 설명
  problemList: string[]; // 주요 문제점 목록
}
```

### ExampleSection Props
```typescript
interface ExampleSectionProps {
  type: "bad" | "good";        // 예제 타입
  children: React.ReactNode;   // 예제 컴포넌트
  problemText?: string;        // 문제점 설명 (type="bad"일 때)
  solutionText?: string;       // 해결책 설명 (type="good"일 때)
}
```

### TestGuideSection Props
```typescript
interface TestStep {
  step: string;        // 단계 (예: "1단계")
  description: string; // 단계별 설명
}

interface TestGuideProps {
  badSteps: TestStep[];     // 문제 상황 테스트 단계
  goodSteps: TestStep[];    // 개선된 테스트 단계
  badResult: string;        // 문제 상황 결과
  goodResult: string;       // 개선된 결과
  additionalNotes?: string[]; // 추가 테스트 방법
  testTitle?: string;       // 테스트 제목 (기본값: "키보드로 테스트하기")
}
```

### CodeExampleSection Props
```typescript
interface CodeExample {
  title: string;  // 코드 예제 제목
  code: string;   // 코드 내용
}

interface CodeExampleProps {
  badExample: CodeExample;    // 문제가 있는 코드 예제
  goodExample: CodeExample;   // 개선된 코드 예제
  guidelines: string[];       // 구현 가이드라인
}
```

## 3단계: 접근성 훅 작성과 활용

### 기존 접근성 훅 활용
프로젝트에는 재사용 가능한 접근성 훅들이 준비되어 있습니다:

#### useRadioAccessibility
라디오 버튼 그룹의 키보드 네비게이션을 처리합니다.

```typescript
import { useRadioAccessibility } from "@/hooks/use-radio-accessibility";

// 사용 예시
const { getRadioProps } = useRadioAccessibility({
  radioIds: ["option1", "option2", "option3"],
  selectedValue: selectedValue,
  onValueChange: setSelectedValue,
  name: "radio-group-name"
});

// 라디오 버튼에 적용
<input {...getRadioProps("option1", "radio-option1")} />
```

#### useTabAccessibility  
탭 컨트롤의 ARIA 속성과 키보드 네비게이션을 처리합니다.

```typescript
import { useTabAccessibility } from "@/hooks/use-tab-accessibility";

// 사용 예시
const { getTabProps, getTabListProps, getTabPanelProps } = useTabAccessibility({
  tabIds: ["tab1", "tab2", "tab3"],
  activeTab: activeTab,
  onTabChange: setActiveTab
});

// 탭에 적용
<ul {...getTabListProps()}>
  <li><button {...getTabProps("tab1")}>탭 1</button></li>
</ul>
<div {...getTabPanelProps("tab1")}>탭 패널 내용</div>
```

### 새로운 접근성 훅 작성
새로운 접근성 패턴이 필요한 경우 `hooks/` 디렉토리에 커스텀 훅을 작성합니다.

```typescript
// hooks/use-your-accessibility.ts
import { useRef, useCallback } from 'react';

interface UseYourAccessibilityOptions {
  // 옵션 정의
}

export function useYourAccessibility(options: UseYourAccessibilityOptions) {
  // 접근성 로직 구현
  
  return {
    // 반환할 함수들과 props
  };
}
```

## 4단계: 라우팅 추가

### App.tsx에 라우트 추가
```typescript
// App.tsx
import YourNewDemoPage from "@/pages/YourNewDemoPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        {/* 기존 라우트들 */}
        <Route path="/demos/your-new-demo" component={YourNewDemoPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
```

### Header.tsx에 네비게이션 링크 추가
Header 컴포넌트를 확인하여 네비게이션 메뉴에 새로운 데모 링크를 추가합니다.

## 5단계: 접근성 패턴과 베스트 프랙티스

### 키보드 네비게이션 패턴
- **Tab**: 포커스 가능한 요소 간 이동
- **Arrow Keys**: 라디오 버튼, 탭, 메뉴 등에서 옵션 간 이동
- **Space**: 버튼 활성화, 체크박스/라디오 선택
- **Enter**: 링크 이동, 버튼 활성화
- **Escape**: 모달/드롭다운 닫기
- **Home/End**: 리스트의 첫/마지막 요소로 이동

### ARIA 속성 활용
```typescript
// 필수 ARIA 속성들
<button 
  aria-label="버튼 설명"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
  aria-controls="controlled-element-id"
/>

<div 
  role="tabpanel"
  aria-labelledby="tab-id"
  aria-hidden={!isVisible}
/>

<div aria-live="polite">동적 콘텐츠</div>
```

### 포커스 관리
```typescript
// 모달 열림 시 포커스 이동
useEffect(() => {
  if (modalOpen) {
    const firstFocusableElement = modalRef.current?.querySelector('button, input, select, textarea, [tabindex="0"]');
    firstFocusableElement?.focus();
  }
}, [modalOpen]);

// 모달 닫힘 시 이전 포커스 복원
const handleClose = () => {
  setModalOpen(false);
  triggerRef.current?.focus();
};
```

## 6단계: 테스트와 검증

### 키보드 테스트
1. Tab 키만으로 모든 인터랙티브 요소에 접근 가능한지 확인
2. 각 컨트롤에서 적절한 키보드 단축키가 작동하는지 확인
3. 포커스 순서가 논리적인지 확인
4. 포커스 표시가 명확한지 확인

### 스크린 리더 테스트
1. NVDA, JAWS, VoiceOver 등으로 테스트
2. 의미론적 구조가 올바르게 전달되는지 확인
3. 동적 콘텐츠 변경이 적절히 알려지는지 확인
4. 텍스트 대안이 적절한지 확인

### 자동화 테스트 도구
- **axe-core**: 접근성 자동 검증
- **Lighthouse**: 접근성 점수 확인
- **Wave**: 웹 접근성 평가

## 7단계: 코딩 컨벤션

### 파일명과 컴포넌트명
- 파일명: PascalCase (예: `YourNewDemoPage.tsx`)
- 컴포넌트명: PascalCase (예: `YourNewDemoPage`)
- 훅명: camelCase with use prefix (예: `useYourAccessibility`)

### 타입 정의
```typescript
// 인터페이스는 Props 접미사 사용
interface YourComponentProps {
  title: string;
  children: React.ReactNode;
}

// 타입 별칭은 Type 접미사 사용
type TabId = "tab1" | "tab2" | "tab3";
```

### 상태 관리
```typescript
// Bad/Good 예제를 위한 상태 분리
const [badState, setBadState] = useState(initialValue);
const [goodState, setGoodState] = useState(initialValue);

// 명확한 상태명 사용
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState("tab1");
```

### 주석 작성
```typescript
// 접근성 관련 구현에는 반드시 주석 추가
// 화살표 키 기본 동작 차단 및 포커스 이동
if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
  e.preventDefault();
  e.stopPropagation();
  // 다음 요소로 포커스 이동 로직
}
```

## 참고 자료

### 접근성 가이드라인
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### 기존 데모 페이지 참고
- `RadioDemoPage.tsx`: 라디오 버튼 접근성
- `TabControlDemoPage.tsx`: 탭 컨트롤 접근성  
- `PaymentCarouselDemoPage.tsx`: 캐러셀 접근성
- `CategoryRadioDemoPage.tsx`: 복잡한 폼 접근성

이 가이드를 따라 일관성 있고 접근성이 뛰어난 데모를 추가할 수 있습니다. 