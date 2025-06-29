import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Map, Star, CheckCircle, Code, Accessibility, Smartphone, Monitor, Globe, Headphones, List } from "lucide-react";

export default function HomePage() {
  // URL 해시에 따른 접근성 초점 이동 처리
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1); // # 제거
      const section = document.getElementById(targetId);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
          
          setTimeout(() => {
            const heading = section.querySelector('h3, h4') as HTMLElement;
            if (heading) {
              heading.setAttribute('tabindex', '-1');
              heading.focus();
            }
          }, 500);
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">웹 접근성 데모 사이트</h2>
        <p className="text-lg text-muted-foreground mb-8">웹 접근성의 중요성을 이해하고 올바른 구현 방법을 학습할 수 있는 데모 사이트입니다.</p>
      </div>

      {/* Table of Contents Section */}
      <section className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <List className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              목차
            </h3>
            <nav aria-label="페이지 목차">
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="#site-purpose" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById('site-purpose');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        const heading = section?.querySelector('h3') as HTMLElement;
                        if (heading) {
                          heading.setAttribute('tabindex', '-1');
                          heading.focus();
                        }
                      }, 500);
                    }}
                  >
                    사이트 목적
                  </a>
                </li>
                <li>
                  <a 
                    href="#windows-setup" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById('windows-setup');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        const heading = section?.querySelector('h4') as HTMLElement;
                        if (heading) {
                          heading.setAttribute('tabindex', '-1');
                          heading.focus();
                        }
                      }, 500);
                    }}
                  >
                    Windows 스크린 리더 환경 설정
                  </a>
                </li>
                <li>
                  <a 
                    href="#iphone-setup" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById('iphone-setup');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        const heading = section?.querySelector('h4') as HTMLElement;
                        if (heading) {
                          heading.setAttribute('tabindex', '-1');
                          heading.focus();
                        }
                      }, 500);
                    }}
                  >
                    iPhone 보이스오버 환경 설정
                  </a>
                </li>
                <li>
                  <a 
                    href="#android-setup" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById('android-setup');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        const heading = section?.querySelector('h4') as HTMLElement;
                        if (heading) {
                          heading.setAttribute('tabindex', '-1');
                          heading.focus();
                        }
                      }, 500);
                    }}
                  >
                    Android 톡백 환경 설정
                  </a>
                </li>
                <li>
                  <a 
                    href="#macos-setup" 
                    className="text-primary hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.getElementById('macos-setup');
                      section?.scrollIntoView({ behavior: 'smooth' });
                      
                      setTimeout(() => {
                        const heading = section?.querySelector('h4') as HTMLElement;
                        if (heading) {
                          heading.setAttribute('tabindex', '-1');
                          heading.focus();
                        }
                      }, 500);
                    }}
                  >
                    macOS 보이스오버 환경 설정
                  </a>
                </li>
              </ul>
            </nav>
          </CardContent>
        </Card>
      </section>

      {/* Purpose Section */}
      <section id="site-purpose" className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Target className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              사이트 목적
            </h3>
            <div className="prose max-w-none text-muted-foreground">
              <p className="mb-4">
                지금까지 접근성 개선을 위해서 이슈들을 진단하고 해결 방안을 제시해 왔지만, 
                구현하기 전에 접근성이 잘 되었을 때 어떻게 동작하는지를 테스트할 수 있는 환경이 필요하다는 판단하에 
                이러한 페이지를 만들었습니다.
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-foreground mb-3">해당 페이지의 특징</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>다양한 접근성 케이스를 제공하여 직접 체험할 수 있습니다</li>
                  <li>각 케이스별로 문제점을 명확히 제시합니다</li>
                  <li>접근성이 적용된 경우와 적용되지 않은 경우에 대한 실제 데모를 준비했습니다</li>
                  <li>관련 코드를 분석하고 구현 방법을 학습할 수 있습니다</li>
                  <li>실제 스크린 리더와 키보드 내비게이션으로 차이점을 직접 확인할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Screen Reader Environment Setup Section */}
      <section id="screen-reader-setup" className="mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
              <Headphones className="text-primary mr-3 h-6 w-6" aria-hidden="true" />
              스크린 리더 환경 설정
            </h3>
            
            <div className="space-y-8">
              <div id="windows-setup">
                <h4 className="text-lg font-medium text-foreground mb-3">Windows</h4>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    <a 
                      href="https://nvda.or.kr/voicewith/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline"
                    >
                      경북점자도서관
                    </a>
                    으로 들어가서 보이스위드를 다운받아 설치하여 테스트할 수 있습니다. 
                    보이스위드는 NVDA를 한글화한 버전입니다.
                  </p>
                  <p>
                    보이스위드 음성출력되는 텍스트를 화면에 자막으로 표시해 주는 애드온을 설치하면 편리합니다. 
                    <a 
                      href="https://khsruru.com/material/download.php?id=686127373bac2" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline ml-1"
                    >
                      다운로드
                    </a>
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium mb-2">설치 방법:</p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>보이스위드를 먼저 설치</li>
                      <li>보이스위드 실행한 상태로 해당 추가 기능을 설치</li>
                      <li>작업 표시줄에서 보이스위드 아이콘을 눌러 환경 설정 → 설정 메뉴를 열기</li>
                      <li>Speech Caption 카테고리에서 자막 켜기를 체크</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div id="iphone-setup">
                <h4 className="text-lg font-medium text-foreground mb-3">iPhone</h4>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    설정 → 손쉬운 사용 → 손쉬운 사용 단축키에서 보이스오버를 단축키로 설정하면 
                    필요할 때마다 잠금 버튼을 세 번 눌러서 보이스오버를 켜거나 끌 수 있습니다.
                  </p>
                  <p>
                    설정 → 손쉬운 사용 → 보이스오버 설정에서 자막 패널을 켜면 
                    보이스오버로 출력되는 내용을 화면으로 볼 수 있어 편리합니다.
                  </p>
                </div>
              </div>
              
              <div id="android-setup">
                <h4 className="text-lg font-medium text-foreground mb-3">Android</h4>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    갤럭시 기준으로 설정 → 접근성 → 고급 설정에서 음량 올리기와 내리기 또는 
                    측면 버튼과 음량 올리기 버튼 단축키에 톡백을 할당해 놓으면 
                    보이스오버와 마찬가지로 빠르게 켜고 끌 수 있습니다.
                  </p>
                  <p>
                    톡백 설정 → 고급 → 개발자 설정에서 음성 출력 표시를 체크하면 
                    보이스오버와 마찬가지로 음성 출력되는 소리를 자막으로 표시해 줍니다.
                  </p>
                </div>
              </div>
              
              <div id="macos-setup">
                <h4 className="text-lg font-medium text-foreground mb-3">macOS</h4>
                <p className="text-muted-foreground">콘텐츠 준비중입니다.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
