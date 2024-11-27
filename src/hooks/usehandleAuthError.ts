import { queryClient } from "@/App";
import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import getErrorToastMessage from "@/common/utils/getErrorToastMessage";
import { isAxiosError } from "axios";

export default function useHandleAuthError(error: Error) {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data.message;
    if (status === 401) {
      useAuthStore.getState().logout();
      queryClient.clear();
    }
    const toastMessage = getErrorToastMessage(message);
    alertToast(toastMessage, "error");
  }
}
