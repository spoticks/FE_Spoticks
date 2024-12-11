import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainMatchType } from "@/common/types/matchTypes";
import { TimeButton } from "@/common/components/atoms/button/TimeButton";
import TdComp from "./ui/TdComp";
import BasicButton from "@/common/components/atoms/button/BasicButton";
interface ReservationListProps {
  filterData: MainMatchType[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalEl: number;
  selectedTeam: string;
  currentPage: number;
  pageSize: number;
}
const ReservationList = ({
  filterData,
  setCurrentPage,
  totalEl,
  selectedTeam,
  currentPage,
  pageSize,
}: ReservationListProps) => {
  const [allMatches, setAllMatches] = useState<MainMatchType[]>([]); // 누적 데이터
  const [viewMatches, setViewMatches] = useState<MainMatchType[]>([]); // 화면에 보여질 데이터

  useEffect(() => {
    // 초기화
    setAllMatches([]);
    setViewMatches([]);
    setCurrentPage(1);
  }, [selectedTeam]);

  useEffect(() => {
    setAllMatches((prevMatches) => {
      const newMatches = filterData.filter(
        (match) => !prevMatches.some((prev) => prev.gameId === match.gameId),
      );
      return [...prevMatches, ...newMatches];
    });
  }, [filterData]);

  useEffect(() => {
    setViewMatches(allMatches.slice(0, currentPage * pageSize));
  }, [allMatches, currentPage]);

  const addViewClick = () => {
    if (viewMatches.length < totalEl) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const columnName = ["Home", "Away", "장소", "날짜", ""];

  return (
    <div>
      {allMatches.length > 0 ? (
        <table className="mx-[-10px] w-full border-separate border-spacing-x-[10px]">
          <thead>
            <tr>
              {columnName.map((column) => (
                <th
                  key={column}
                  className={`border px-4 py-2 text-text-primary opacity-50 ${
                    column === "" ? "border-none bg-none" : "bg-foreground"
                  }`}
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
      {viewMatches.length < totalEl && (
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
