import basicToast from "@/common/utils/basicToast";

const successToast = (title: string) => {
  basicToast.fire({
    icon: "success",
    title,
  });
};

export default successToast;
