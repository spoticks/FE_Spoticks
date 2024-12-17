import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import getErrorToastMessage from "@/common/utils/getErrorToastMessage";
import { isAxiosError } from "axios";

export default function errorHandler(error: Error) {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data.message;
    const toastMessage = getErrorToastMessage(message);
    if (status === 401 && message !== "JWT Token expired") {
      useAuthStore.getState().logout();
      alertToast(toastMessage, "error");
    }
    if (status === 403) {
      alertToast(toastMessage, "error");
    }
  }
}
