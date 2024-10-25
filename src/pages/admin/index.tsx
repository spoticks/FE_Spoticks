import Loading from "@/common/components/atoms/Loading";
import { menu } from "@/common/constants";
import { ContentProps, Match } from "@/common/types/type";
import DetailModal from "@/pages/admin/components/DetailModal";
import useAxios from "@/hooks/useAxios";
import ErrorPage from "@/pages/ErrorPage";

import { useState } from "react";
import Header from "./components/Header";
import Pagination from "./components/Pagination";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSport, setSelectedSport] = useState<string>("All");
  const sports = menu.filter((el) => el !== "HOME");
  const tableHeaders = ["경기일", "경기시작", "홈팀", "어웨이팀", ""];

  const initialMatches: Match = {
    content: [],
    pageInfo: {
      totalPages: 0,
      totalElements: 0,
      page: 0,
      size: 0,
    },
  };

  // API 호출
  const {
    data: matches = initialMatches,
    isError,
    isLoading,
  } = useAxios<Match>(["matches", selectedSport, String(currentPage)], {
    config: {
      url: "/admin/games",
      method: "GET",
    },
    params: { ...(selectedSport !== "All" && { sport: selectedSport }), page: currentPage },
  });

  // 필터링된 경기 목록
  const filteredMatches =
    selectedSport === "All"
      ? matches.content
      : matches.content.filter((match: ContentProps) => match.sport === selectedSport);

  // 페이지네이션 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Modal 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<ContentProps | null>(null);

  const handleModalOpen = (match: ContentProps) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (matches.pageInfo.totalElements === 0) {
    return <h1>경기가 없습니다.</h1>;
  }

  return (
    <div className="mx-0 my-10 flex w-full flex-col justify-start">
      <Header />
      <div className="p-4">
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
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="cursor-pointer rounded border p-2 hover:text-Accent"
                >
                  <option value="All">종목선택</option>
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
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match: ContentProps, index) => (
                <tr key={index} className="border-b border-borders">
                  <td className="p-4">{match.gameStartTime.split("T")[0]}</td>
                  <td className="p-4">{match.gameStartTime.split("T")[1].slice(0, 5)}</td>
                  <td className="p-4">{match.homeTeam}</td>
                  <td className="p-4">{match.awayTeam}</td>
                  <td className="p-4 pl-8">{match.sport}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleModalOpen(match)}
                      className="flex cursor-pointer items-center justify-center rounded bg-Accent px-6 py-2 text-white hover:opacity-75"
                    >
                      경기상세
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  No matches available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <Pagination
          totalPages={matches.pageInfo.totalPages}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>

      {/* 상세 모달 */}
      {isModalOpen && selectedMatch && (
        <DetailModal isOpen={isModalOpen} onClose={handleModalClose} match={selectedMatch} />
      )}
    </div>
  );
}
