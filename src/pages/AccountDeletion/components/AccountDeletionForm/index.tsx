import ReasonSelect from "@/pages/AccountDeletion/components/AccountDeletionForm/ReasonSelect";
import { useForm } from "react-hook-form";
import { AccountDeletionFormType } from "@/common/types/formTypes";
import FormInputField from "@/common/components/molecules/FormInputField";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/common/validationSchema";
import useAccountDeleteMutation from "@/pages/AccountDeletion/api/useAccountDeleteMutation";

export default function AccountDeletionForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<AccountDeletionFormType>({
    resolver: zodResolver(passwordSchema),
    mode: "all",
  });
  const onSubmit = useAccountDeleteMutation();
  return (
    <section className="w-60">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          label="비밀번호"
          register={register("password")}
          error={errors.password}
          inputType="password"
        />
        <ReasonSelect control={control} />
        <BasicButton content="탈퇴하기" disabled={!isValid} style="mt-4 btn-red" />
      </form>
    </section>
  );
}
