import { useEffect } from "react";

interface DemoPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  setDocumentTitle?: boolean; // 기본값 true, false로 설정시 자동 페이지 타이틀 설정 비활성화
}

export default function DemoPageLayout({ title, description, children, setDocumentTitle = true }: DemoPageLayoutProps) {
  // 자동으로 페이지 타이틀 설정
  useEffect(() => {
    if (setDocumentTitle) {
      const prevTitle = document.title;
      document.title = title;
      
      // 컴포넌트 언마운트 시 이전 타이틀로 복원
      return () => {
        document.title = prevTitle;
      };
    }
  }, [title, setDocumentTitle]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}