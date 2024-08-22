import { useForm, Controller } from "react-hook-form";
import cryingIcons from "../assets/heroicons_ticket-solid.svg";
import InputLabel from "../components/UserInfo/InputLabel";
import { validationRules } from "../validationRules";
import Input from "../components/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import Button from "../components/Button";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import usePopover from "../hooks/usePopover";

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
export default function AccountDeletion() {
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
    <>
      <div className="mb-10 border-b border-borders pb-5">
        <h1 className="text-2xl font-bold">회원탈퇴</h1>
        <span className="text-[20px] text-[#8d8d8d]">
          회원 탈퇴를 신청하기 전에 안내사항을 확인해주세요.
        </span>
      </div>
      <section className="flex">
        <span className="mr-8 text-[20px] text-[#8d8d8d]">
          탈퇴 후 해당 아이디 정보로 로그인 할 수 없으며, 보유하신 혜택(포인트, 쿠폰 등)도 사용할 수
          없습니다. <br />
          신중하게 신청해주세요.
        </span>
        <img src={cryingIcons} />
      </section>
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
              required: "이 항목은 필수입니다.",
              validate: (value) => value !== "" || "이 항목은 필수입니다.",
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
                  className="flex w-full justify-between rounded-[15px] bg-foreground px-3 py-2 text-[16px] transition-colors duration-300 hover:cursor-pointer hover:text-text-primary focus:bg-focused-input-background"
                >
                  <span>
                    {(isOpen && "무엇이 불편하셨나요?") || field.value || "무엇이 불편하셨나요?"}
                  </span>
                  <div>{isOpen ? "▲" : "▼"}</div>
                </div>
                {isOpen && (
                  <ul className="absolute w-full bg-white shadow-lg" ref={optionRef}>
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
    </>
  );
}
