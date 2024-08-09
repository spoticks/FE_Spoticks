import Button from "../../Button";
import MainMatchTeam from "./MainMatchTeam";

interface MatchData {
  gameId: number;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
  gameStartTime: string;
}

export default function MainMatchInfo({ matchData }: { matchData: MatchData }) {
  return (
    <div className="flex items-center gap-4 rounded border border-borders bg-foreground p-4">
      <MainMatchTeam teamName={matchData.homeTeamName} isHome />
      <span className="font-extrabold">VS</span>
      <MainMatchTeam teamName={matchData.awayTeamName} />
      <Button content="예매하기" />
    </div>
  );
}
