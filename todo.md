# 복권 긁기 데모 구현 TODO

## 🎯 프로젝트 개요
복권 긁기 인터페이스의 접근성 개선 데모 구현
- Bad Example: 마우스/터치로만 긁을 수 있는 복권 (접근성 없음)
- Good Example: 스크린 리더 전용 버튼이 추가된 복권 (접근성 적용)

## 📋 구현 목록

### 1. 메뉴 구조 설정
- [x] Header.tsx에 "인터랙션 데모" 카테고리 추가
- [x] "복권 긁기 접근성" 메뉴 항목 추가
- [x] App.tsx에 라우트 추가 (`/demos/lottery-scratch`)

### 2. 페이지 구조 생성
- [x] `client/src/pages/LotteryScratchDemoPage.tsx` 생성
- [x] DemoPageLayout 적용 (타이틀: "복권 긁기 접근성")
- [x] ProblemIntroSection 추가 (접근성 문제점 설명)
- [x] ExampleSection 추가 (Bad/Good 예제)
- [x] CodeExampleSection 추가 (코드 비교)
- [x] TestGuideSection 추가 (테스트 가이드)

### 3. BadLotteryScratch 컴포넌트 구현
- [x] `client/src/components/demo/BadLotteryScratch.tsx` 생성
- [x] Canvas API로 복권 표면 구현
- [x] 마우스/터치 드래그 이벤트 처리
- [x] 긁기 진행률 계산 및 표시
- [x] 복권 결과 표시 (당첨/미당첨)
- [x] 접근성 속성 없음 (의도적으로)

### 4. GoodLotteryScratch 컴포넌트 구현
- [x] `client/src/components/demo/GoodLotteryScratch.tsx` 생성
- [x] BadLotteryScratch 기능 복사
- [x] 스크린 리더 전용 "복권 긁기" 버튼 추가 (`sr-only` 클래스)
- [x] ARIA 속성 추가:
  - [x] `aria-label="복권 긁기"`
  - [x] `aria-describedby`로 복권 상태 설명
  - [x] `aria-live="polite"`로 결과 알림
- [x] 복권 상태를 스크린 리더가 읽을 수 있도록 구현

### 5. 복권 긁기 로직 구현
- [x] Canvas API 설정 및 초기화
- [x] 복권 표면 그리기 (회색 오버레이)
- [x] 마우스/터치 이벤트 처리:
  - [x] `mousedown`, `mousemove`, `mouseup` 이벤트
  - [x] `touchstart`, `touchmove`, `touchend` 이벤트
- [x] 긁기 효과 구현 (지우개 효과)
- [x] 긁기 진행률 계산 (0-100%)
- [x] 완전히 긁였을 때 결과 표시

### 6. 접근성 개선 기능
- [x] 스크린 리더 전용 버튼 구현
- [x] 복권 상태를 ARIA로 명시:
  - [x] "복권이 준비되었습니다"
  - [x] "복권을 긁고 있습니다"
  - [x] "복권 결과: 당첨/미당첨"
- [x] 포커스 관리 (스크린 리더 버튼으로 포커스 이동)
- [x] 결과 알림을 위한 `aria-live` 영역

### 7. 스타일링 및 UI
- [x] 복권 카드 디자인 (카드 형태)
- [x] 긁기 진행률 표시 (프로그레스 바)
- [x] 결과 표시 UI (당첨/미당첨 메시지)
- [x] 스크린 리더 전용 버튼 스타일 (`sr-only`)
- [x] 반응형 디자인 (모바일/데스크톱)

### 8. 상태 관리
- [x] 복권 상태 관리 (준비/진행중/완료)
- [x] 긁기 진행률 상태
- [x] 복권 결과 상태 (당첨/미당첨)
- [x] 스크린 리더 버튼 활성화/비활성화 상태

### 9. 테스트 및 검증
- [x] 마우스로 복권 긁기 테스트
- [x] 터치 디바이스에서 복권 긁기 테스트
- [x] 스크린 리더 테스트 (NVDA, JAWS, VoiceOver)
- [x] 키보드 포커스 테스트
- [x] 접근성 검증 (axe-core, Lighthouse)

### 10. 문서화
- [x] 코드 주석 추가
- [x] README 업데이트
- [x] 릴리즈 노트에 복권 긁기 데모 추가

## 🚫 제외된 기능
- 키보드 단축키 지원 (Space/Enter) - 사용자 요청으로 제외

## 📝 참고사항
- 기존 데모 페이지 패턴을 따라 구현
- 접근성 가이드라인 준수
- 반응형 디자인 적용
- 성능 최적화 고려

## 🎯 완료 기준
- [ ] 모든 체크리스트 항목 완료
- [ ] 접근성 테스트 통과
- [ ] 크로스 브라우저 호환성 확인
- [ ] 모바일/데스크톱 동작 확인 