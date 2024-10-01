import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { InformationCardProp } from "../../../../common/types/type";
import InformationModal from "../../../../components/InformationModal";
import { useNavigate } from "react-router-dom";
import useHistoryModal from "../../../../hooks/useHistoryModal";

export default function InformationCard({
  content: { homeTeamName, awayTeamName, gameStartTime, stadiumName, reservationStatus, id },
}: {
  content: InformationCardProp;
}) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useHistoryModal(true);
  const [date, time] = gameStartTime.split("T");
  const [hours, minutes] = time.split(":");
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
          <button className="text-xs text-Accent" onClick={handleInfoModalOpen}>
            상세정보
          </button>
        )}
      </div>
      <InformationModal isOpen={isModalOpen} onClose={handleInfoModalClose} reservationId={id} />
    </div>
  );
}
