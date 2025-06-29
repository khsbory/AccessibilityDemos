import { useLocation } from "wouter";
import Header from "./Header";
import { useDocumentTitle, PAGE_TITLES, createPageTitle } from "@/hooks/use-document-title";
import { Headphones } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // 현재 경로에 따른 페이지 타이틀 설정
  const pageTitle = PAGE_TITLES[location];
  const fullTitle = createPageTitle(pageTitle);
  useDocumentTitle(fullTitle);

  const handleScreenReaderSetupClick = () => {
    if (location === '/') {
      // 현재 홈페이지에 있는 경우 스크롤
      const section = document.getElementById('screen-reader-setup');
      section?.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        const heading = section?.querySelector('h3');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        }
      }, 500);
    } else {
      // 다른 페이지에 있는 경우 홈페이지로 이동하고 스크롤
      window.location.href = '/#screen-reader-setup';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main 
        id="main-content" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none"
      >
        {children}
      </main>
      
      {/* Fixed Screen Reader Setup Link */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={handleScreenReaderSetupClick}
          className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
          aria-label="스크린 리더 환경 설정으로 이동"
        >
          <Headphones className="h-4 w-4" aria-hidden="true" />
          <span>스크린 리더 환경 설정</span>
        </button>
      </div>
    </div>
  );
}
