import { REDBUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import { PasswordSettingFormType } from "@/common/types/formTypes";
import { validationRules } from "@/common/validationRules";

import { useForm, SubmitHandler } from "react-hook-form";

export default function PasswordResettingForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<PasswordSettingFormType>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<PasswordSettingFormType> = (data) => {
    const { passwordConfirmation, ...formData } = data;
    // 비밀번호 변경 양식 제출 로직
    console.log(passwordConfirmation, formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        isLabelRequired
        label="현재 비밀번호"
        register={register("originalPassword", validationRules.password)}
        error={errors.originalPassword}
        inputType="password"
      />
      <FormInputField
        isLabelRequired
        label="새 비밀번호"
        register={register("password", validationRules.password)}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        isLabelRequired
        label="비밀번호 확인"
        register={register("passwordConfirmation", {
          ...validationRules.passwordConfirmation,
          validate: (value) => validationRules.passwordConfirmation.validate(value, getValues),
        })}
        error={errors.passwordConfirmation}
        inputType="password"
      />
      <BasicButton content="비밀번호 변경" disabled={!isValid} style={REDBUTTON_STYLE_AUTH} />
    </form>
  );
}
