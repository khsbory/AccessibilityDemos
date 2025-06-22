import { Card, CardContent } from "@/components/ui/card";
import { Settings, Smartphone } from "lucide-react";

export default function MobileDemosPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center">
          <Smartphone className="text-primary mr-3 h-8 w-8" aria-hidden="true" />
          모바일 데모
        </h2>
        <p className="text-lg text-muted-foreground">모바일 환경에서 발생하는 접근성 문제들과 해결방안을 확인해보세요.</p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center text-muted-foreground">
            <Settings className="mx-auto h-16 w-16 mb-6" aria-hidden="true" />
            <h3 className="text-xl font-medium mb-2">모바일 데모 준비 중</h3>
            <p>모바일 환경에서의 접근성 데모가 곧 제공될 예정입니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}