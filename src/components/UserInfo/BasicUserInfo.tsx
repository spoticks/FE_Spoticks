import { validationRules } from "../../validationRules";
import Button from "../Button";
import InputLabel from "./InputLabel";
import { useForm } from "react-hook-form";
import useAuthStore from "../../stores/authStore";
import BasicInfoField from "./BasicInfoField";

interface BasicInfo {
  userName: string;
  phoneNumber: string;
  email: string;
}

export default function BasicUserInfo() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<BasicInfo>({
    mode: "onTouched",
    defaultValues: {
      // 초기값 설정. 이름, 연락처, 이메일 값임.
      userName: userName as string,
    },
  });

  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="mb-4 flex justify-between border-b border-borders text-sm">
          <h2>기본 정보</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
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
          <BasicInfoField
            label="이름"
            register={register("userName", validationRules.name)}
            error={errors.userName}
          />
          <BasicInfoField
            label="연락처"
            register={register("phoneNumber", validationRules.phoneNumber)}
            error={errors.phoneNumber}
          />
          <BasicInfoField
            label="이메일"
            register={register("email", validationRules.email)}
            error={errors.email}
          />
          <Button content="변경사항 저장" isValid={isValid} />
        </form>
      </div>
    </section>
  );
}
