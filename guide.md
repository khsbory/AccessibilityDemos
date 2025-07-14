# 서버 실행 가이드 (Windows)

이 문서는 Windows 환경에서 개발 서버를 실행하는 방법을 안내합니다.

## 서버 실행

1. 터미널에서 다음 명령어로 개발 서버를 실행하세요.

```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

2. 서버가 성공적으로 실행되면 아래와 같은 로그가 출력됩니다.

```
[express] serving on port 5000
```

3. 브라우저에서 http://localhost:5000 으로 접속하면 됩니다.

---

# 프로젝트 구조 및 주요 규칙

## 디렉토리 구조
```
client/src/
├── components/
│   ├── demo/                    # 데모 공통 컴포넌트
│   └── ui/                      # Shadcn UI 컴포넌트
├── hooks/                       # 접근성 관련 커스텀 훅
├── pages/                       # 데모/릴리즈노트 등 페이지
│   └── ReleaseNotesPage.tsx     # 릴리즈 노트 페이지
└── App.tsx                      # 라우팅 설정
```

## 페이지 타이틀(문서 제목) 규칙
- 모든 페이지는 useDocumentTitle 훅 또는 DemoPageLayout/PageLayout의 title props를 통해 반드시 페이지 타이틀을 명시해야 합니다.
- 예시:
  ```tsx
  useDocumentTitle(createPageTitle("릴리즈 노트"));
  // 또는
  <DemoPageLayout title="탭 컨트롤 접근성" ... >
  ```
- 타이틀을 누락하면 SEO, 접근성, UX에 문제가 생기므로 반드시 지켜주세요.

---

# 릴리즈 노트(ReleaseNotesPage) 작성 및 관리 가이드

## 목적
- 프로젝트의 버전별 주요 변경 이력, 데모 추가/개선 내역을 한눈에 확인할 수 있도록 합니다.

## 작성/구현 방식
- `client/src/pages/ReleaseNotesPage.tsx`에서 릴리즈 노트 데이터를 객체 배열로 관리합니다.
- 각 릴리즈는 날짜, 버전, 요약, 데모별 간단 요약 목록을 포함합니다.
- Shadcn UI Accordion 컴포넌트로 최신순 아코디언 UI로 렌더링합니다.
- 예시:
  ```ts
  const releaseNotes = [
    {
      date: '2025-07-14',
      version: 'v1.0.0',
      summary: '초기 릴리즈',
      demos: [
        { title: '탭 컨트롤 접근성', summary: 'ARIA 탭 구조와 키보드 내비게이션 구현 방법 소개' },
        { title: '라디오 버튼 접근성', summary: '라디오 그룹의 키보드 탐색 및 선택 제어' },
        // ...
      ]
    },
    // ...
  ];
  ```
- ReleaseNotesAccordion 컴포넌트에서 최신순으로 아코디언 형태로 표시합니다.
- 각 데모의 상세 설명은 해당 데모 페이지에서 제공합니다(릴리즈 노트에는 한 줄 요약만 작성).

## 릴리즈 노트 추가/수정 방법
- 새로운 데모/기능 추가 시 releaseNotes 배열에 새 객체를 추가하세요.
- 날짜, 버전, 요약, 데모별 요약을 빠짐없이 작성하세요.

---

# 새로운 접근성 데모 추가 가이드

## 데모 페이지 기본 구조
- DemoPageLayout(타이틀/설명) → ProblemIntroSection → ExampleSection(bad/good) → TestGuideSection → CodeExampleSection 순서로 작성
- 각 데모는 반드시 title(페이지 타이틀) props를 명시해야 하며, useDocumentTitle 훅을 직접 사용할 수도 있습니다.

## 데모 추가 절차
1. `client/src/pages/`에 새 데모 페이지 생성
2. App.tsx에 라우트 추가
3. Header.tsx 네비게이션에 메뉴 추가
4. 데모별 Bad/Good 예제, 테스트 가이드, 코드 예제, 가이드라인 작성
5. 페이지 타이틀 명시(필수)

## 컴포넌트/훅/상태 관리/주석 등 코딩 컨벤션은 기존 가이드와 동일하게 유지

---

# 접근성 패턴, 테스트, 코딩 컨벤션 등

(이하 기존 가이드 내용 동일, 최신 데모/컴포넌트/라우팅 구조에 맞게 예시만 최신화)

## 키보드 네비게이션 패턴
- **Tab**: 포커스 가능한 요소 간 이동
- **Arrow Keys**: 라디오 버튼, 탭, 메뉴 등에서 옵션 간 이동
- **Space**: 버튼 활성화, 체크박스/라디오 선택
- **Enter**: 링크 이동, 버튼 활성화
- **Escape**: 모달/드롭다운 닫기
- **Home/End**: 리스트의 첫/마지막 요소로 이동

## ARIA 속성 활용
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

## 포커스 관리
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

## 테스트와 검증

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

## 코딩 컨벤션

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