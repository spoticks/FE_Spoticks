import { useActiveTime } from "../../../../hooks/useActiveTime";

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

  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`${className} transition-all duration-300 ${
        isActive ? "bg-Accent hover:bg-button-hovered" : "cursor-not-allowed bg-text-tertiary"
      }`}
    >
      {label}
    </button>
  );
};
