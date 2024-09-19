import { useState } from "react";
import { Link } from "react-router-dom";
import DetailModal from "./DetailModal";
import { Match } from "../../type";
import { menu } from "../../constants";
import Loading from "../../common/components/atoms/Loading";
import Error from "../Error";
import useAxios from "../../hooks/useAxios";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedSport, setSelectedSport] = useState<string>("All");

  //api
  const {
    data: matches = [],
    isError,
    isLoading,
  } = useAxios<Match[]>(["matches"], {
    config: {
      url: "/matches",
      method: "GET",
    },
    // accessToken: '나중에 추가',
  });

  // 페이지네이션 및 필터링
  const filteredMatches =
    selectedSport === "All"
      ? matches
      : matches?.filter((match) => match.sportName === selectedSport);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMatches.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sports = menu.filter((el) => el !== "HOME");

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleModalOpen = (match: Match) => {
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
    return <Error />;
  }

  return (
    <div className="mx-0 my-10 flex w-full flex-col justify-start">
      <div className="flex justify-between p-4">
        <h1 className="flex text-2xl font-bold">등록된 경기 목록</h1>
        <Link
          to={"/admin/registration"}
          state={{ mode: "create" }}
          className="cursor-pointer rounded-[10px] bg-Accent px-3 py-2 text-white hover:opacity-75"
        >
          등록하기
        </Link>
      </div>
      <div className="p-4">
        <table className="min-w-full rounded-[10px] bg-white">
          <thead>
            <tr className="w-full border-b border-borders text-left text-[#B5B7C0]">
              <th className="p-4">경기일</th>
              <th className="p-4">경기시작</th>
              <th className="p-4">홈팀</th>
              <th className="p-4">어웨이팀</th>
              <th className="p-4">
                <label htmlFor="sportFilter" className="mr-2" />
                <select
                  id="sportFilter"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="cursor-pointer rounded border p-2 hover:text-Accent"
                >
                  <option value="All">종목선택</option>
                  {sports.map((sport: string, idx: number) => {
                    return (
                      <option key={idx} value={sport}>
                        {sport}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((match, index) => (
              <tr key={index} className="border-b border-borders">
                <td className="p-4">{match.gameStartTime.split("T")[0]}</td>
                <td className="p-4">{match.gameStartTime.split("T")[1].slice(0, 5)}</td>
                <td className="p-4">{match.homeTeamName}</td>
                <td className="p-4">{match.awayTeamName}</td>
                <td className="p-4 pl-8">{match.sportName}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleModalOpen(match)}
                    className="flex cursor-pointer items-center justify-center rounded bg-Accent px-6 py-2 text-white hover:opacity-75"
                  >
                    경기상세
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredMatches.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 ${currentPage === i + 1 ? "rounded-[10px] bg-Accent text-white" : "rounded-[10px] bg-borders"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {isModalOpen && selectedMatch && (
        <DetailModal isOpen={isModalOpen} onClose={handleModalClose} match={selectedMatch} />
      )}
    </div>
  );
}
