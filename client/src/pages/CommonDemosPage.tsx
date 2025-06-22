import { Card, CardContent } from "@/components/ui/card";
import { Settings, Globe } from "lucide-react";

export default function CommonDemosPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center">
          <Globe className="text-primary mr-3 h-8 w-8" aria-hidden="true" />
          공통 웹 데모
        </h2>
        <p className="text-lg text-muted-foreground">모든 플랫폼에서 공통으로 적용되는 웹 접근성 원칙들을 확인해보세요.</p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center text-muted-foreground">
            <Settings className="mx-auto h-16 w-16 mb-6" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">공통 웹 데모 준비 중</h3>
            <p>모든 플랫폼에서 공통으로 적용되는 접근성 데모가 곧 제공될 예정입니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}