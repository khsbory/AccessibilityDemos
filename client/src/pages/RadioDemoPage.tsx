import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, Info, X, CheckCircle, Code, AlertTriangle, Check } from "lucide-react";

export default function RadioDemoPage() {
  return (
    <div>
      <div className="mb-8">
        <nav className="flex mb-4" aria-label="탐색경로">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/demos">
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                  데모
                </Button>
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li>
              <Link href="/demos">
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-primary">
                  PC 웹 데모
                </Button>
              </Link>
            </li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground">라디오 버튼 자동 선택 이슈</li>
          </ol>
        </nav>
        
        <h2 className="text-3xl font-bold text-foreground mb-4">라디오 버튼 자동 선택 이슈</h2>
        <p className="text-lg text-muted-foreground">라디오 버튼의 첫 번째 옵션이 자동으로 선택되어 발생하는 접근성 문제를 확인해보세요.</p>
      </div>

      {/* Introduction Section */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Info className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              문제 소개
            </h3>
            <div className="prose max-w-none text-muted-foreground">
              <p className="mb-4">라디오 버튼에서 첫 번째 옵션이 자동으로 선택되어 있으면 사용자가 의도하지 않은 선택을 할 수 있습니다. 특히 스크린 리더 사용자는 이러한 자동 선택을 인지하지 못할 수 있어 문제가 됩니다.</p>
              <h4 className="text-lg font-medium text-foreground mb-2">주요 문제점</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>사용자가 선택하지 않았음에도 기본값이 제출됨</li>
                <li>스크린 리더 사용자가 자동 선택을 놓칠 수 있음</li>
                <li>사용자의 명시적 선택 없이 진행되는 불편함</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Non-Accessible Example */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <X className="text-red-600 mr-3 h-6 w-6" aria-hidden="true" />
              접근성이 적용되지 않은 경우
            </h3>
            <Card className="bg-red-50 border-red-200 mb-4">
              <CardContent className="p-6">
                <h4 className="font-medium text-foreground mb-4">선호하는 연락 방법을 선택하세요:</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="contact-bad" 
                      value="email" 
                      className="h-4 w-4" 
                      defaultChecked 
                      id="email-bad"
                    />
                    <label htmlFor="email-bad" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      이메일
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="contact-bad" 
                      value="phone" 
                      className="h-4 w-4" 
                      id="phone-bad"
                    />
                    <label htmlFor="phone-bad" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      전화
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="contact-bad" 
                      value="sms" 
                      className="h-4 w-4" 
                      id="sms-bad"
                    />
                    <label htmlFor="sms-bad" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      문자메시지
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-100 border-red-300">
              <CardContent className="p-4">
                <p className="text-red-800 text-sm flex items-start">
                  <AlertTriangle className="mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>문제:</strong> 이메일이 자동으로 선택되어 있어 사용자가 의도하지 않은 선택을 할 수 있습니다.
                  </span>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {/* Accessible Example */}
      <section className="mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="text-emerald-600 mr-3 h-6 w-6" aria-hidden="true" />
              접근성이 적용된 경우
            </h3>
            <Card className="bg-emerald-50 border-emerald-200 mb-4">
              <CardContent className="p-6">
                <fieldset>
                  <legend className="font-medium text-foreground mb-4">선호하는 연락 방법을 선택하세요:</legend>
                  <RadioGroup className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email-good" />
                      <Label htmlFor="email-good">이메일</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone-good" />
                      <Label htmlFor="phone-good">전화</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="sms-good" />
                      <Label htmlFor="sms-good">문자메시지</Label>
                    </div>
                  </RadioGroup>
                </fieldset>
              </CardContent>
            </Card>
            <Card className="bg-emerald-100 border-emerald-300">
              <CardContent className="p-4">
                <p className="text-emerald-800 text-sm flex items-start">
                  <Check className="mr-2 h-4 w-4 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>개선점:</strong> 어떤 옵션도 미리 선택되지 않아 사용자가 명시적으로 선택해야 합니다. fieldset과 legend를 사용하여 그룹을 명확히 했습니다.
                  </span>
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </section>

      {/* Code Section */}
      <section>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Code className="text-violet-600 mr-3 h-6 w-6" aria-hidden="true" />
              관련 코드
            </h3>
            
            <div className="space-y-6">
              {/* Bad Example Code */}
              <div>
                <div className="flex items-center mb-3">
                  <Badge variant="destructive" className="mr-2">❌ 잘못된 구현</Badge>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`<div>
  <h4>선호하는 연락 방법을 선택하세요:</h4>
  <label>
    <input type="radio" name="contact" value="email" checked>
    이메일
  </label>
  <label>
    <input type="radio" name="contact" value="phone">
    전화
  </label>
  <label>
    <input type="radio" name="contact" value="sms">
    문자메시지
  </label>
</div>`}</code>
                </pre>
              </div>

              {/* Good Example Code */}
              <div>
                <div className="flex items-center mb-3">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700 mr-2">✅ 올바른 구현</Badge>
                </div>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`<fieldset>
  <legend>선호하는 연락 방법을 선택하세요:</legend>
  <label>
    <input type="radio" name="contact" value="email">
    이메일
  </label>
  <label>
    <input type="radio" name="contact" value="phone">
    전화
  </label>
  <label>
    <input type="radio" name="contact" value="sms">
    문자메시지
  </label>
</fieldset>`}</code>
                </pre>
              </div>

              {/* Guidelines */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-900 mb-2">구현 가이드라인</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• checked 속성을 사용하지 않아 자동 선택 방지</li>
                    <li>• fieldset과 legend 요소로 라디오 버튼 그룹의 목적을 명확히 표시</li>
                    <li>• 필수 선택인 경우 required 속성과 적절한 오류 메시지 제공</li>
                    <li>• aria-describedby로 추가 설명이나 도움말 연결</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
