import TeamLogo from "@/common/components/atoms/TeamLogo";

export default function MainMatchTeam({
  teamName,
  isHome = false,
}: {
  teamName: string;
  isHome?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2`}>
      {!isHome && <span className="w-20 text-sm font-bold">{teamName}</span>}
      <TeamLogo teamName={teamName} size="mainMatch" />
      {isHome && <span className="w-20 text-sm font-bold">{teamName}</span>}
    </div>
  );
}
