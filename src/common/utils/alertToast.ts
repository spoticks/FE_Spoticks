import basicToast from "@/common/utils/basicToast";
import { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

const alertToast = (title: string, icon: SweetAlertIcon, position?: SweetAlertPosition) => {
  basicToast.fire({
    icon,
    title,
    position: position || "top-end",
  });
};

export default alertToast;
