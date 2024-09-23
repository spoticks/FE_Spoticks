import InputLabel from "@/components/UserInfo/InputLabel";
import usePopover from "@/hooks/usePopover";
import { AccountDeletionFormType } from "@/type";
import { Control, Controller } from "react-hook-form";

const OPTIONS = [
  "자주 사용하지 않아요.",
  "UI/UX가 불편해요.",
  "광고 메세지가 많아요.",
  "할인, 쿠폰 혜택이 적어요.",
  "개인정보 유출 우려가 있어요.",
];

export default function ReasonSelect({ control }: { control: Control<AccountDeletionFormType> }) {
  const {
    isPopoverOpen: isOpen,
    setIsPopoverOpen: setIsOpen,
    popoverRef: optionRef,
  } = usePopover();

  return (
    <>
      <InputLabel label="무엇이 불편하셨나요?" />
      <Controller
        name="reason"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <div className="relative">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
                if (isOpen) {
                  field.onChange("");
                }
              }}
              className={`${isOpen ? "rounded-t-[15px]" : "rounded-[15px]"} flex w-full justify-between bg-foreground px-3 py-2 text-[16px] transition-colors duration-300 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background`}
            >
              <span>
                {(isOpen && "무엇이 불편하셨나요?") || field.value || "무엇이 불편하셨나요?"}
              </span>
              <div>{isOpen ? "▲" : "▼"}</div>
            </div>
            {isOpen && (
              <ul className="absolute w-full rounded-b-[15px] bg-white shadow-lg" ref={optionRef}>
                {OPTIONS.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      field.onChange(option);
                      setIsOpen(false);
                    }}
                    className="flex w-full justify-between rounded-[15px] bg-foreground px-3 py-2 text-[16px] text-text-tertiary transition-colors duration-100 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background"
                  >
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
    </>
  );
}
