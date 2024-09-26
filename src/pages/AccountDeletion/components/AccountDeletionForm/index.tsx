import Button from "@/common/components/atoms/Button";
import PasswordInput from "@/pages/AccountDeletion/AccountDeletionForm/PasswordInput";
import ReasonSelect from "@/pages/AccountDeletion/AccountDeletionForm/ReasonSelect";
import useAuthStore from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AccountDeletionFormType } from "@/type";
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
        <PasswordInput register={register} errors={errors} />
        <ReasonSelect control={control} />
        <Button content="탈퇴하기" isValid={isValid} />
      </form>
    </section>
  );
}
