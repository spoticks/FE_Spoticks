import Button from "@/common/components/atoms/Button";
import FormInputField from "@/common/components/molecules/FormInputField";
import useAuthStore from "@/common/stores/authStore";
import { BasicInformation } from "@/common/types/formTypes";
import { validationRules } from "@/common/validationRules";
import { useForm, SubmitHandler } from "react-hook-form";

export default function BasicUserInfoForm() {
  const { userName, phoneNumber } = useAuthStore((state) => state);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<BasicInformation>({
    mode: "onTouched",
    defaultValues: {
      // 초기값 설정. 이름, 연락처, 이메일 값임.
      phoneNumber: phoneNumber as string,
      name: userName as string,
    },
  });

  const onSubmit: SubmitHandler<BasicInformation> = (data) => {
    // 유저 정보 변경 로직
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        isLabelRequired
        label="연락처"
        register={register("phoneNumber", validationRules.phoneNumber)}
        error={errors.phoneNumber}
        inputType="text"
      />
      <Button content="변경사항 저장" isValid={isValid} />
    </form>
  );
}
