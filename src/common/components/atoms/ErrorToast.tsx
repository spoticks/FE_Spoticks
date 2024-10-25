import Swal from "sweetalert2";

interface ErrorToastProps {
  text: string;
}

const ErrorToast = ({ text }: ErrorToastProps) => {
  Swal.fire({
    icon: "error",
    width: "500px",
    confirmButtonColor: "#dd4255",
    text,
  });
};

export default ErrorToast;
