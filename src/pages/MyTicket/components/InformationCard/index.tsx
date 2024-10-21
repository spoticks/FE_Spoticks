import DefaultCard from "@/common/components/atoms/DefaultCard";
import { InformationCardProp } from "@/common/types/type";
import useHistoryModal from "@/hooks/useHistoryModal";
import InformationModal from "@/pages/MyTicket/components/modal/InformationModal";
import extractDateAndTime from "@/pages/MyTicket/utils/extractDateAndTime";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function InformationCard({
  content: { homeTeamName, awayTeamName, gameStartTime, stadiumName, reservationStatus, id },
}: {
  content: InformationCardProp;
}) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal(id, true);

  const { date, hours, minutes } = extractDateAndTime(gameStartTime);
  const navigate = useNavigate();

  function handleInfoModalOpen() {
    navigate(`${id}`);
    handleModalOpen();
  }
  function handleInfoModalClose() {
    // /:id 에서 / 로 이동
    navigate(-1);
    handleModalClose();
  }

  return (
    <DefaultCard>
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
          <button className="text-xs text-Accent" onClick={handleInfoModalOpen}>
            상세정보
          </button>
        )}
      </div>
      <InformationModal isOpen={isModalOpen} onClose={handleInfoModalClose} reservationId={id} />
    </DefaultCard>
  );
}
