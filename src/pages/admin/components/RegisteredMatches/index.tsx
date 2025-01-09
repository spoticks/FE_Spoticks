import { useState } from "react";
import Loading from "@/common/components/atoms/Loading";
import { MainMatchType } from "@/common/types/matchTypes";
import Pagination from "@/common/components/molecules/Pagination";
import TableSportFilter from "./TableSportFilter";
import MatchListBody from "./MatchListBody";
import DetailModal from "@/pages/admin/components/DetailModal";
import useAdminData from "@/pages/admin/components/hooks/useAdminData";

const RegisteredMatchList = ({
  selectedSport,
  setSelectedSport,
}: {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: matches, isFetching } = useAdminData(selectedSport, currentPage);

  const totalPages = matches?.pageInfo?.totalPages || 1;
  const currentPageData = matches?.content.filter(
    (_, index) => Math.floor(index / matches.pageInfo.size) + 1 === currentPage,
  );

  // Modal 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MainMatchType | null>(null);

  const handleModalOpen = (match: MainMatchType) => {
    if (isModalOpen) return;
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const tableHeaders = ["경기일", "경기시작", "홈팀", "어웨이팀"];

  return (
    <>
      <div className={`main-content p-4 ${isModalOpen ? "inert" : ""}`}>
        <table className="min-w-full rounded-[10px] bg-white">
          <thead>
            <tr className="w-full border-b border-borders text-left text-[#B5B7C0]">
              {tableHeaders.map((header, idx) => (
                <th key={idx} className="p-4">
                  {header}
                </th>
              ))}
              <th className="p-4">
                <TableSportFilter
                  selectedSport={selectedSport}
                  setSelectedSport={setSelectedSport}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData ? (
              <MatchListBody matches={matches?.content} onMatchSelect={handleModalOpen} />
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="p-4 text-center">
                  {isFetching ? <Loading /> : "데이터가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* 상세 모달 */}
      {selectedMatch && (
        <DetailModal isOpen={isModalOpen} onClose={handleModalClose} match={selectedMatch} />
      )}
    </>
  );
};
export default RegisteredMatchList;
