import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "@/pages/MatchList/components/Main";
import MatchListTab from "@/pages/MatchList/components/MatchListTab";
import MatchDetailMenu from "@/pages/MatchList/components/MatchDetailMenu";
import { useMatch } from "./api/useMatch";
import ReservationGuide from "./components/ReservationGuide";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorPage from "../ErrorPage";

type MatchListProps = {
  sport: string;
};

export default function MatchList({ sport }: MatchListProps) {
  const navigate = useNavigate();
  const { reset } = useQueryErrorResetBoundary();
  // Tab에서 선택된 team
  const [selectedTeam, setSelectedTeam] = useState("전체 일정");
  const [currentPage, setCurrentPage] = useState(1);
  const [onlyHomeGames, setOnlyHomeGames] = useState(false);

  const { allScheduleData, teamScheduleData, isLoading, isError, error } = useMatch({
    sport,
    selectedTeam,
    page: currentPage,
    onlyHomeGames,
  });

  const matchData =
    selectedTeam && selectedTeam !== "전체 일정" && selectedTeam !== "예매 가이드"
      ? teamScheduleData
      : allScheduleData;

  // 상단탭에서 sport가 바뀌면 선택팀도 초기화됩니다.
  useEffect(() => {
    setSelectedTeam("전체 일정");
    setCurrentPage(1);
  }, [sport]);

  // 왼쪽 탭에서 selectedTeam이 변경되면 경로가 변경됩니다.
  useEffect(() => {
    startTransition(() => {
      if (selectedTeam === "전체 일정") {
        navigate(`/match-list/${sport}/allSchedule`);
      } else if (selectedTeam === "예매 가이드") {
        navigate(`/match-list/${sport}/guide`);
      } else {
        const path = selectedTeam ? `/${selectedTeam}` : "";
        navigate(`/match-list/${sport}${path}`);
      }
    });
  }, [selectedTeam, navigate, sport]);

  if (isError) {
    return <ErrorPage error={error} resetErrorBoundary={reset} />;
  }

  return (
    <div className="flex w-content-width flex-row pt-10">
      {allScheduleData.content.length > 0 && (
        <MatchListTab
          sport={sport}
          setSelectedTeam={setSelectedTeam}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
        />
      )}
      <div className="flex w-full pl-[30px]">
        {selectedTeam !== "예매 가이드" && (selectedTeam === "전체 일정" || selectedTeam) ? (
          <MatchDetailMenu
            matchData={matchData}
            selectedTeam={selectedTeam}
            setCurrentPage={setCurrentPage}
            sport={sport}
            currentPage={currentPage}
            isLoading={isLoading}
            onlyHomeGames={onlyHomeGames}
            setOnlyHomeGames={setOnlyHomeGames}
          />
        ) : selectedTeam == "예매 가이드" ? (
          <ReservationGuide />
        ) : (
          <Main scheduleLen={allScheduleData.content.length} sport={sport} />
        )}
      </div>
    </div>
  );
}
