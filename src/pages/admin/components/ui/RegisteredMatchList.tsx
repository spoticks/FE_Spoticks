import { useState } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import DetailModal from "@/pages/admin/components/DetailModal";
import Loading from "@/common/components/atoms/Loading";
import { AdminMatchType } from "@/common/types/matchTypes";
import TbodyComp from "./TbodyComp";
import useAdminData from "../../api/useAdminData";

const RegisteredMatchList = ({ selectedSport }: { selectedSport: string }) => {
  const {
    data: matches,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAdminData(selectedSport);

  const totalElements = matches.pages[0]?.pageInfo?.totalElements ?? 0;

  const ref = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalElements,
  });

  // Modal 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<AdminMatchType | null>(null);

  const handleModalOpen = (match: AdminMatchType) => {
    if (isModalOpen) return;
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const tableHeaders = ["경기일", "경기시작", "홈팀", "어웨이팀", ""];

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
            </tr>
          </thead>
          <tbody>
            <TbodyComp
              matches={matches.pages}
              onMatchSelect={handleModalOpen}
              totalElements={totalElements}
            />
          </tbody>
        </table>
      </div>
      {isFetchingNextPage && <Loading />}
      {totalElements ? <div className="h-40" ref={ref} /> : null}

      {/* 상세 모달 */}
      {selectedMatch && (
        <DetailModal isOpen={isModalOpen} onClose={handleModalClose} match={selectedMatch} />
      )}
    </>
  );
};
export default RegisteredMatchList;
