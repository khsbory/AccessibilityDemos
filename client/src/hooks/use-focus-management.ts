import { useRef, useCallback } from 'react';

interface UseFocusManagementOptions {
  items: any[];
  onItemDelete: (index: number) => void;
  titleHeadingId: string;
  getItemTitle: (item: any) => string;
}

/**
 * 항목 삭제 시 초점 관리를 위한 React 훅
 * 
 * 삭제 후 초점 이동 규칙:
 * 1. 다음 항목의 삭제 버튼으로 이동
 * 2. 다음 항목이 없으면 이전 항목의 삭제 버튼으로 이동
 * 3. 모든 항목이 삭제되면 제목 헤딩으로 이동
 * 
 * @param items - 관리할 항목 배열
 * @param onItemDelete - 항목 삭제 핸들러
 * @param titleHeadingId - 제목 헤딩 요소의 ID
 * @param getItemTitle - 항목에서 제목을 추출하는 함수
 */
export function useFocusManagement({
  items,
  onItemDelete,
  titleHeadingId,
  getItemTitle
}: UseFocusManagementOptions) {
  const deleteButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  /**
   * 항목 삭제 및 초점 이동 처리
   */
  const handleDelete = useCallback((index: number, itemId: number) => {
    // 항목 삭제
    onItemDelete(index);

    // 초점 이동 로직을 다음 프레임에서 실행
    setTimeout(() => {
      const remainingCount = items.length - 1; // 삭제 후 남은 항목 수

      if (remainingCount === 0) {
        // 모든 항목이 삭제된 경우 제목 헤딩으로 초점 이동
        const titleHeading = document.getElementById(titleHeadingId);
        if (titleHeading) {
          titleHeading.setAttribute('tabindex', '-1');
          titleHeading.focus();
          // 스크린 리더를 위한 접근성 메시지
          titleHeading.setAttribute('aria-live', 'polite');
          titleHeading.textContent = titleHeading.textContent + ' - 모든 알림이 삭제되었습니다';
          
          // 잠시 후 원래 텍스트로 복원
          setTimeout(() => {
            titleHeading.textContent = titleHeading.textContent?.replace(' - 모든 알림이 삭제되었습니다', '') || '';
            titleHeading.removeAttribute('aria-live');
          }, 2000);
        }
        return;
      }

      // 다음 항목의 삭제 버튼으로 이동 시도
      let nextFocusIndex = -1;
      
      if (index < remainingCount) {
        // 현재 위치에 다음 항목이 있는 경우
        nextFocusIndex = index;
      } else if (index > 0) {
        // 마지막 항목이었다면 이전 항목으로
        nextFocusIndex = index - 1;
      }

      // 다음에 포커스할 버튼 찾기
      if (nextFocusIndex >= 0) {
        // items[nextFocusIndex]의 ID를 사용해서 해당 버튼 찾기
        const nextItem = items.filter((_, i) => i !== index)[nextFocusIndex];
        if (nextItem) {
          const nextButton = deleteButtonRefs.current[nextItem.id];
          if (nextButton) {
            nextButton.focus();
          }
        }
      }
    }, 50); // 짧은 지연으로 DOM 업데이트 완료 후 실행
  }, [items, onItemDelete, titleHeadingId]);

  /**
   * 삭제 버튼에 적용할 props 생성
   */
  const getDeleteButtonProps = useCallback((item: any, index: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      deleteButtonRefs.current[item.id] = el;
    },
    onClick: () => handleDelete(index, item.id),
    title: getItemTitle(item), // 알림 내용을 title 속성으로 설정
    'aria-label': '삭제',
    className: "ml-2 p-1 text-gray-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
  }), [handleDelete, getItemTitle]);

  return {
    getDeleteButtonProps,
    handleDelete
  };
} 