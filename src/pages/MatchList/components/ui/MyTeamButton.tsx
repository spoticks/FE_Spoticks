import useMyTeamQuery from "@/common/api/useMyTeamQuery";
import useMyTeamDeletion from "@/common/api/useMyTeamDeletion";
import useMyTeamPost from "../../api/useMyTeamPost";
import { getTeamId } from "@/common/utils/getTeamId";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface MyTeamProps {
  sport: string;
  selectedTeam: string;
}

export default function MyTeamButton({ sport, selectedTeam }: MyTeamProps) {
  const { data } = useMyTeamQuery();
  const addition = useMyTeamPost();
  const deletion = useMyTeamDeletion();

  const teamId = getTeamId(sport, selectedTeam);

  const isMyTeam = data?.some((team) => team.teamName === selectedTeam);

  const handleMyTeam = (teamId: string) => {
    if (isMyTeam) {
      deletion.mutate(teamId);
    } else {
      addition.mutate(teamId);
    }
  };

  return (
    <div className="flex items-center">
      {selectedTeam !== "전체 일정" && (
        <div
          onClick={() => handleMyTeam(String(teamId))}
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-[10px] border-[1px] border-borders bg-foreground"
        >
          {isMyTeam ? (
            <AiFillHeart color="#dd4255" size={24} />
          ) : (
            <AiOutlineHeart color="#767676" size={24} />
          )}
          <div className={`text-[15px] ${isMyTeam ? "text-Accent" : "text-borders"}`}>마이팀</div>
        </div>
      )}
    </div>
  );
}
