import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const basicToast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  target: "main",
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
    toast.onclick = () => MySwal.close();
  },
  width: "auto",
  customClass: {
    container: "absolute p-0",
    popup: "rounded-[10px] text-xs",
  },
});

export default basicToast;
