import Button from "@/common/components/atoms/Button";
import ReasonSelect from "@/pages/AccountDeletion/components/AccountDeletionForm/ReasonSelect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AccountDeletionFormType } from "@/common/types/formTypes";
import FormInputField from "@/common/components/molecules/FormInputField";
import { validationRules } from "@/validationRules";
import useAuthStore from "@/common/stores/authStore";

export default function AccountDeletionForm() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<AccountDeletionFormType>({ mode: "onTouched" });

  const onSubmit = (data: AccountDeletionFormType) => {
    console.log(data);
    // 회원 탈퇴 처리 로직 추가
    // 일단 logout으로 해둠
    logout();
    navigate("/");
  };
  return (
    <section className="w-60">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          label="비밀번호"
          register={register("password", validationRules.password)}
          error={errors.password}
          inputType="password"
        />
        <ReasonSelect control={control} />
        <Button content="탈퇴하기" isValid={isValid} />
      </form>
    </section>
  );
}
