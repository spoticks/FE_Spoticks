import { useEffect, useState } from "react";
import Main from "@/pages/MatchList/components/Main";
import MatchListTab from "@/pages/MatchList/components/ui/Tab";
import Error from "@/pages/ErrorPage";
import Loading from "@/common/components/atoms/Loading";
import MatchDetailMenu from "@/pages/MatchList/components/ui/MatchDetailMenu";
import { ContentProps, PageInfoProps } from "@/common/types/type";
import { useMatchApi } from "./api/api";
import { getTeamId } from "@/common/utils/getTeamId";
import { useNavigate } from "react-router-dom";

interface MatchListProps {
  sport: string;
}

export default function MatchList({ sport }: MatchListProps) {
  const navigate = useNavigate();
  // Tab에서 선택된 team
  const [selectedTeam, setSelectedTeam] = useState("");
  const [filterData, setFilterData] = useState<ContentProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEl, setTotatlEl] = useState(0);
  console.log("filterData :", filterData);
  console.log("currentPage :", currentPage);
  const {
    data: matchData = { content: [], pageInfo: {} as PageInfoProps },
    isLoading,
    error,
  } = useMatchApi({ sport, selectedTeam: selectedTeam || "전체 일정", page: currentPage });

  useEffect(() => {
    setSelectedTeam("");
    navigate(`/match-list/${sport}`);
  }, [sport]);
  console.log("data :", matchData);
  useEffect(() => {
    if (selectedTeam) {
      if (selectedTeam === "전체 일정") {
        setFilterData([]);
        setCurrentPage(1);
        setTotatlEl(matchData.pageInfo.totalElements);
        setFilterData(matchData.content);
        navigate(`/match-list/${sport}/allSche`);
      } else {
        const selectedTeamId = getTeamId(sport, selectedTeam);
        if (selectedTeamId) {
          const filteredMatches = matchData.content.filter(
            (game) => game.homeTeam === selectedTeam || game.awayTeam === selectedTeam,
          );
          setFilterData(filteredMatches);
        }
      }
    }
  }, [matchData, navigate, selectedTeam, sport]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="flex w-content-width flex-row pt-10">
      {(matchData.content.length > 0 || (selectedTeam && filterData.length === 0)) && (
        <MatchListTab sport={sport} setSelectedTeam={setSelectedTeam} />
      )}
      <div className="flex w-full pl-[30px]">
        {selectedTeam === "전체 일정" || selectedTeam ? (
          <MatchDetailMenu
            selectedTeam={selectedTeam}
            filterData={filterData}
            sport={sport}
            setCurrentPage={setCurrentPage}
            totalEl={totalEl}
          />
        ) : (
          <Main sceduleLen={matchData.content.length} sport={sport} />
        )}
      </div>
    </div>
  );
}
