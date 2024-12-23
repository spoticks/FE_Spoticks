import { SeatDataProps } from "@/common/types/seatTypes";

interface dataProps {
  data?: SeatDataProps;
}
export default function ReservationHeader({ data }: dataProps) {
  //날짜
  const matchDate = `${data?.game.gameStartTime.split("T")[0]} ${data?.game.gameStartTime
    .split("T")[1]
    .slice(0, 5)}`;

  return (
    <>
      <div className="mt-4 flex flex-row items-center justify-between">
        <h3 className="flex items-center rounded-[10px] border-[2px] border-borders px-2 text-[18px] font-bold">
          경기 목록
        </h3>
        <div className="flex-1 text-center">
          <span className="inline-block rounded-[10px] bg-[#d9d9d9] px-1 text-[18px] font-bold">
            좌석 선택
          </span>
        </div>
      </div>
      <h1 className="text-[40px] font-extrabold">
        {data?.game.homeTeamName} vs {data?.game.awayTeamName}
      </h1>
      <div className="text-[18px] font-bold">
        {data?.game.stadiumName} <span>{matchDate}</span>
      </div>
    </>
  );
}
