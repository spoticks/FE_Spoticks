import TeamDisplay from "@/pages/Home/components/WeeklyMatches/MatchCard/TeamDisplay";

export default function WeeklyMatchTeam({
  homeTeamName,
  awayTeamName,
}: {
  homeTeamName: string;
  awayTeamName: string;
}) {
  return (
    <div className="flex items-center justify-center">
      {/* 팀 정보 */}
      <TeamDisplay teamName={homeTeamName} />
      <p className="mx-4 font-semibold">vs</p>
      <TeamDisplay teamName={awayTeamName} />
    </div>
  );
}
