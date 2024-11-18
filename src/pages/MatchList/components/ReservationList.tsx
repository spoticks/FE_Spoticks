import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContentProps } from "@/common/types/type";
import { TimeButton } from "@/common/components/atoms/button/TimeButton";
import TdComp from "./ui/TdComp";
import BasicButton from "@/common/components/atoms/button/BasicButton";
interface ReservationListProps {
  filterData: ContentProps[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalEl: number;
}
const ReservationList = ({ filterData, setCurrentPage, totalEl }: ReservationListProps) => {
  const [viewMatches, setViewMatches] = useState<ContentProps[]>([]);

  useEffect(() => {
    // setViewMatches((prevMatches) => [...prevMatches, ...filterData]);
    setViewMatches(filterData);
  }, [filterData]);

  const addViewClick = () => {
    if (totalEl > viewMatches.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const columnName = ["Home", "Away", "장소", "날짜", ""];

  return (
    <div>
      {filterData.length > 0 ? (
        <table className="mx-[-10px] w-full border-separate border-spacing-x-[10px]">
          <thead>
            <tr>
              {columnName.map((column) => (
                <th
                  key={column}
                  className={`border px-4 py-2 text-text-primary opacity-50 ${column === "" ? "border-none bg-none" : "bg-foreground"}`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {viewMatches.map((match, index) => (
              <tr
                key={match.gameId}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[20px]`}
              >
                <TdComp>{match.homeTeam}</TdComp>
                <TdComp>{match.awayTeam}</TdComp>
                <TdComp>{match.stadium}</TdComp>
                <TdComp>{match.gameStartTime.split("T")[0]}</TdComp>
                <TdComp>
                  <Link
                    to={`/reservation/${match.gameId}`}
                    state={{ match: match }}
                    className="cursor-pointer"
                  >
                    <TimeButton
                      timeOnSale={match.timeOnSale}
                      timeOffSale={match.timeOffSale}
                      label="예매하기"
                      className="w-26 flex items-center justify-center rounded-[10px] px-8 py-1 text-xs text-foreground"
                    />
                  </Link>
                </TdComp>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>해당 팀의 경기가 없습니다!</h1>
      )}
      {totalEl > viewMatches.length && (
        <div className="mt-4 flex justify-center">
          <BasicButton
            content="더보기"
            style="rounded bg-Accent px-4 py-1 text-white"
            onClick={addViewClick}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
