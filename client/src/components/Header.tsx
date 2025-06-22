import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Accessibility, ChevronDown, Smartphone, Monitor, Globe, ArrowRight } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => {
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

    return (
      <nav className={`${mobile ? "flex flex-col space-y-2" : "hidden md:flex items-center space-x-6"}`} role="navigation" aria-label="주요 메뉴">
        <Link href="/" onClick={onItemClick} className={`${mobile ? "w-full" : ""} text-decoration-none`}>
          <span className={`${mobile ? "block w-full py-2 px-3 rounded-md text-left" : "py-2 px-3 rounded-md"} ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
            소개
          </span>
        </Link>
        
        {demoItems.map((demo) => (
          <DropdownMenu key={demo.id}>
            <DropdownMenuTrigger asChild>
              <button className={`${mobile ? "w-full flex items-center justify-between py-2 px-3 rounded-md text-left" : "flex items-center py-2 px-3 rounded-md"} text-foreground hover:text-primary hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary`}>
                <div className="flex items-center">
                  <demo.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span>{demo.title}</span>
                </div>
                <ChevronDown className="h-3 w-3 ml-1" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {demo.items.length > 0 ? (
                demo.items.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href} onClick={onItemClick} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-decoration-none">
                      <span className="flex-1">{item.title}</span>
                      <ArrowRight className="h-3 w-3 ml-2" aria-hidden="true" />
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled className="px-3 py-2 text-sm text-muted-foreground">
                  데모 준비 중입니다
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </nav>
    );
  };

  return (
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
                <NavLinks mobile={true} onItemClick={() => setMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
