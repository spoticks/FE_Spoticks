import { MatchData } from "../../../type";
import Button from "../../../common/components/atoms/Button";
import MainMatchTeam from "./MainMatchTeam";

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
