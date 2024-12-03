import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useHistoryModal(id?: number, isInfoModal?: true) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  function handleModalOpen() {
    setIsModalOpen(true);
  }
  function handleModalClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (
      location.pathname === "/profile/my-tickets/my-reservations" ||
      location.pathname === "/profile/my-tickets/cancellation-history"
    ) {
      // 모달을 연 상태에서 뒤로가기를 눌러 /profile/my-tickets/my-reservations 혹은 /profile/my-tickets/cancellation-history 로 이동한 경우
      setIsModalOpen(false);
    } else if (isInfoModal && !isModalOpen && location.pathname.split("/")[4] === String(id)) {
      // isInfoModal이 true 고 모달이 닫혀있을경우
      // 경로가 /profile/my-tickets/my-reservations/:id 로 되었을 경우
      setIsModalOpen(true);
    }
  }, [location.pathname, id, isModalOpen, isInfoModal]);

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
}
