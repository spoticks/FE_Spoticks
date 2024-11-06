import { RED_BUTTON_STYLE_AUTH } from "@/common/buttonStyles";
import BasicButton from "@/common/components/atoms/button/BasicButton";
import FormInputField from "@/common/components/molecules/FormInputField";
import { AuthFormType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { signUpFormSchema } from "@/common/validationSchema";
import useSignUpMutation from "@/pages/SignUp/api/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const { onSubmit } = useSignUpMutation();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setError,
  } = useForm<AuthFormType>({ resolver: zodResolver(signUpFormSchema), mode: "all" });
  const [isSuitable, setIsSuitable] = useState({
    userName: false,
    phoneNumber: false,
  });

  async function onCheckDuplication(content: "userName" | "phoneNumber") {
    const { [content]: value } = getValues();
    if (errors[content]?.message || !value.length) {
      setIsSuitable((prev) => ({ ...prev, [content]: false }));
      return;
    }
    try {
      const response = await axiosInstance(
        `${content === "userName" ? "join/user-name" : "join/phone-number"}`,
        {
          params: { [content]: value },
        },
      );
      // 응답이 정상적으로 왔을 경우
      if (response.status === 200) {
        alertToast(
          `사용할 수 있는 ${content === "userName" ? "아이디" : "전화번호"} 입니다!`,
          "success",
          "top",
        );
        setIsSuitable((prev) => ({ ...prev, [content]: true }));
      }
    } catch (error) {
      // 상태 false로 만들어줌
      setIsSuitable((prev) => ({ ...prev, [content]: false }));
      // AxiosError로 에러 타입 좁히기
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response?.status;
          // 400 = 중복일 경우
          if (status >= 400) {
            alertToast(
              `중복된 ${content === "userName" ? "아이디" : "전화번호"} 입니다!`,
              "error",
              "top",
            );
            // 에러 커스텀 세팅
            setError(content, {
              type: "custom",
              message: `중복된 ${content === "userName" ? "아이디" : "전화번호"} 입니다!`,
            });
          }
        } else if (error.request) {
          // 요청을 보냈지만 응답이 없을 경우
          alertToast("서버로부터 응답이 없습니다!", "error");
        }
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error");
      }
    }
  }

  return (
    <form className="my-4 flex w-64 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <FormInputField
        label="아이디"
        register={register("userName")}
        error={errors.userName}
        inputType="text"
        onBlur={() => {
          onCheckDuplication("userName");
        }}
        isAlertMessage={isSuitable.userName && !errors.userName}
        message="사용할 수 있는 아이디 입니다!"
      />
      <FormInputField
        label="- 제외 휴대전화 번호"
        register={register("phoneNumber")}
        error={errors.phoneNumber}
        inputType="text"
        onBlur={() => {
          onCheckDuplication("phoneNumber");
        }}
        isAlertMessage={isSuitable.phoneNumber && !errors.phoneNumber}
        message="사용할 수 있는 전화번호 입니다!"
      />
      <FormInputField
        label="이름"
        register={register("memberName")}
        error={errors.memberName}
        inputType="text"
      />

      <FormInputField
        label="비밀번호"
        register={register("password")}
        error={errors.password}
        inputType="password"
      />
      <FormInputField
        label="비밀번호 재확인"
        register={register("passwordConfirmation")}
        error={errors.passwordConfirmation}
        inputType="password"
      />
      <BasicButton
        content="회원가입 하기"
        disabled={!isValid || !isSuitable.phoneNumber || !isSuitable.userName}
        style={RED_BUTTON_STYLE_AUTH}
      />
    </form>
  );
}
