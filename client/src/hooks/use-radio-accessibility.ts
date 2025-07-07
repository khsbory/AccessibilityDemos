import { useRef, useCallback } from 'react';

interface UseRadioAccessibilityOptions {
  radioIds: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  name: string;
}

/**
 * 라디오 버튼 접근성을 위한 범용 React 훅
 * 마우스 클릭과 키보드 입력을 구분하여 처리하고,
 * 화살표 키 네비게이션과 스페이스바 선택 기능을 제공합니다.
 * 
 * @param radioIds - 라디오 버튼 ID 목록
 * @param selectedValue - 현재 선택된 값
 * @param onValueChange - 값 변경 핸들러
 * @param name - 라디오 버튼 그룹 name 속성
 */
export function useRadioAccessibility({
  radioIds,
  selectedValue,
  onValueChange,
  name
}: UseRadioAccessibilityOptions) {
  const radioRefs = useRef<Record<string, HTMLInputElement | null>>({});

  /**
   * 키보드 이벤트 핸들러
   * 화살표 키로 포커스 이동, 스페이스바로 선택
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent, value: string) => {
    const currentIndex = radioIds.indexOf(value);
    let newIndex = currentIndex;

    // 화살표 키 기본 동작 차단 및 포커스 이동
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      
      // 다음 인덱스 계산 (순환)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % radioIds.length;
      } else {
        newIndex = currentIndex === 0 ? radioIds.length - 1 : currentIndex - 1;
      }
      
      // 포커스 이동 (선택하지 않음)
      const nextElement = radioRefs.current[radioIds[newIndex]];
      nextElement?.focus();
    }
    // 스페이스바로만 선택
    else if (e.key === ' ') {
      e.preventDefault();
      onValueChange(value);
    }
  }, [radioIds, onValueChange]);

  /**
   * 변경 이벤트 핸들러
   * 마우스 클릭과 키보드 입력을 구분하여 처리
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    // 마우스 클릭인지 키보드인지 구분
    if (e.nativeEvent instanceof MouseEvent) {
      // 마우스 클릭은 허용
      onValueChange(value);
    }
    // 키보드 이벤트는 onKeyDown에서 처리
  }, [onValueChange]);

  /**
   * 라디오 버튼에 적용할 props 생성
   */
  const getRadioProps = useCallback((value: string, id: string) => ({
    ref: (el: HTMLInputElement | null) => { radioRefs.current[value] = el; },
    type: 'radio' as const,
    name,
    value,
    id,
    checked: selectedValue === value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, value),
    className: "w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
  }), [selectedValue, name, handleChange, handleKeyDown]);

  return { getRadioProps };
} 