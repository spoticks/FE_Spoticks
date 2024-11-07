import { useState } from "react";
import { Link } from "react-router-dom";
import { ContentProps } from "@/common/types/type";
import { TimeButton } from "@/common/components/atoms/button/TimeButton";
import TdComp from "./atoms/TdComp";
import BasicButton from "@/common/components/atoms/button/BasicButton";
interface ReservationListProps {
  filterData: ContentProps[];
}
const ReservationList = ({ filterData }: ReservationListProps) => {
  const [viewMatches, setViewMatches] = useState(5);

  const addViewClick = () => {
    setViewMatches((prev) => prev + 5);
  };

  const columnName = ["Home", "Away", "장소", "날짜", ""];

  return (
    <div>
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
          {filterData.slice(0, viewMatches).map((match, index) => (
            <tr
              key={index}
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
      {viewMatches < filterData.length && (
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
