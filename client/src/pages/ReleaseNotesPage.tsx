import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from "react";
import { useDocumentTitle, createPageTitle } from "@/hooks/use-document-title";
import { Link } from "wouter";
// 릴리즈 노트 데이터 타입 정의
interface ReleaseNoteDemo {
  title: string; // 데모 제목
  summary: string; // 간단 요약
  href: string; // 해당 데모 페이지 경로
}

interface ReleaseNote {
  date: string; // 릴리즈 날짜
  version: string; // 버전명
  summary: string; // 릴리즈 요약
  demos: ReleaseNoteDemo[]; // 포함된 데모 목록
}

// 초기 릴리즈(2025-07-14) 데이터 - 각 데모별 간단 요약 및 링크 포함
const releaseNotes: ReleaseNote[] = [
  {
    date: '2025-07-28',
    version: 'v1.2.0',
    summary: '복권 긁기 접근성 데모 추가 및 탭 컨트롤 disabled 기능 개선',
    demos: [
      { title: '복권 긁기 접근성', summary: 'Canvas API 기반 복권 긁기에서 스크린 리더 전용 버튼과 ARIA 속성으로 접근성 개선', href: '/demos/lottery-scratch' },
      { title: '탭 컨트롤 접근성', summary: '어류 탭 추가 및 disabled 상태 구현, 키보드 네비게이션에서 disabled 탭 건너뛰기 기능', href: '/demos/tab-control' }
    ]
  },
  {
    date: '2025-07-20',
    version: 'v1.1.0',
    summary: '커스텀 라디오 버튼 접근성 데모 추가',
    demos: [
      { title: '커스텀 라디오 버튼 접근성', summary: '커스텀 버튼 UI에서 라디오 그룹의 키보드/포커스/ARIA 접근성 구현 패턴', href: '/demos/custom-radio' }
    ]
  },
  {
    date: '2025-07-14',
    version: 'v1.0.0',
    summary: '초기 릴리즈',
    demos: [
      { title: '탭 컨트롤 접근성', summary: 'ARIA 탭 구조와 키보드 내비게이션 구현 방법 소개', href: '/demos/tab-control' },
      { title: '라디오 버튼 접근성', summary: '라디오 그룹의 키보드 탐색 및 선택 제어', href: '/demos/radio-auto-select' },
      { title: '계층형 카테고리 라디오', summary: '계층형 라디오 그룹에서 의도치 않은 선택 방지 및 비교 탐색 지원', href: '/demos/category-radio' },
      { title: '초점 관리', summary: '항목 삭제 시 포커스 이동 및 스크린 리더 사용자 경험 개선', href: '/demos/focus-management' },
      { title: '무한 루프 캐러셀', summary: '현재 위치 정보 제공, 가려진 영역 접근 차단 등 캐러셀 접근성 개선', href: '/demos/infinite-carousel' },
      { title: '알림 설정 바텀 시트', summary: '모달 다이얼로그의 포커스 트랩, ARIA, inert 등 바텀 시트 접근성 구현', href: '/demos/notification-settings' },
      { title: '결제 카드 캐러셀', summary: '모바일 캐러셀에서 버튼 추가, 포커스 관리, aria-live 등 접근성 강화', href: '/demos/payment-carousel' },
    ]
  }
];

// 릴리즈 노트 아코디언 컴포넌트
function ReleaseNotesAccordion({ notes }: { notes: ReleaseNote[] }) {
  // 최신순 정렬
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto mt-8">
      {sorted.map((note, idx) => (
        <AccordionItem key={note.date + note.version} value={note.date + note.version}>
          <AccordionTrigger>
            <div className="flex flex-col text-left">
              <span className="font-semibold">{note.version} <span className="text-xs text-muted-foreground ml-2">{note.date}</span></span>
              <span className="text-sm text-muted-foreground">{note.summary}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-1">
              {note.demos.map((demo, i) => (
                <li key={demo.title + i}>
                  <Link href={demo.href} className="font-medium text-primary hover:underline focus:underline focus:outline-none">
                    {demo.title}
                  </Link>
                  <span className="ml-2 text-muted-foreground">{demo.summary}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

// 릴리즈 노트 페이지
export default function ReleaseNotesPage() {
  // 페이지 타이틀을 명시적으로 설정 (까먹지 않도록 강제)
  useDocumentTitle(createPageTitle("릴리즈 노트"));
  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">릴리즈 노트</h1>
      <p className="text-muted-foreground mb-8">Accessibility Demos 프로젝트의 버전별 주요 변경 이력을 확인할 수 있습니다.</p>
      <ReleaseNotesAccordion notes={releaseNotes} />
    </div>
  );
} 