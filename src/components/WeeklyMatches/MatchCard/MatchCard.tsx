import sun from "../../../assets/icons8-sun.svg";
import { MatchData } from "../../../type";
import Button from "../../Button";
import TeamLogo from "../../TeamLogo";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = daysOfWeek[date.getDay()];

  return `${month}/${day}(${weekday})`;
}

export default function MatchCard({ data }: { data: MatchData }) {
  const { homeTeamName, awayTeamName, gameStartTime } = data;

  const hours = new Date(gameStartTime).getHours();
  const minutes = new Date(gameStartTime).getMinutes();

  return (
    <div className="flex size-52 flex-col items-center justify-between rounded-2xl border border-borders bg-foreground p-4">
      {/* 경기 카드*/}
      <div className="justify-even flex items-center gap-2">
        {/* 경기 날짜 및 기상 정보 */}
        <span>
          <span className="">{formatDate(gameStartTime)}</span>
          <span className="ml-2 font-bold">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
          </span>
        </span>
        <img src={sun} alt="sun Illustration" className="mt-[-0.3rem] size-6" />
      </div>
      <div className="flex items-center justify-center">
        {/* 팀 정보 */}
        <TeamDisplay teamName={homeTeamName} />
        <span className="mx-4 font-semibold">vs</span>
        <TeamDisplay teamName={awayTeamName} />
      </div>
      <Button content="예매하기" />
    </div>
  );
}

function TeamDisplay({ teamName }: { teamName: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <TeamLogo teamName={teamName} />
      <span className="w-16 text-center text-[16px] font-semibold">{teamName}</span>
    </div>
  );
}
