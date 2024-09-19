import SuccessToast from "@/common/components/atoms/SuccessToast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface ConfirmProps {
  title?: string | undefined;
  content?: string;
  confirmButtonText: string;
  text: string;
  functionDispatch: () => void;
}

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

export default ConfirmAlert;
