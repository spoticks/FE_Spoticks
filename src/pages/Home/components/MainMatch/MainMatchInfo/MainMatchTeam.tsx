import TeamLogo from "@/common/components/atoms/TeamLogo";

export default function MainMatchTeam({
  homeTeam,
  awayTeam,
}: {
  homeTeam: string;
  awayTeam: string;
}) {
  return (
    <div className="mb-6 mt-4 flex w-full items-center justify-between">
      <TeamLogo teamName={homeTeam} size="mainMatch" />
      <div className="mx-2 flex flex-1 flex-col justify-center gap-2">
        <p className="text-center text-sm font-bold">{homeTeam}</p>
        <p className="font-extrabold text-text-tertiary">VS</p>
        <p className="text-center text-sm font-bold">{awayTeam}</p>
      </div>
      <TeamLogo teamName={awayTeam} size="mainMatch" />
    </div>
  );
}
