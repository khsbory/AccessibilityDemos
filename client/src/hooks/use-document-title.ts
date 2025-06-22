import { useEffect } from 'react';

/**
 * 페이지 타이틀을 설정하는 훅
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    
    // 컴포넌트 언마운트 시 이전 타이틀로 복원
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}

/**
 * 경로에 따른 페이지 타이틀 매핑
 */
export const PAGE_TITLES: Record<string, string> = {
  "/": "소개",
  "/demos/radio-auto-select": "라디오버튼 자동 선택 문제",
  "/demos/category-radio": "카테고리 라디오버튼"
};

/**
 * 기본 사이트 타이틀
 */
export const SITE_TITLE = "웹 접근성 데모";

/**
 * 전체 페이지 타이틀을 생성하는 함수
 */
export function createPageTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return SITE_TITLE;
  }
  return `${pageTitle} - ${SITE_TITLE}`;
}