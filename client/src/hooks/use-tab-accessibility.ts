import { useRef, useCallback } from 'react';

interface UseTabAccessibilityOptions {
  tabIds: string[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  disabledTabs?: string[];
}

interface TabAccessibilityHandlers {
  getTabProps: (tabId: string) => {
    ref: (el: HTMLButtonElement | null) => void;
    role: string;
    id: string;
    'aria-selected': boolean;
    'aria-controls': string;
    tabIndex: number;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  getTabListProps: () => {
    role: string;
  };
  getTabPanelProps: (tabId: string) => {
    role: string;
    id: string;
    'aria-labelledby': string;
  };
}

/**
 * 탭 접근성을 위한 범용 React 훅
 * 
 * role="tablist"와 role="tab", aria-selected 마크업이 되어 있으면
 * 자동으로 키보드 접근성을 추가해주는 훅입니다.
 * 
 * @param options - 탭 ID 목록, 활성 탭, 탭 변경 핸들러
 * @returns 탭, 탭리스트, 탭패널에 적용할 props
 */
export function useTabAccessibility({
  tabIds,
  activeTab,
  onTabChange,
  disabledTabs = []
}: UseTabAccessibilityOptions): TabAccessibilityHandlers {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabIds.indexOf(tabId);
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabIds.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = currentIndex === 0 ? tabIds.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabIds.length - 1;
        break;
      default:
        return;
    }

    // disabled 탭을 건너뛰기
    let attempts = 0;
    while (disabledTabs.includes(tabIds[newIndex]) && attempts < tabIds.length) {
      if (e.key === 'ArrowRight' || e.key === 'End') {
        newIndex = (newIndex + 1) % tabIds.length;
      } else {
        newIndex = newIndex === 0 ? tabIds.length - 1 : newIndex - 1;
      }
      attempts++;
    }

    // 모든 탭이 disabled인 경우 현재 탭 유지
    if (disabledTabs.includes(tabIds[newIndex])) {
      return;
    }

    const newTabId = tabIds[newIndex];
    onTabChange(newTabId);
    
    // 포커스 이동을 위해 다음 프레임에서 실행
    setTimeout(() => {
      tabRefs.current[newTabId]?.focus();
    }, 0);
  }, [tabIds, onTabChange, disabledTabs]);

  const getTabProps = useCallback((tabId: string) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabRefs.current[tabId] = el;
    },
    role: 'tab' as const,
    id: `tab-${tabId}`,
    'aria-selected': activeTab === tabId,
    'aria-controls': `panel-${tabId}`,
    tabIndex: disabledTabs.includes(tabId) ? -1 : (activeTab === tabId ? 0 : -1),
    onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, tabId)
  }), [activeTab, handleKeyDown, disabledTabs]);

  const getTabListProps = useCallback(() => ({
    role: 'tablist' as const
  }), []);

  const getTabPanelProps = useCallback((tabId: string) => ({
    role: 'tabpanel' as const,
    id: `panel-${tabId}`,
    'aria-labelledby': `tab-${tabId}`
  }), []);

  return {
    getTabProps,
    getTabListProps,
    getTabPanelProps
  };
}