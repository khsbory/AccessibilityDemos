import { useRef, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface GoodLotteryScratchProps {
  className?: string;
}

export default function GoodLotteryScratch({ className = "" }: GoodLotteryScratchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<string>("");
  const [isScratched, setIsScratched] = useState(false);
  const [lotteryStatus, setLotteryStatus] = useState("복권이 준비되었습니다. 마우스나 터치로 긁어보세요.");

  // 복권 결과 (당첨 확률 30%)
  const lotteryResult = Math.random() < 0.3 ? "🎉 당첨! 5,000원" : "😢 미당첨";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas 크기 설정
    canvas.width = 300;
    canvas.height = 150;

    // 복권 표면 그리기 (회색 오버레이)
    ctx.fillStyle = "#6b7280";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 복권 배경 그리기
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#fbbf24");
    gradient.addColorStop(1, "#f59e0b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 복권 텍스트 그리기
    ctx.fillStyle = "#92400e";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("복권", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("긁어보세요!", canvas.width / 2, canvas.height / 2 + 20);

    // 다시 회색 오버레이 그리기
    ctx.fillStyle = "#6b7280";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    for (let i = 0; i < data.length; i += 4) {
      // 투명하거나 회색이 아닌 픽셀을 긁힌 것으로 간주
      if (data[i + 3] === 0 || (data[i] !== 107 && data[i + 1] !== 114 && data[i + 2] !== 128)) {
        scratchedPixels++;
      }
    }

    return (scratchedPixels / totalPixels) * 100;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    setLotteryStatus("복권을 긁고 있습니다...");
    handleScratch(e.nativeEvent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      handleScratch(e.nativeEvent);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    if (!isCompleted) {
      setLotteryStatus("복권이 준비되었습니다. 마우스나 터치로 긁어보세요.");
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    setLotteryStatus("복권을 긁고 있습니다...");
    handleScratch(e.nativeEvent.touches[0]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      e.preventDefault();
      handleScratch(e.nativeEvent.touches[0]);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    if (!isCompleted) {
      setLotteryStatus("복권이 준비되었습니다. 마우스나 터치로 긁어보세요.");
    }
  };

  const handleScratch = (event: MouseEvent | Touch) => {
    const canvas = canvasRef.current;
    if (!canvas || isCompleted) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 긁기 효과 (지우개)
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();

    // 진행률 계산
    const newProgress = getScratchProgress();
    setProgress(newProgress);

    // 70% 이상 긁였으면 완료
    if (newProgress >= 70 && !isCompleted) {
      setIsCompleted(true);
      setResult(lotteryResult);
      setIsScratched(true);
      setLotteryStatus(`복권 결과: ${lotteryResult}`);
    }
  };

  // 스크린 리더 전용 복권 긁기 함수
  const handleScreenReaderScratch = () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    setResult(lotteryResult);
    setIsScratched(true);
    setProgress(100);
    setLotteryStatus(`복권 결과: ${lotteryResult}`);
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-background border rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">복권 긁기 (접근성 적용)</h3>
        
        {/* 스크린 리더 전용 버튼 */}
        <button
          className="sr-only"
          onClick={handleScreenReaderScratch}
          aria-label="복권 긁기"
          disabled={isCompleted}
        >
          복권 긁기
        </button>

        {/* 복권 상태 알림 (스크린 리더용) */}
        <div 
          aria-live="polite" 
          aria-label="복권 상태"
          className="sr-only"
        >
          {lotteryStatus}
        </div>

        {/* 복권 결과 알림 (스크린 리더용) */}
        {isScratched && (
          <div 
            aria-live="assertive" 
            aria-label="복권 결과"
            className="sr-only"
          >
            복권 결과: {result}
          </div>
        )}
        
        <div className="relative mb-4">
          <canvas
            ref={canvasRef}
            className="border rounded-lg cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "none" }}
            aria-label="복권 긁기 영역"
            role="img"
          />
          
          {isScratched && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-lg font-bold">{result}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <p className="text-sm text-muted-foreground">
          마우스, 터치, 또는 키보드로 복권을 긁을 수 있습니다.
          <br />
          모든 사용자가 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
} 