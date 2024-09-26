import Input from "@/common/components/atoms/Input";
import InputErrorMessage from "@/common/components/atoms/InputErrorMessage";
import InputLabel from "@/components/UserInfo/InputLabel";
import { AccountDeletionFormType } from "@/type";
import { validationRules } from "@/validationRules";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputPasswordProps {
  register: UseFormRegister<AccountDeletionFormType>;
  errors: FieldErrors<AccountDeletionFormType>;
}

export default function PasswordInput({ register, errors }: InputPasswordProps) {
  return (
    <>
      <InputLabel label="비밀번호 입력" />
      <Input
        label="비밀번호 입력"
        register={register("password", validationRules.password)}
        type="password"
      />
      <InputErrorMessage error={errors.password} />
    </>
  );
}
