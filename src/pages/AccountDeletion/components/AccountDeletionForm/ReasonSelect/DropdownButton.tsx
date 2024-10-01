interface DropdownButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isOpen: boolean;
  label: string;
}

export default function DropdownButton({ onClick, isOpen, label }: DropdownButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`${isOpen ? "rounded-t-[15px]" : "rounded-[15px]"} flex w-full justify-between bg-foreground px-3 py-2 text-[16px] transition-colors duration-300 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background`}
    >
      <span>{label}</span>
      <div>{isOpen ? "▲" : "▼"}</div>
    </div>
  );
}
