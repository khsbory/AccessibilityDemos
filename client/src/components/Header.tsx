import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Menu, Accessibility, ChevronDown, Smartphone, Monitor, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedDemo, setExpandedDemo] = useState<string>("");
  const headerRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const demoItems = [
    {
      id: 'mobile',
      title: '모바일 데모',
      icon: Smartphone,
      items: []
    },
    {
      id: 'pc',
      title: 'PC 웹 데모',
      icon: Monitor,
      items: [
        { title: '라디오 버튼 자동 선택 이슈', href: '/demos/radio-auto-select' }
      ]
    },
    {
      id: 'common',
      title: '공통 웹 데모',
      icon: Globe,
      items: []
    }
  ];

  const toggleDemo = (demoId: string) => {
    setExpandedDemo(expandedDemo === demoId ? "" : demoId);
  };

  // 다른 곳 클릭시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setExpandedDemo("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => {
    if (mobile) {
      // 모바일에서는 기존 방식 유지
      return (
        <nav className="flex flex-col space-y-2" role="navigation" aria-label="주요 메뉴">
          <Link href="/" onClick={onItemClick} className="w-full text-decoration-none">
            <span className={`block w-full py-2 px-3 rounded-md text-left ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
              소개
            </span>
          </Link>
          
          {demoItems.map((demo) => (
            <div key={demo.id} className="w-full">
              <Collapsible open={expandedDemo === demo.id} onOpenChange={() => toggleDemo(demo.id)}>
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between py-2 px-3 rounded-md text-left text-foreground hover:text-primary hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
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
                        <Link 
                          key={index} 
                          href={item.href} 
                          onClick={onItemClick} 
                          className="block py-1 px-2 text-sm text-muted-foreground hover:text-primary transition-colors text-decoration-none"
                        >
                          {item.title}
                        </Link>
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
      <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="주요 메뉴">
        <Link href="/" className="text-decoration-none">
          <span className={`py-2 px-3 rounded-md ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
            소개
          </span>
        </Link>
        
        {demoItems.map((demo) => (
          <div key={demo.id} className="relative">
            <button 
              onClick={() => toggleDemo(demo.id)}
              className="flex items-center py-2 px-3 rounded-md text-foreground hover:text-primary hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-expanded={expandedDemo === demo.id}
            >
              <demo.icon className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>{demo.title}</span>
              <motion.div
                animate={{ rotate: expandedDemo === demo.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </motion.div>
            </button>
            
            {/* 각 버튼 아래 인라인 확장 메뉴 */}
            {expandedDemo === demo.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-1 w-80 bg-background border border-border rounded-lg shadow-lg z-50"
              >
                <div className="p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
                    <demo.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                    {demo.title}
                  </h3>
                  {demo.items.length > 0 ? (
                    <div className="space-y-2">
                      {demo.items.map((item, index) => (
                        <Link 
                          key={index}
                          href={item.href} 
                          onClick={() => setExpandedDemo("")}
                          className="flex items-center p-2 rounded-md hover:bg-muted transition-all group text-decoration-none"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.title}
                            </div>
                          </div>
                          <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors ml-2" aria-hidden="true" />
                        </Link>
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
