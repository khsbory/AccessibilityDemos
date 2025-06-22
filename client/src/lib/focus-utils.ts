/**
 * 메인 콘텐츠에서 포커스할 최적의 요소를 찾는 유틸리티 함수
 */
export function findBestFocusTarget(mainElement: HTMLElement): HTMLElement | null {
  // 1. 먼저 클릭 가능한 요소 찾기
  const focusableElement = mainElement.querySelector(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  
  if (focusableElement) {
    return focusableElement;
  }
  
  // 2. 클릭 가능한 요소가 없으면 헤딩 요소 우선순위로 찾기
  const headingSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  
  for (const selector of headingSelectors) {
    const heading = mainElement.querySelector(selector) as HTMLElement;
    if (heading) {
      return heading;
    }
  }
  
  // 3. 헤딩도 없으면 다른 텍스트 요소 찾기
  const textElement = mainElement.querySelector('p, span, div') as HTMLElement;
  
  return textElement;
}

/**
 * 요소에 포커스를 설정하고 필요시 tabindex를 동적으로 추가
 */
export function focusElement(element: HTMLElement): void {
  // 이미 포커스 가능한 요소인지 확인
  const isFocusable = element.matches('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  
  if (!isFocusable) {
    // 포커스 불가능한 요소에 동적으로 tabindex 추가
    element.setAttribute('tabindex', '-1');
    
    // blur 이벤트 시 tabindex 제거
    element.addEventListener('blur', () => {
      element.removeAttribute('tabindex');
    }, { once: true });
  }
  
  element.focus();
}

/**
 * 본문 바로가기 기능을 위한 통합 함수
 */
export function skipToMainContent(): void {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;
  
  const targetElement = findBestFocusTarget(mainContent);
  
  if (targetElement) {
    focusElement(targetElement);
  }
  
  mainContent.scrollIntoView({ behavior: 'smooth' });
}