import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Smartphone, Monitor, Globe, ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function DemosPage() {
  const [openSection, setOpenSection] = useState<string>("pc");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">접근성 데모</h2>
        <p className="text-lg text-muted-foreground">다양한 접근성 이슈와 해결방안을 카테고리별로 확인해보세요.</p>
      </div>

      <div className="space-y-4">
        {/* Mobile Demo Accordion */}
        <Card>
          <Collapsible open={openSection === "mobile"} onOpenChange={() => toggleSection("mobile")}>
            <CollapsibleTrigger asChild>
              <button
                className="w-full p-6 h-auto flex justify-between items-center hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg transition-colors"
                aria-expanded={openSection === "mobile"}
                aria-controls="mobile-content"
              >
                <div className="flex items-center">
                  <Smartphone className="text-primary mr-3 h-5 w-5" aria-hidden="true" />
                  <span className="text-lg font-medium text-foreground">모바일 데모</span>
                </div>
                <motion.div
                  animate={{ rotate: openSection === "mobile" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent id="mobile-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">모바일 환경에서 발생하는 접근성 문제들을 다룹니다.</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="mx-auto h-12 w-12 mb-4" aria-hidden="true" />
                  <p>모바일 데모가 준비 중입니다.</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* PC Web Demo Accordion */}
        <Card>
          <Collapsible open={openSection === "pc"} onOpenChange={() => toggleSection("pc")}>
            <CollapsibleTrigger asChild>
              <button
                className="w-full p-6 h-auto flex justify-between items-center hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg transition-colors"
                aria-expanded={openSection === "pc"}
                aria-controls="pc-content"
              >
                <div className="flex items-center">
                  <Monitor className="text-primary mr-3 h-5 w-5" aria-hidden="true" />
                  <span className="text-lg font-medium text-foreground">PC 웹 데모</span>
                </div>
                <motion.div
                  animate={{ rotate: openSection === "pc" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent id="pc-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-6">데스크탑 웹 환경에서의 접근성 구현 사례들을 확인할 수 있습니다.</p>
                <div className="space-y-3">
                  <Link href="/demos/radio-auto-select" className="block text-decoration-none">
                    <div className="border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary">라디오 버튼 자동 선택 이슈</h4>
                          <p className="text-sm text-muted-foreground mt-1">라디오 버튼의 잘못된 자동 선택으로 인한 접근성 문제</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Common Web Demo Accordion */}
        <Card>
          <Collapsible open={openSection === "common"} onOpenChange={() => toggleSection("common")}>
            <CollapsibleTrigger asChild>
              <button
                className="w-full p-6 h-auto flex justify-between items-center hover:bg-muted/50 focus:ring-2 focus:ring-primary focus:outline-none rounded-lg transition-colors"
                aria-expanded={openSection === "common"}
                aria-controls="common-content"
              >
                <div className="flex items-center">
                  <Globe className="text-primary mr-3 h-5 w-5" aria-hidden="true" />
                  <span className="text-lg font-medium text-foreground">공통 웹 데모</span>
                </div>
                <motion.div
                  animate={{ rotate: openSection === "common" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent id="common-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">모든 플랫폼에서 공통으로 적용되는 웹 접근성 원칙들을 다룹니다.</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="mx-auto h-12 w-12 mb-4" aria-hidden="true" />
                  <p>공통 웹 데모가 준비 중입니다.</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
}
