import useTimer from "@/pages/Home/hooks/useTimer";
import TicketOffSale from "@/pages/Home/components/MainMatch/TicketOffSale";
import { LeftTime } from "@/common/types/type";
import React from "react";

const timeMap: Record<keyof LeftTime, string> = {
  days: "일",
  hours: "시",
  minutes: "분",
  seconds: "초",
};

export default function Timer({ timeOffSale }: { timeOffSale: string }) {
  const { leftTime, isTimeUp } = useTimer(timeOffSale);

  return (
    <div className="mx-auto flex w-full flex-wrap items-center justify-between">
      {isTimeUp ? (
        <TicketOffSale />
      ) : (
        <>
          {Object.entries(leftTime).map(([unit, value]) => (
            <React.Fragment key={unit}>
              <TimeUnitDisplay value={value} unit={unit as keyof LeftTime} />
              {unit !== "seconds" && <span>:</span>}
            </React.Fragment>
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
