import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import useAuthStore from "@/common/stores/authStore";
import { BasicInformation } from "@/common/types/formTypes";
import validationRules from "@/common/validationRules";
import { useForm, SubmitHandler } from "react-hook-form";

export default function BasicUserInfoForm() {
  const { memberName, phoneNumber } = useAuthStore((state) => state);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<BasicInformation>({
    mode: "onTouched",
    defaultValues: {
      // 초기값 설정. 이름, 연락처, 이메일 값임.
      phoneNumber: phoneNumber as string,
      name: memberName as string,
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
      <BasicButton content="변경사항 저장" disabled={!isValid} style={RED_BUTTON_STYLE_AUTH} />
    </form>
  );
}
