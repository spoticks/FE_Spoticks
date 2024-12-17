import { useEffect, useState } from "react";
import Main from "@/pages/MatchList/components/Main";
import MatchListTab from "@/pages/MatchList/components/ui/Tab";
import MatchDetailMenu from "@/pages/MatchList/components/ui/MatchDetailMenu";
import { MainMatchType, PageInfoProps } from "@/common/types/matchTypes";

import { getTeamId } from "@/common/utils/getTeamId";
import { useNavigate } from "react-router-dom";
import { useMatchApi } from "./api/useMatchApi";

interface MatchListProps {
  sport: string;
}

export default function MatchList({ sport }: MatchListProps) {
  const navigate = useNavigate();
  // Tab에서 선택된 team
  const [selectedTeam, setSelectedTeam] = useState("");
  const [filterData, setFilterData] = useState<MainMatchType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEl, setTotatlEl] = useState(0);

  const { data: matchData = { content: [], pageInfo: {} as PageInfoProps } } = useMatchApi({
    sport,
    selectedTeam: selectedTeam || "전체 일정",
    page: currentPage,
  });

  // 상단탭에서 sport가 바뀌면 선택팀도 초기화됩니다.
  useEffect(() => {
    setSelectedTeam("");
  }, [sport]);

  // 왼쪽 탭에서 selectedTeam이 변경되면 경로가 변경됩니다.
  useEffect(() => {
    const path = selectedTeam ? `/${selectedTeam}` : "";
    navigate(`/match-list/${sport}${path}`);
  }, [selectedTeam, navigate, sport]);

  useEffect(() => {
    if (selectedTeam) {
      setTotatlEl(matchData.pageInfo.totalElements);
      if (selectedTeam === "전체 일정") {
        setFilterData(matchData.content);
        navigate(`/match-list/${sport}/allSche`);
      } else {
        const selectedTeamId = getTeamId(sport, selectedTeam);
        if (selectedTeamId) {
          const filteredMatches = matchData.content.filter(
            (game) => game.homeTeamName === selectedTeam || game.awayTeamName === selectedTeam,
          );
          setFilterData(filteredMatches);
        }
      }
    }
  }, [matchData, navigate, selectedTeam, sport]);

  return (
    <div className="flex w-content-width flex-row pt-10">
      {(matchData.content.length > 0 || (selectedTeam && filterData.length === 0)) && (
        <MatchListTab
          sport={sport}
          setSelectedTeam={setSelectedTeam}
          setFilterData={setFilterData}
          setCurrentPage={setCurrentPage}
        />
      )}
      <div className="flex w-full pl-[30px]">
        {selectedTeam === "전체 일정" || selectedTeam ? (
          <MatchDetailMenu
            matchData={matchData}
            selectedTeam={selectedTeam}
            setCurrentPage={setCurrentPage}
            sport={sport}
            filterData={filterData}
            totalEl={totalEl}
            currentPage={currentPage}
          />
        ) : (
          <Main sceduleLen={matchData.content.length} sport={sport} />
        )}
      </div>
    </div>
  );
}
