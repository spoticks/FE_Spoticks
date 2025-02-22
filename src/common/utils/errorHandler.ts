import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import getErrorToastMessage from "@/common/utils/getErrorToastMessage";
import { isAxiosError } from "axios";

export default function errorHandler(error: Error) {
  if (isAxiosError(error)) {
    if (error.response) {
      // 응답 자체는 온 경우
      const status = error.response?.status;
      const message = error.response?.data.message;
      const toastMessage = getErrorToastMessage(message);
      if (status === 401 && message !== "JWT Token expired") {
        // 토큰 만료가 아닌 서명, 형식불일치 등의 문제일 경우
        useAuthStore.getState().logout();
        alertToast(toastMessage, "error");
      }
      if (status === 403) {
        // 권한 문제일 경우
        alertToast(toastMessage, "error");
      }
    } else if (error.request) {
      // 요청이 갔지만 응답이 없는 경우
      alertToast("서버로부터 응답이 없습니다!", "error");
    } else {
      // 둘 다 문제 생긴 경우
      alertToast("요청 중 문제가 발생했습니다!", "error");
    }
  }
}
