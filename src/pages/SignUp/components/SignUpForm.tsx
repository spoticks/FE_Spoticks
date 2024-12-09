import BasicButton from "@/common/components/atoms/button/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import useSignUpMutation from "@/pages/SignUp/api/useSignUpMutation";
import useDuplicationCheck from "@/pages/SignUp/utils/useDuplicationCheck";

export default function SignUpForm() {
  const { onSubmit } = useSignUpMutation();
  const { isSuitable, checkDuplication, register, handleSubmit, errors, isValid } =
    useDuplicationCheck();

  return (
    <form className="my-4 flex w-64 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="아이디"
        register={register("userName")}
        error={errors.userName}
        inputType="text"
        onBlur={() => {
          checkDuplication("userName");
        }}
        isAlertMessage={isSuitable.userName && !errors.userName}
        message="사용할 수 있는 아이디 입니다!"
      />
      <FormInputField
        label="- 제외 휴대전화 번호"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
        inputType="text"
        onBlur={() => {
          checkDuplication("phoneNumber");
        }}
        isAlertMessage={isSuitable.phoneNumber && !errors.phoneNumber}
        message="사용할 수 있는 전화번호 입니다!"
      />
      <FormInputField
        label="이름"
        register={register("memberName")}
        error={errors.memberName}
        inputType="text"
      />

      <FormInputField
        label="비밀번호"
        register={register("password")}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        label="비밀번호 재확인"
        register={register("passwordConfirmation")}
        error={errors.passwordConfirmation}
        inputType="password"
      />
      <BasicButton
        content="회원가입 하기"
        disabled={!isValid || !isSuitable.phoneNumber || !isSuitable.userName}
        style="mt-4 btn-red"
      />
    </form>
  );
}
