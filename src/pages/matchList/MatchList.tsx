import { useEffect, useState } from "react";
import MatchListMain from "./MatchListMain";
import MatchListTab from "./Tab";
import axios from "axios";
import { Content } from "../../type";
import MatchTabList from "./MatchTabList";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../common/components/atoms/Loading";
import Error from "../Error";
import { localUrl } from "@/constants";
interface MatchListProps {
  sport: string;
}

export default function MatchList({ sport }: MatchListProps) {
  //Tab에서 선택된 team
  const [selectedTeam, setSelectedTeam] = useState("");

  //예매일정
  const [sceduleLen, setScheduleLen] = useState(0);
  // const [matchData, setMatchData] = useState<Content[]>([]);
  const [filterData, setFilterData] = useState<Content[]>([]);

  //홈구장
  // const [stadium, setStadium] = useState<string>("");

  const {
    data: matchData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matches", sport],
    queryFn: async () => {
      const res = await axios.get(`${localUrl}/content?teamId=${sport}`);
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

  // console.log('filterData :',filterData);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div className="flex w-[1280px] flex-row pt-10">
      <MatchListTab sport={sport} setSelectedTeam={setSelectedTeam} />
      <div className="flex w-full pl-[30px]">
        {selectedTeam === "전체 일정" ? (
          <MatchTabList selectedTeam={selectedTeam} filterData={matchData} />
        ) : selectedTeam ? (
          <MatchTabList selectedTeam={selectedTeam} filterData={filterData} />
        ) : (
          <MatchListMain sceduleLen={sceduleLen} sport={sport} />
        )}
      </div>
    </div>
  );
}
