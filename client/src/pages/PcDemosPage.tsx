import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Monitor, ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function PcDemosPage() {
  const [expandedDemo, setExpandedDemo] = useState<string>("");

  const toggleDemo = (demoId: string) => {
    setExpandedDemo(expandedDemo === demoId ? "" : demoId);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center">
          <Monitor className="text-primary mr-3 h-8 w-8" aria-hidden="true" />
          PC 웹 데모
        </h2>
        <p className="text-lg text-muted-foreground">데스크탑 웹 환경에서의 접근성 구현 사례들을 확인할 수 있습니다.</p>
      </div>

      <div className="space-y-4">
        {/* Form Controls Demo */}
        <Card>
          <Collapsible open={expandedDemo === "form-controls"} onOpenChange={() => toggleDemo("form-controls")}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-6 h-auto justify-between hover:bg-muted/50 focus:ring-2 focus:ring-primary"
                aria-expanded={expandedDemo === "form-controls"}
                aria-controls="form-controls-content"
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium text-foreground">폼 컨트롤 접근성</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedDemo === "form-controls" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent id="form-controls-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-6">폼 요소들의 접근성 구현 방법을 확인해보세요.</p>
                <div className="space-y-3">
                  <Link href="/demos/radio-auto-select">
                    <Card className="border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground group-hover:text-primary">라디오 버튼 자동 선택 이슈</h4>
                            <p className="text-sm text-muted-foreground mt-1">라디오 버튼의 잘못된 자동 선택으로 인한 접근성 문제</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Navigation Demo */}
        <Card>
          <Collapsible open={expandedDemo === "navigation"} onOpenChange={() => toggleDemo("navigation")}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-6 h-auto justify-between hover:bg-muted/50 focus:ring-2 focus:ring-primary"
                aria-expanded={expandedDemo === "navigation"}
                aria-controls="navigation-content"
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium text-foreground">내비게이션 접근성</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedDemo === "navigation" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent id="navigation-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">웹사이트 내비게이션의 접근성 구현 방법을 다룹니다.</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="mx-auto h-12 w-12 mb-4" aria-hidden="true" />
                  <p>내비게이션 데모가 준비 중입니다.</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Interactive Elements Demo */}
        <Card>
          <Collapsible open={expandedDemo === "interactive"} onOpenChange={() => toggleDemo("interactive")}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-6 h-auto justify-between hover:bg-muted/50 focus:ring-2 focus:ring-primary"
                aria-expanded={expandedDemo === "interactive"}
                aria-controls="interactive-content"
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium text-foreground">인터랙티브 요소 접근성</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedDemo === "interactive" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </motion.div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent id="interactive-content">
              <CardContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-4">버튼, 링크, 모달 등 인터랙티브 요소의 접근성을 다룹니다.</p>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="mx-auto h-12 w-12 mb-4" aria-hidden="true" />
                  <p>인터랙티브 요소 데모가 준비 중입니다.</p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
}