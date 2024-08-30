import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { InformationCardProp } from "../type";
import { useEffect, useState } from "react";
import InformationModal from "./InformationModal";
import { useLocation, useNavigate } from "react-router-dom";

export default function InformationCard({
  content: { homeTeamName, awayTeamName, gameStartTime, stadiumName, reservationStatus, id },
}: {
  content: InformationCardProp;
}) {
  const [date, time] = gameStartTime.split("T");
  const [hours, minutes] = time.split(":");
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    navigate(`${id}`);
    setIsModalOpen(true);
  }
  function handleModalClose() {
    // /:id 에서 / 로 이동
    navigate(-1);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (
      location.pathname === "/profile/my-tickets/my-reservations" ||
      location.pathname === "/profile/my-tickets/cancellation-history"
    ) {
      // 모달을 연 상태에서 뒤로가기를 눌러 /profile/my-tickets/my-reservations 혹은 /profile/my-tickets/cancellation-history 로 이동한 경우
      setIsModalOpen(false);
    } else if (!isModalOpen) {
      setIsModalOpen(true);
    }
    ("여기임");
  }, [location.pathname]);
  return (
    <div className="w-[400px] rounded-[15px] border border-borders bg-foreground shadow-first">
      <div className="p-[20px]">
        <div className="mb-2 border-b border-borders pb-2">
          <span className="font-bold">
            {homeTeamName} vs {awayTeamName}
          </span>
          <div className="mt-3 flex items-center gap-3">
            <BsCalendar2EventFill className="size-4" />
            <div className="flex flex-col text-xs">
              <span className="">{date}</span>
              <span className="text-text-tertiary">
                {hours}:{minutes}
              </span>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <MdLocationOn className="size-4" />
            <span className="text-xs">{stadiumName}</span>
          </div>
        </div>
        {reservationStatus !== undefined && (
          <button className="text-xs text-Accent" onClick={handleModalOpen}>
            상세정보
          </button>
        )}
      </div>
      <InformationModal isOpen={isModalOpen} onClose={handleModalClose} reservationId={id} />
    </div>
  );
}
