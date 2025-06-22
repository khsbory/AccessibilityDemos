import { useLocation } from "wouter";
import Header from "./Header";
import { useDocumentTitle, PAGE_TITLES, createPageTitle } from "@/hooks/use-document-title";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // 현재 경로에 따른 페이지 타이틀 설정
  const pageTitle = PAGE_TITLES[location];
  const fullTitle = createPageTitle(pageTitle);
  useDocumentTitle(fullTitle);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main 
        id="main-content" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
}
