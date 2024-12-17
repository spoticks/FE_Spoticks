import useHistoryModal from "@/hooks/useHistoryModal";
import { useNavigate } from "react-router-dom";

export default function useInfoModal(reservationId: number) {
  const navigate = useNavigate();
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal(reservationId, true);

  function handleInfoModalOpen() {
    navigate(`${reservationId}`);
    handleModalOpen();
  }
  function handleInfoModalClose() {
    // /:reservationId 에서 / 로 이동
    navigate(-1);
    handleModalClose();
  }
  return { isModalOpen, handleInfoModalOpen, handleInfoModalClose };
}
