import { useState } from "react";
import { Link } from "react-router-dom";
import { Content } from "../../common/types/type";
import { TimeButton } from "../../common/components/atoms/TimeButton";
interface ReservationListProps {
  filterData: Content[];
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
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <td className="border px-4 py-2">{match.homeTeamName}</td>
              <td className="border px-4 py-2">{match.awayTeamName}</td>
              <td className="border px-4 py-2">{match.stadiumName}</td>
              <td className="border px-4 py-2">{match.gameStartTime.split("T")[0]}</td>
              <td className="border px-4 py-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewMatches < filterData.length && (
        <div className="mt-4 flex justify-center">
          <button onClick={addViewClick} className="rounded bg-Accent px-4 py-2 text-white">
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
