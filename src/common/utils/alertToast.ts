import basicToast from "@/common/utils/basicToast";

const alertToast = (title: string, icon: "success" | "error" | "warning" | "info" | "question") => {
  basicToast.fire({
    icon,
    title,
  });
};

export default alertToast;
