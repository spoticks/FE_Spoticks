import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import useAuthStore from "../stores/authStore";
import { validationRules } from "../validationRules";
import InputErrorMessage from "../components/InputErrorMessage";

interface BasicInfo {
  userName: string;
  phoneNumber: string;
  email: string;
}
export default function MyPage() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<BasicInfo>({ mode: "onTouched" });

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">회원정보</h1>
        <span className="text-[#8d8d8d]">어서오세요 {userName}님</span>
      </div>
      <div className="flex gap-40">
        <section>
          <div className="flex w-64 flex-col">
            <div className="mb-4 flex justify-between border-b border-borders text-sm">
              <h2>기본 정보</h2>
              <button className="text-borders transition-colors duration-300 hover:text-Accent">
                탈퇴하기
              </button>
            </div>
            <form>
              <div className="mb-4">
                <InputLabel label="아이디" />
                <input
                  id="id"
                  className="w-full appearance-none rounded-[15px] px-3 py-2 text-[16px] transition-colors duration-300 focus:bg-focused-input-background focus:outline-none disabled:bg-borders"
                  disabled
                  value={"사용자 아이디값"}
                />
              </div>
              <div className="mb-4">
                <InputLabel label="이름" />
                <Input label="이름" register={register("userName", validationRules.name)} />
                <InputErrorMessage error={errors.userName} />
              </div>
              <div className="mb-4">
                <InputLabel label="연락처" />
                <Input
                  label="연락처"
                  register={register("phoneNumber", validationRules.phoneNumber)}
                />
                <InputErrorMessage error={errors.phoneNumber} />
              </div>
              <div className="mb-4">
                <InputLabel label="이메일" />
                <Input label="이메일" register={register("email", validationRules.email)} />
                <InputErrorMessage error={errors.email} />
              </div>
              <Button content="변경사항 저장" isValid={isValid} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

function InputLabel({ label }: { label: string }) {
  return (
    <label className="text-[14px] text-[#8d8d8d]" htmlFor={label}>
      {label}
    </label>
  );
}
