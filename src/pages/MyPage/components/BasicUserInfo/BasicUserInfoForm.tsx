import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import Loading from "@/common/components/atoms/Loading";
import FormInputField from "@/common/components/molecules/FormInputField";
import { BasicInformation } from "@/common/types/formTypes";
import validationRules from "@/common/validationRules";
import ErrorPage from "@/pages/ErrorPage";
import useGetMemberInfo from "@/pages/MyPage/api/useGetMemberInfo";
import formatPhoneNumber from "@/pages/MyPage/utils/formatPhoneNumber";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function BasicUserInfoForm({ memberId }: { memberId: number }) {
  const { isLoading, data, isError } = useGetMemberInfo(memberId);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<BasicInformation>({
    mode: "onTouched",
    defaultValues: {
      // 초기값 설정.
      phoneNumber: "",
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        phoneNumber: formatPhoneNumber(data.phoneNumber),
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  const { phoneNumber } = watch();

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
      <BasicButton
        content="변경사항 저장"
        disabled={!isValid || phoneNumber === formatPhoneNumber(data.phoneNumber)}
        style={RED_BUTTON_STYLE_AUTH}
      />
    </form>
  );
}
