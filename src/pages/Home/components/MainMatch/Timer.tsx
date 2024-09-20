import useTimer from "@/pages/Home/hooks/useTimer";
import { LeftTime } from "@/pages/Home/utils/timeUtils";

const timeMap: Record<keyof LeftTime, string> = {
  days: "일",
  hours: "시",
  minutes: "분",
  seconds: "초",
};

export default function Timer({ mainMatchStartTime }: { mainMatchStartTime: string }) {
  const { leftTime, isTimeUp } = useTimer(mainMatchStartTime);

  return (
    <div className="flex justify-center">
      {isTimeUp ? (
        <span className="flex h-20 items-center">예매 일정이 지났습니다!</span>
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
