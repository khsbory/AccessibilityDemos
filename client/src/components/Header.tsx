import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Accessibility } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <nav className={`${mobile ? "flex flex-col space-y-2" : "hidden md:flex items-center space-x-6"}`} role="navigation" aria-label="주요 메뉴">
      <Link href="/" onClick={onItemClick} className={`${mobile ? "w-full" : ""} text-decoration-none`}>
        <span className={`${mobile ? "block w-full py-2 px-3 rounded-md text-left" : "py-2 px-3 rounded-md"} ${isActive("/") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
          소개
        </span>
      </Link>
      <Link href="/mobile-demos" onClick={onItemClick} className={`${mobile ? "w-full" : ""} text-decoration-none`}>
        <span className={`${mobile ? "block w-full py-2 px-3 rounded-md text-left" : "py-2 px-3 rounded-md"} ${isActive("/mobile-demos") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
          모바일 데모
        </span>
      </Link>
      <Link href="/pc-demos" onClick={onItemClick} className={`${mobile ? "w-full" : ""} text-decoration-none`}>
        <span className={`${mobile ? "block w-full py-2 px-3 rounded-md text-left" : "py-2 px-3 rounded-md"} ${isActive("/pc-demos") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
          PC 웹 데모
        </span>
      </Link>
      <Link href="/common-demos" onClick={onItemClick} className={`${mobile ? "w-full" : ""} text-decoration-none`}>
        <span className={`${mobile ? "block w-full py-2 px-3 rounded-md text-left" : "py-2 px-3 rounded-md"} ${isActive("/common-demos") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-muted"} transition-colors cursor-pointer`}>
          공통 웹 데모
        </span>
      </Link>
    </nav>
  );

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
