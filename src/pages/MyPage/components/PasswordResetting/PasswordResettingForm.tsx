import BasicButton from "@/common/components/atoms/button/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import { PasswordSettingFormType } from "@/common/types/formTypes";
import { passwordSettingSchema } from "@/common/validationSchema";
import usePasswordResettingMutation from "@/pages/MyPage/api/usePasswordResettingMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PasswordResettingForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<PasswordSettingFormType>({
    resolver: zodResolver(passwordSettingSchema),
    mode: "all",
  });
  const onSubmit = usePasswordResettingMutation(reset);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        isLabelRequired
        label="현재 비밀번호"
        register={register("password")}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        isLabelRequired
        label="새 비밀번호"
        register={register("newPassword")}
        error={errors.newPassword}
        inputType="password"
      />
      <FormInputField
        isLabelRequired
        label="비밀번호 확인"
        register={register("newPasswordConfirmation")}
        error={errors.newPasswordConfirmation}
        inputType="password"
      />
      <BasicButton content="비밀번호 변경" disabled={!isValid} style="mt-4 btn-red" />
    </form>
  );
}
