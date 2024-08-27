import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { InformationCardProp } from "../type";

export default function InformationCard({
  content: { homeTeamName, awayTeamName, gameStartTime, stadiumName, reservationStatus },
}: {
  content: InformationCardProp;
}) {
  const [date, time] = gameStartTime.split("T");
  const [hours, minutes] = time.split(":");

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
          <span className="text-xs text-Accent">{reservationStatus ? "예매완료" : "예매취소"}</span>
        )}
      </div>
    </div>
  );
}
