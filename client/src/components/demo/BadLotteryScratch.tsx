import { useRef, useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface BadLotteryScratchProps {
  className?: string;
}

export default function BadLotteryScratch({ className = "" }: BadLotteryScratchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<string>("");
  const [isScratched, setIsScratched] = useState(false);

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
    handleScratch(e.nativeEvent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      handleScratch(e.nativeEvent);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
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
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-background border rounded-lg p-4 ${className}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">복권 긁기 (접근성 없음)</h3>
        
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
          마우스나 터치로만 긁을 수 있습니다.
          <br />
          스크린 리더 사용자는 사용할 수 없습니다.
        </p>
      </div>
    </div>
  );
} 