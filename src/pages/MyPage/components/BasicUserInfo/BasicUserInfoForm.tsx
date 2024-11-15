import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import Loading from "@/common/components/atoms/Loading";
import FormInputField from "@/common/components/molecules/FormInputField";
import ErrorPage from "@/pages/ErrorPage";
import useGetMemberInfo from "@/pages/MyPage/api/useGetMemberInfo";
import useUpdatePhoneNumberMutation from "@/pages/MyPage/api/useUpdatePhoneNumberMutation";
import useDuplicationCheck from "@/pages/SignUp/utils/useDuplicationCheck";
import { useEffect } from "react";

export default function BasicUserInfoForm() {
  const { isLoading, data, isError } = useGetMemberInfo();
  const { isSuitable, checkDuplication, register, handleSubmit, errors, isValid, reset, watch } =
    useDuplicationCheck(true);
  useEffect(() => {
    if (data) {
      reset({
        phoneNumber: data.phoneNumber,
      });
    }
  }, [data, reset]);
  const onSubmit = useUpdatePhoneNumberMutation();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  const { phoneNumber } = watch();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="- 제외 휴대전화 번호"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
        inputType="text"
        onBlur={() => {
          checkDuplication("phoneNumber");
        }}
        isAlertMessage={isSuitable.phoneNumber && !errors.phoneNumber}
        message="사용할 수 있는 전화번호 입니다!"
      />
      <BasicButton
        content="변경사항 저장"
        disabled={!isValid || phoneNumber === data.phoneNumber || !isSuitable.phoneNumber}
        style={RED_BUTTON_STYLE_AUTH}
      />
    </form>
  );
}
