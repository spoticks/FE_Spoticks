import { useState, useEffect } from "react";

interface LeftTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const timeMap: Record<keyof LeftTime, string> = {
  days: "일",
  hours: "시",
  minutes: "분",
  seconds: "초",
};

export default function Timer({ mainMatchStartTime }: { mainMatchStartTime: string }) {
  function calculateLeftTime(): LeftTime {
    const targetDate = new Date(mainMatchStartTime).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft: LeftTime = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const [leftTime, setLeftTime] = useState<LeftTime>(calculateLeftTime());
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp) {
      return;
    }

    const timer = setInterval(() => {
      const newTime = calculateLeftTime();
      setLeftTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        setIsTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp]);

  return (
    <div className="flex justify-center">
      {isTimeUp ? (
        <span className="flex h-20 items-center border border-yellow-700">
          예매 일정이 지났습니다!
        </span>
      ) : (
        <>
          {Object.entries(leftTime).map(([unit, value]) => (
            <div key={unit} className="flex items-center">
              <TimeUnitDisplay value={value} unit={unit as keyof LeftTime} />
              {unit !== "seconds" && <span className="flex items-center px-3">:</span>}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function TimeUnitDisplay({ value, unit }: { value: number; unit: keyof LeftTime }) {
  return (
    <div className="flex size-20 flex-col justify-center rounded-xl border border-borders bg-foreground text-center">
      <span className="font-bold">{String(value).padStart(2, "0")}</span>
      <span className="text-sm">{timeMap[unit]}</span>
    </div>
  );
}
