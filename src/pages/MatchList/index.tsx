import { useEffect, useState } from "react";
import MatchListMain from "@/pages/MatchList/components/MatchListMain";
import MatchListTab from "@/pages/MatchList/components/Tab";
import axios from "axios";

import Error from "@/pages/ErrorPage";
import { localUrl } from "@/common/constants";
import Loading from "@/common/components/atoms/Loading";
import MatchDetailMenu from "@/pages/MatchList/components/MatchDetailMenu";
import { Content } from "@/common/types/type";
import { useQuery } from "@tanstack/react-query";
interface MatchListProps {
  sport: string;
}

export default function MatchList({ sport }: MatchListProps) {
  //Tab에서 선택된 team
  const [selectedTeam, setSelectedTeam] = useState("");

  //예매일정
  const [sceduleLen, setScheduleLen] = useState(0);
  const [filterData, setFilterData] = useState<Content[]>([]);

  const {
    data: matchData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matches", sport],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/content?teamId=${sport}`);
      const nowTime = new Date();

      return res.data.filter((game: { sportName: string; timeOffSale: string }) => {
        return game.sportName === sport && new Date(game.timeOffSale) > nowTime;
      });
    },
  });

  useEffect(() => {
    if (matchData.length > 0) {
      setFilterData(
        matchData.filter(
          (data: { homeTeamName: string; awayTeamName: string }) =>
            data.homeTeamName === selectedTeam || data.awayTeamName === selectedTeam,
        ),
      );
      setScheduleLen(matchData.length);
    }
  }, [selectedTeam, matchData]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="w-content-width flex flex-row pt-10">
      <MatchListTab sport={sport} setSelectedTeam={setSelectedTeam} />
      <div className="flex w-full pl-[30px]">
        {selectedTeam === "전체 일정" ? (
          <MatchDetailMenu selectedTeam={selectedTeam} filterData={matchData} />
        ) : selectedTeam ? (
          <MatchDetailMenu selectedTeam={selectedTeam} filterData={filterData} />
        ) : (
          <MatchListMain sceduleLen={sceduleLen} sport={sport} />
        )}
      </div>
    </div>
  );
}
