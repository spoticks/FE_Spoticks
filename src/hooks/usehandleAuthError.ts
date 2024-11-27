import { queryClient } from "@/App";
import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import getErrorToastMessage from "@/common/utils/getErrorToastMessage";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function useHandleAuthError(error: Error) {
  const navigate = useNavigate();
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data.message;
    if (status === 401) {
      useAuthStore.getState().logout();
      queryClient.clear();
    } else if (status === 403) {
      navigate(-1);
    }
    const toastMessage = getErrorToastMessage(message);
    alertToast(toastMessage, "error");
  }
}
