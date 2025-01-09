import { Link } from "react-router-dom";
import { MainMatchType } from "@/common/types/matchTypes";
import { TimeButton } from "@/common/components/atoms/button/TimeButton";
import TableCell from "./TableCell";
import Pagination from "@/common/components/molecules/Pagination";
import { PageInfoProps } from "@/common/types/matchTypes";
import TableHeader from "./TableHeader";
import Loading from "@/common/components/atoms/Loading";

interface ReservationListProps {
  filterData: MainMatchType[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageInfo: PageInfoProps | Record<string, number>;
  isLoading: boolean;
  selectedTeam: string;
  onlyHomeGames: boolean;
  setOnlyHomeGames: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReservationList = ({
  filterData,
  setCurrentPage,
  currentPage,
  pageInfo,
  isLoading,
  selectedTeam,
  onlyHomeGames,
  setOnlyHomeGames,
}: ReservationListProps) => {
  const totalPages = pageInfo.totalPages || 1;

  const columnName = ["Home", "Away", "장소", "날짜", ""];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleHomeGamesFilter = () => {
    setOnlyHomeGames((prev) => !prev);
  };

  return (
    <div>
      {selectedTeam !== "전체 일정" && (
        <div className="mb-2">
          <label className="flex items-center space-x-2 text-xs">
            <input type="checkbox" checked={onlyHomeGames} onChange={toggleHomeGamesFilter} />
            <span>홈 경기만 보기</span>
          </label>
        </div>
      )}
      <table className="mx-[-10px] w-full border-separate border-spacing-x-[10px]">
        <TableHeader columns={columnName} />
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columnName.length} className="py-4 text-center">
                <Loading />
              </td>
            </tr>
          ) : filterData.length > 0 ? (
            filterData.map((match, index) => (
              <tr
                key={match.gameId}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-[20px]`}
              >
                <TableCell>{match.homeTeamName}</TableCell>
                <TableCell>{match.awayTeamName}</TableCell>
                <TableCell>{match.stadiumName}</TableCell>
                <TableCell>{match.gameStartTime.split("T")[0]}</TableCell>
                <TableCell>
                  <Link
                    to={`/reservation/${match.gameId}`}
                    state={{ match: match }}
                    className="cursor-pointer"
                  >
                    <TimeButton
                      timeOnSale={match.timeOnSale}
                      timeOffSale={match.timeOffSale}
                      label="예매하기"
                      className="w-26 flex items-center justify-center rounded-[10px] px-5 py-1 text-xs text-foreground"
                    />
                  </Link>
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnName.length} className="text-center">
                해당 팀의 경기가 없습니다!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && !isLoading && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
