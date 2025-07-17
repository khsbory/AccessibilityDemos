import { useRef, useCallback } from "react";

interface UseCustomRadioGroupAccessibilityOptions {
  optionValues: string[];
  selected: string | null;
  setSelected: (value: string) => void;
}

/**
 * 커스텀 라디오 버튼 그룹 접근성 훅
 * - 키보드 네비게이션(←→, ↑↓), 포커스 관리, 선택 상태 자동 처리
 * - ARIA 속성(예: role, aria-checked 등)은 개발자가 직접 부여
 */
export function useCustomRadioGroupAccessibility({
  optionValues,
  selected,
  setSelected
}: UseCustomRadioGroupAccessibilityOptions) {
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // 각 버튼에 부여할 props 생성
  const getItemProps = useCallback((value: string) => {
    const isSelected = selected === value;
    const isFirst = optionValues[0] === value;
    // 선택된 값이 없으면 첫 번째만 tabIndex=0, 나머지는 -1
    // 선택된 값이 있으면 해당 값만 tabIndex=0, 나머지는 -1
    const tabIndex = selected == null ? (isFirst ? 0 : -1) : (isSelected ? 0 : -1);
    return {
      ref: (el: HTMLButtonElement | null) => { itemRefs.current[value] = el; },
      tabIndex,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const idx = optionValues.indexOf(value);
        let nextIdx = idx;
        if (["ArrowRight", "ArrowDown"].includes(e.key)) {
          e.preventDefault();
          nextIdx = (idx + 1) % optionValues.length;
          itemRefs.current[optionValues[nextIdx]]?.focus();
        } else if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          nextIdx = idx === 0 ? optionValues.length - 1 : idx - 1;
          itemRefs.current[optionValues[nextIdx]]?.focus();
        } else if (e.key === " ") {
          e.preventDefault();
          setSelected(value);
        }
      },
      onClick: () => setSelected(value)
    };
  }, [optionValues, selected, setSelected]);

  return { getItemProps };
} 