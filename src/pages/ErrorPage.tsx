import { FallbackProps } from "react-error-boundary";
import Siren from "@/assets/sirendanger.svg?react";
import BasicButton from "@/common/components/atoms/button/BasicButton";

function getErrorMessage(status: number) {
  const errMessage = {
    title: "",
    message: "",
  };
  switch (status) {
    case 404:
      errMessage.title = "페이지를 찾을 수 없습니다.";
      errMessage.message = "요청하신 페이지가 존재하지 않습니다.";
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      errMessage.title = "서버에 문제가 생겼습니다.";
      errMessage.message = "잠시 후 다시 시도하시거나 새로고침을 눌러 주세요!";
      break;
    // 기타 상태 코드 처리
    default:
      errMessage.title = "에러가 발생했습니다.";
      errMessage.message = "알 수 없는 오류가 발생했습니다.";
      break;
  }
  return errMessage;
}
export default function ErrorPage({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = { title: "", message: "" };
  if (error?.response) {
    const status = error.response?.status;
    const { title, message } = getErrorMessage(status);
    errorMessage.title = title;
    errorMessage.message = message;
  } else if (error?.request) {
    errorMessage.title = "서버에 연결할 수 없습니다.";
    errorMessage.message =
      "새로 고침을 하거나 인터넷 연결을 확인하시고, 잠시 후 다시 시도해주세요.";
  } else {
    errorMessage.title = "알 수 없는 오류가 발생했습니다.";
    errorMessage.message = "새로 고침을 하거나 잠시 후 다시 시도해주세요.";
  }
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Siren className="mb-8" />
      <div className="text-center">
        <h1>{errorMessage.title}</h1>
        <p className="mb-4">{errorMessage.message}</p>
        <BasicButton
          content="새로고침"
          style="rounded-[10px] px-2 py-1 hover:bg-button-hovered text-[20px] bg-Accent text-foreground"
          onClick={() => {
            resetErrorBoundary();
          }}
        />
      </div>
    </div>
  );
}
