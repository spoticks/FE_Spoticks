const OPTIONS = [
  "자주 사용하지 않아요.",
  "UI/UX가 불편해요.",
  "광고 메세지가 많아요.",
  "할인, 쿠폰 혜택이 적어요.",
  "개인정보 유출 우려가 있어요.",
];
interface DropdownOptionsProps {
  onClick: (option: string) => void;
  optionRef: React.RefObject<HTMLUListElement>;
}
export default function DropdownOptions({ onClick, optionRef }: DropdownOptionsProps) {
  return (
    <ul className="absolute w-full rounded-b-[15px] bg-white shadow-lg" ref={optionRef}>
      {OPTIONS.map((option) => (
        <li
          key={option}
          onClick={() => onClick(option)}
          className="flex w-full justify-between rounded-[15px] bg-foreground px-3 py-2 text-[16px] text-text-tertiary transition-colors duration-100 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background"
        >
          <span>{option}</span>
        </li>
      ))}
    </ul>
  );
}
