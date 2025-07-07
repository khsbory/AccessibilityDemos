import { useLocation } from "wouter";
import { useEffect } from "react";
import Header from "./Header";
import { PAGE_TITLES, createPageTitle } from "@/hooks/use-document-title";
import { Headphones } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // DemoPageLayout이 있는 페이지는 해당 컴포넌트에서 타이틀을 설정하므로
  // 데모 페이지가 아닌 경우에만 타이틀 설정
  const isDemoPage = location.startsWith('/demos/');
  const pageTitle = isDemoPage ? null : PAGE_TITLES[location];
  const fullTitle = isDemoPage ? '' : createPageTitle(pageTitle);
  
  // 데모 페이지가 아닌 경우에만 타이틀 설정
  useEffect(() => {
    if (!isDemoPage && fullTitle) {
      document.title = fullTitle;
    }
  }, [fullTitle, isDemoPage]);

  const handleScreenReaderSetupClick = () => {
    if (location === '/') {
      // 현재 홈페이지에 있는 경우 스크롤
      const section = document.getElementById('screen-reader-setup');
      section?.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        const heading = section?.querySelector('h3') as HTMLElement;
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
