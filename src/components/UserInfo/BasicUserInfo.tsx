import { validationRules } from "../../validationRules";
import Button from "../../common/components/atoms/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthStore from "../../stores/authStore";
import BasicInfoField from "./BasicInfoField";
import { Link } from "react-router-dom";

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
  const onSubmit: SubmitHandler<BasicInfo> = (data) => {
    // 유저 정보 변경 로직
    console.log(data);
  };
  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="mb-4 flex justify-between border-b border-borders text-sm">
          <h2>기본 정보</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
          <Link
            to="/profile/account-deletion"
            className="text-borders transition-colors duration-300 hover:text-Accent"
          >
            탈퇴하기
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
