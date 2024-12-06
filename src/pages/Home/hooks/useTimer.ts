import { LeftTime } from "@/common/types/type";
import calculateLeftTime from "@/pages/Home/utils/calculateLeftTime";
import { useState, useEffect } from "react";

export default function useTimer(targetTime: string) {
  const [leftTime, setLeftTime] = useState<LeftTime>(calculateLeftTime(targetTime));
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (isTimeUp) {
      return;
    }

    const timer = setInterval(() => {
      const newTime = calculateLeftTime(targetTime);
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
  }, [isTimeUp, targetTime]);
  return {
    leftTime,
    isTimeUp,
  };
}
