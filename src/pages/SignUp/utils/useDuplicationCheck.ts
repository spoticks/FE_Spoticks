import { AuthFormType } from "@/common/types/formTypes";
import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { signUpFormSchema } from "@/common/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useDuplicationCheck() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm<AuthFormType>({ resolver: zodResolver(signUpFormSchema), mode: "all" });
  const [isSuitable, setIsSuitable] = useState({
    userName: false,
    phoneNumber: false,
  });

  async function checkDuplication(content: "userName" | "phoneNumber") {
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

  return { isSuitable, checkDuplication, register, handleSubmit, errors, isValid };
}
