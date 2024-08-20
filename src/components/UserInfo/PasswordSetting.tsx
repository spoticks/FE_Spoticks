import { PasswordSettingForm, validationRules } from "../../validationRules";
import Button from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import BasicInfoField from "./BasicInfoField";

export default function PasswordSetting() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<PasswordSettingForm>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<PasswordSettingForm> = (data) => {
    const { passwordConfirmation, ...formData } = data;
    // 비밀번호 변경 양식 제출 로직
    console.log(passwordConfirmation, formData);
  };
  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="mb-4 flex justify-between border-b border-borders text-sm">
          <h2>비밀번호 변경</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <BasicInfoField
            label="현재 비밀번호"
            register={register("originalPassword", validationRules.password)}
            error={errors.originalPassword}
            type="password"
          />
          <BasicInfoField
            label="새 비밀번호"
            register={register("password", validationRules.password)}
            error={errors.password}
            type="password"
          />
          <BasicInfoField
            label="비밀번호 확인"
            register={register("passwordConfirmation", {
              ...validationRules.passwordConfirmation,
              validate: (value) => validationRules.passwordConfirmation.validate(value, getValues),
            })}
            error={errors.passwordConfirmation}
            type="password"
          />
          <Button content="비밀번호 변경" isValid={isValid} />
        </form>
      </div>
    </section>
  );
}
