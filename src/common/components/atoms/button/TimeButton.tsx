import { useEffect, useState } from "react";
import { useActiveTime } from "../../../../hooks/useActiveTime";
import extractDateData from "@/common/utils/extractDateData";

interface SaleButtonProps {
  timeOnSale: string;
  timeOffSale: string;
  label: string;
  onClick?: () => void;
  className: string;
}

export const TimeButton = ({
  timeOnSale,
  timeOffSale,
  label,
  onClick,
  className,
}: SaleButtonProps) => {
  const isActive = useActiveTime({ timeOnSale, timeOffSale });
  const { year, month, day, hours, minutes } = extractDateData(timeOnSale);

  const [buttonLabel, setButtonLabel] = useState<JSX.Element | string>(label);

  useEffect(() => {
    const now = new Date();
    const onSaleDate = new Date(timeOnSale);

    if (now < onSaleDate) {
      setButtonLabel(
        <div>
          <div>{`${year}.${month}.${day}`}</div>
          <div>{`${hours}:${minutes} 오픈`}</div>
        </div>,
      );
    } else if (isActive) {
      setButtonLabel(label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOnSale, isActive, label]);

  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`${className} transition-all duration-300 ${
        isActive
          ? "bg-Accent hover:bg-button-hovered"
          : "cursor-not-allowed bg-none px-0 text-text-tertiary"
      }`}
    >
      {buttonLabel}
    </button>
  );
};
