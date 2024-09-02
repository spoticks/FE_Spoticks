import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ToastProps {
  title: string;
}

interface ConfirmProps {
  title?: string | undefined;
  content?: string;
  confirmButtonText: string;
  text: string;
  functionDispatch: () => void;
}

const SuccessToast = ({ title }: ToastProps) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title,
  });
};

const ConfirmAlert = ({ title, confirmButtonText, text, functionDispatch }: ConfirmProps) => {
  MySwal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#8d8d8d",
    cancelButtonColor: "#dd4255",
    confirmButtonText,
    cancelButtonText: "취소",
  }).then((result: { isConfirmed: boolean }) => {
    if (result.isConfirmed) {
      SuccessToast({ title: text });
      functionDispatch();
    }
  });
};

export { SuccessToast, ConfirmAlert };
