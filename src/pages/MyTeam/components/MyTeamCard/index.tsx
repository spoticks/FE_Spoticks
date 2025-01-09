import TeamLogo from "@/common/components/atoms/TeamLogo";
import { MyTeamType } from "@/common/types/type";
import MyTeamDeletionButton from "@/pages/MyTeam/components/MyTeamCard/MyTeamDeletionButton";

export default function MyTeamCard({ teamName, id }: MyTeamType) {
  return (
    <div className="relative flex flex-col items-center">
      <TeamLogo teamName={teamName} size="myTeam" />
      <span className="text-[20px] font-semibold text-text-tertiary">{teamName}</span>
      <MyTeamDeletionButton teamId={id} />
    </div>
  );
}
