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
                <div className="text-muted-foreground space-y-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">NVDA 포터블 다운로드</h5>
                    <p>
                      <a 
                        href="https://khsruru.com/material/download.php?id=687d3ce5b48b2" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline"
                      >
                        NVDA 포터블 파일을 다운로드
                      </a>
                      하세요. 이는 설치 없이 간단하게 실행하여 접근성 테스트를 쉽게 할 수 있도록 한 버전입니다.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">사용 방법</h5>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>바탕화면과 같은 곳에 <code className="bg-muted px-1 rounded">NVDA PORTABLE</code>과 같은 폴더를 만드세요.</li>
                      <li>다운로드한 파일을 해당 폴더에 압축을 풀어주세요.</li>
                      <li>폴더 안의 <code className="bg-muted px-1 rounded">nvda</code> 파일을 실행하면 바로 테스트할 수 있습니다.</li>
                    </ol>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">주요 기능</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>자막 표시:</strong> 기본적으로 화면 아래쪽에 음성으로 출력되는 모든 텍스트가 자막으로 표시됩니다.</li>
                      <li><strong>설치 불필요:</strong> 설치 과정 없이 바로 실행 가능합니다.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">영상 가이드</h5>
                    <p className="text-sm mb-3">
                      NVDA 포터블 버전의 실제 사용법과 자막 기능을 영상으로 확인할 수 있습니다.
                    </p>
                    <a 
                      href="https://khsruru.com/caption/uploads/20250721_163347_73fb8f.html" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                      <span>🎥 자막 포함 시연 영상 보기</span>
                      <span className="text-xs">(새 창에서 열림)</span>
                    </a>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">종료 방법</h5>
                    <p className="text-sm">
                      <strong>캡스락을 누른 상태로 Q</strong>를 눌러 종료할 수 있습니다.
                    </p>
                    <div className="bg-muted p-3 rounded-lg mt-2">
                      <p className="text-xs font-medium mb-1">💡 대소문자 변경 팁</p>
                      <p className="text-xs">
                        대소문자로 변경할 때는 마치 마우스로 더블 클릭하듯이 <strong>캡스락 키를 두 번 따닥 연속 입력</strong>해야 합니다.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">웹 브라우징 접근성 테스트 단축키</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>H:</strong> 다음 헤딩으로 이동</li>
                      <li><strong>Shift + H:</strong> 이전 헤딩으로 이동</li>
                      <li><strong>L:</strong> 다음 링크로 이동</li>
                      <li><strong>Shift + L:</strong> 이전 링크로 이동</li>
                      <li><strong>Tab:</strong> 포커스 가능한 요소로 이동</li>
                      <li><strong>Space:</strong> 버튼 활성화, 체크박스/라디오 선택</li>
                      <li><strong>Enter:</strong> 링크 이동, 버튼 활성화</li>
                      <li><strong>Arrow Keys:</strong> 라디오 버튼, 탭, 메뉴 등에서 옵션 간 이동</li>
                    </ul>
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
