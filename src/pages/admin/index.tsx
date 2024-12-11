import Loading from "@/common/components/atoms/Loading";
import { menu } from "@/common/constants";
import { MainMatchType, MatchType } from "@/common/types/matchTypes";
import DetailModal from "@/pages/admin/components/DetailModal";
import { Suspense, useState } from "react";
import Header from "./components/ui/Header";
import { useQueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAdminData from "./api/useAdminData";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import TbodyComp from "./components/ui/TbodyComp";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedSport, setSelectedSport] = useState<string>("All");
  const sports = menu.filter((el) => el !== "HOME");
  const tableHeaders = ["경기일", "경기시작", "홈팀", "어웨이팀", ""];

  // API 호출
  const {
    data: matches,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAdminData(selectedSport);
  console.log(matches);
  const totalElements = matches.pages[0]?.pageInfo?.totalElements ?? 0;

  const ref = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalElements,
  });

  // 필터링된 경기 목록
  const filteredMatches = matches.pages[0].content;

  // Modal 관련 상태
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

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sport = e.target.value;

    startTransition(() => {
      setSelectedSport(sport);
      navigate(`/admin/${sport}`);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <section className="mx-0 my-10 flex w-full flex-col justify-start">
        <Header />
        <Suspense fallback={<Loading />}>
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
                    <label htmlFor="sportFilter" className="mr-2" />
                    <select
                      id="sportFilter"
                      value={selectedSport}
                      onChange={handleSportChange}
                      className="cursor-pointer rounded border p-2 hover:text-Accent"
                    >
                      <option value="All">전체</option>
                      {sports.map((sport: string, idx: number) => (
                        <option key={idx} value={sport}>
                          {sport}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                <TbodyComp filteredMatches={filteredMatches} onMatchSelect={handleModalOpen} />
              </tbody>
            </table>
          </div>
          {isFetchingNextPage && <Loading />}
          {totalElements ? <div className="h-40" ref={ref} /> : null}
        </Suspense>

        {/* 상세 모달 */}
        {selectedMatch && (
          <DetailModal isOpen={isModalOpen} onClose={handleModalClose} match={selectedMatch} />
        )}
      </section>
    </QueryClientProvider>
  );
}
