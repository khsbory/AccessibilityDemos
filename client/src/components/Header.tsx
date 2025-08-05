import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Accessibility, ChevronDown, RadioIcon, Images, ArrowRight, Settings, LayoutGrid, Focus, MousePointer, Smartphone, Download } from "lucide-react";
import { motion } from "framer-motion";
import { skipToMainContent } from "@/lib/focus-utils";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedDemo, setExpandedDemo] = useState<string>("");
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const demoItems = [
    {
      id: 'radio',
      title: '라디오 데모',
      icon: RadioIcon,
      items: [
        { title: '라디오 버튼 자동 선택 이슈', href: '/demos/radio-auto-select' },
        { title: '라디오 버튼 계층형 카테고리', href: '/demos/category-radio' },
        { title: '커스텀 라디오 버튼 접근성', href: '/demos/custom-radio' }
      ]
    },
    {
      id: 'carousel',
      title: '캐러셀 데모',
      icon: Images,
      items: [
        { title: '모바일에서의 결제 카드 변경 데모', href: '/demos/payment-carousel' },
        { title: '무한 루프 캐러셀 접근성', href: '/demos/infinite-carousel' }
      ]
    },
    {
      id: 'modal',
      title: '모달 데모',
      icon: Settings,
      items: [
        { title: '알림 설정 바텀 시트', href: '/demos/notification-settings' }
      ]
    },
    {
      id: 'tab',
      title: '탭 데모',
      icon: LayoutGrid,
      items: [
        { title: '탭 컨트롤 키보드 접근성', href: '/demos/tab-control' }
      ]
    },
    {
      id: 'focus',
      title: '초점',
      icon: Focus,
      items: [
        { title: '초점 관리하기', href: '/demos/focus-management' }
      ]
    },
    {
      id: 'interaction',
      title: '인터랙션 데모',
      icon: MousePointer,
      items: [
        { title: '복권 긁기 접근성', href: '/demos/lottery-scratch' }
      ]
    },
    {
      id: 'android',
      title: '안드로이드',
      icon: Smartphone,
      items: [
        { 
          title: '안드로이드 접근성 데모 앱 다운로드', 
          href: 'https://khsruru.com/material/download.php?id=688b6bd1991dc',
          isExternal: true,
          icon: Download
        },
        { title: '확장축소', href: '/demos/android-expand-collapse' },
        { title: '커스텀 탭', href: '/demos/android-custom-tab' }
      ]
    }
  ];

  const isParentActive = (demoId: string) => {
    const demo = demoItems.find(d => d.id === demoId);
    return demo?.items.some(item => isActive(item.href)) || false;
  };

  // 모든 데모 항상 표시 (디바이스 구분 없음)
  const getVisibleDemos = (isMobile: boolean) => {
    return demoItems;
  };

  const toggleDemo = (demoId: string) => {
    const wasExpanded = expandedDemo === demoId;
    setExpandedDemo(wasExpanded ? "" : demoId);
    
    // 확장/축소 모든 경우에 해당 버튼으로 초점 복원
    setTimeout(() => {
      buttonRefs.current[demoId]?.focus();
    }, 100);
  };

  // 다른 곳 클릭시 메뉴 닫기 및 키보드 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        const currentExpanded = expandedDemo;
        setExpandedDemo("");
        
        // 외부 클릭으로 메뉴가 닫힐 때 해당 버튼으로 초점 복원
        if (currentExpanded) {
          setTimeout(() => {
            buttonRefs.current[currentExpanded]?.focus();
          }, 100);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && expandedDemo) {
        const currentExpanded = expandedDemo;
        setExpandedDemo("");
        
        // ESC 키로 메뉴 닫을 때 해당 버튼으로 초점 복원
        setTimeout(() => {
          buttonRefs.current[currentExpanded]?.focus();
        }, 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedDemo]);

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => {
    if (mobile) {
      // 모바일에서는 기존 방식 유지
      return (
        <nav className="flex flex-col space-y-2" role="navigation" aria-label="주요 메뉴">
          <Link 
            href="/" 
            onClick={onItemClick} 
            className="w-full text-decoration-none"
            aria-current={isActive("/") ? "page" : undefined}
          >
            <span 
              className={`block w-full py-2 px-3 rounded-md text-left ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}
            >
              소개
            </span>
          </Link>
          
          {/* 소개 메뉴 아래에 릴리즈 노트 메뉴 추가 */}
          <Link 
            href="/release-notes" 
            onClick={onItemClick} 
            className={mobile ? "w-full text-decoration-none" : "text-decoration-none"}
            aria-current={isActive("/release-notes") ? "page" : undefined}
          >
            <span 
              className={mobile
                ? `block w-full py-2 px-3 rounded-md text-left ${isActive("/release-notes") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`
                : `py-2 px-3 rounded-md ${isActive("/release-notes") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}
            >
              릴리즈 노트
            </span>
          </Link>

          {getVisibleDemos(isMobile).map((demo) => (
            <div key={demo.id} className="w-full">
              <Collapsible open={expandedDemo === demo.id} onOpenChange={() => toggleDemo(demo.id)}>
                <CollapsibleTrigger asChild>
                  <button 
                    ref={(el) => buttonRefs.current[demo.id] = el}
                    className={`w-full flex items-center justify-between py-2 px-3 rounded-md text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                      isParentActive(demo.id) 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    aria-current={isParentActive(demo.id) ? "page" : undefined}
                  >
                    <div className="flex items-center">
                      <demo.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                      <span>{demo.title}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedDemo === demo.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    </motion.div>
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-1">
                    {demo.items.length > 0 ? (
                      demo.items.map((item, index) => (
                        item.isExternal ? (
                          <a 
                            key={index} 
                            href={item.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-1 px-2 text-sm text-muted-foreground hover:text-primary transition-colors text-decoration-none flex items-center"
                            aria-label={`${item.title} (새 창에서 열림)`}
                          >
                            {item.icon && <item.icon className="h-3 w-3 mr-2" aria-hidden="true" />}
                            {item.title}
                          </a>
                        ) : (
                          <Link 
                            key={index} 
                            href={item.href} 
                            onClick={onItemClick} 
                            className="block py-1 px-2 text-sm text-muted-foreground hover:text-primary transition-colors text-decoration-none"
                            aria-current={isActive(item.href) ? "page" : undefined}
                          >
                            {item.title}
                          </Link>
                        )
                      ))
                    ) : (
                      <span className="block py-1 px-2 text-sm text-muted-foreground">
                        데모 준비 중입니다
                      </span>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </nav>
      );
    }

    // 데스크톱에서는 새로운 확장 방식
    return (
      <nav className="hidden md:flex items-center space-x-2 md:space-x-4 lg:space-x-6 overflow-hidden min-w-0" role="navigation" aria-label="주요 메뉴">
        <Link 
          href="/" 
          className="text-decoration-none"
          aria-current={isActive("/") ? "page" : undefined}
        >
          <span 
            className={`py-2 px-3 rounded-md ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer truncate overflow-hidden`}
          >
            소개
          </span>
        </Link>
        
        {/* 소개 메뉴 아래에 릴리즈 노트 메뉴 추가 */}
        <Link 
          href="/release-notes" 
          className="text-decoration-none"
          aria-current={isActive("/release-notes") ? "page" : undefined}
        >
          <span 
            className={`py-2 px-3 rounded-md ${isActive("/release-notes") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer truncate overflow-hidden`}
          >
            릴리즈 노트
          </span>
        </Link>

        {getVisibleDemos(isMobile).map((demo) => (
          <div key={demo.id} className="relative">
            <button 
              ref={(el) => buttonRefs.current[demo.id] = el}
              onClick={() => toggleDemo(demo.id)}
              className={`flex items-center py-2 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary min-w-0 flex-shrink ${
                isParentActive(demo.id) 
                  ? "text-primary bg-primary/10" 
                  : "text-foreground hover:text-primary hover:bg-muted"
              }`}
              aria-expanded={expandedDemo === demo.id}
              aria-current={isParentActive(demo.id) ? "page" : undefined}
            >
              <demo.icon className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="truncate overflow-hidden">{demo.title}</span>
                              <motion.div
                  animate={{ rotate: expandedDemo === demo.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-1 flex-shrink-0"
                >
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </motion.div>
            </button>
            
            {/* 각 버튼 아래 인라인 확장 메뉴 */}
            {expandedDemo === demo.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-md shadow-sm z-40 overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
                    <demo.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {demo.title}
                  </h3>
                                     {demo.items.length > 0 ? (
                     <div className="space-y-2">
                       {demo.items.map((item, index) => (
                         item.isExternal ? (
                           <a 
                             key={index}
                             href={item.href} 
                             target="_blank"
                             rel="noopener noreferrer"
                             onClick={() => {
                               const currentExpanded = expandedDemo;
                               setExpandedDemo("");
                               // 메뉴 항목 클릭 시에도 해당 버튼으로 초점 복원
                               setTimeout(() => {
                                 buttonRefs.current[currentExpanded]?.focus();
                               }, 100);
                             }}
                             className="flex items-center p-2 rounded-md hover:bg-muted transition-all group text-decoration-none"
                             aria-label={`${item.title} (새 창에서 열림)`}
                           >
                             <div className="flex-1">
                               <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center">
                                 {item.icon && <item.icon className="h-3 w-3 mr-2" aria-hidden="true" />}
                                 {item.title}
                               </div>
                             </div>
                             <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors ml-2" aria-hidden="true" />
                           </a>
                         ) : (
                           <Link 
                             key={index}
                             href={item.href} 
                             onClick={() => {
                               const currentExpanded = expandedDemo;
                               setExpandedDemo("");
                               // 메뉴 항목 클릭 시에도 해당 버튼으로 초점 복원
                               setTimeout(() => {
                                 buttonRefs.current[currentExpanded]?.focus();
                               }, 100);
                             }}
                             className="flex items-center p-2 rounded-md hover:bg-muted transition-all group text-decoration-none"
                             aria-current={isActive(item.href) ? "page" : undefined}
                           >
                             <div className="flex-1">
                               <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                 {item.title}
                               </div>
                             </div>
                             <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors ml-2" aria-hidden="true" />
                           </Link>
                         )
                       ))}
                     </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      <demo.icon className="mx-auto h-8 w-8 mb-2" aria-hidden="true" />
                      <p className="text-xs">데모 준비 중입니다</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    );
  };

  return (
    <div ref={headerRef}>
      {/* 본문 바로가기 링크 */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        onClick={(e) => {
          e.preventDefault();
          skipToMainContent();
        }}
      >
        본문 바로가기
      </a>
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Accessibility className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">접근성 데모</h1>
              </div>
            </Link>
            
            <NavLinks />
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="메뉴 열기">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-6">
                  <NavLinks mobile={true} onItemClick={() => {
                    setMobileMenuOpen(false);
                    setExpandedDemo("");
                  }} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>


    </div>
  );
}
