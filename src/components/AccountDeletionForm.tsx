import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import usePopover from "../hooks/usePopover";
import useAuthStore from "../stores/authStore";
import { validationRules } from "../validationRules";
import Button from "./Button";
import Input from "./Input";
import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./UserInfo/InputLabel";

interface AccountDeletionForm {
  password: string;
  reason: string;
}
const options = [
  "자주 사용하지 않아요.",
  "UI/UX가 불편해요.",
  "광고 메세지가 많아요.",
  "할인, 쿠폰 혜택이 적어요.",
  "개인정보 유출 우려가 있어요.",
];

export default function AccountDeletionForm() {
  const {
    isPopoverOpen: isOpen,
    setIsPopoverOpen: setIsOpen,
    popoverRef: optionRef,
  } = usePopover();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<AccountDeletionForm>({ mode: "onTouched" });

  const onSubmit = (data: AccountDeletionForm) => {
    console.log(data);
    // 회원 탈퇴 처리 로직 추가
    // 일단 logout으로 해둠
    logout();
    navigate("/");
  };
  return (
    <section className="w-60">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel label="비밀번호 입력" />
        <Input
          label="비밀번호 입력"
          register={register("password", validationRules.password)}
          type="password"
        />
        <InputErrorMessage error={errors.password} />
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
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        field.onChange(option);
                        setIsOpen(false);
                      }}
                      className="flex w-full justify-between rounded-[15px] bg-foreground px-3 py-2 text-[16px] text-[#8d8d8d] transition-colors duration-100 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background"
                    >
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
        <Button content="탈퇴하기" isValid={isValid} />
      </form>
    </section>
  );
}
