import { LeftTime } from "@/common/types/type";

export default function calculateLeftTime(targetTime: string) {
  const targetDate = new Date(targetTime).getTime();
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
