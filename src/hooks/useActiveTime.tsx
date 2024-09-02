import { useState, useEffect } from "react";

interface UseSaleTimeProps {
  timeOnSale: string;
  timeOffSale: string;
}

export function useActiveTime({ timeOnSale, timeOffSale }: UseSaleTimeProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const onSaleDate = new Date(timeOnSale);
    const offSaleDate = new Date(timeOffSale);
    const now = new Date();

    if (now >= onSaleDate && now <= offSaleDate) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // 계속 확인하도록
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setIsActive(currentTime >= onSaleDate && currentTime <= offSaleDate);
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [timeOnSale, timeOffSale]);

  return isActive;
}
