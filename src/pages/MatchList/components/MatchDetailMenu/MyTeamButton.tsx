import useMyTeamQuery from "@/common/api/useMyTeamQuery";
import useMyTeamDeleteMutation from "@/common/api/useMyTeamDeleteMutation";
import useMyTeamPost from "../../api/useMyTeamPost";
import { getTeamId } from "@/common/utils/getTeamId";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuthStore from "@/common/stores/authStore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface MyTeamProps {
  sport: string;
  selectedTeam: string;
}

export default function MyTeamButton({ sport, selectedTeam }: MyTeamProps) {
  const { accessToken } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const { data } = useMyTeamQuery(!!accessToken);
  const addition = useMyTeamPost();
  const deletion = useMyTeamDeleteMutation();

  const teamId = getTeamId(sport, selectedTeam);

  const isMyTeam = data?.some((team) => team.teamName === selectedTeam);

  const handleMyTeam = (teamId: string) => {
    if (!accessToken) {
      Swal.fire({
        title: "<h2 style='font-size: 20px; color:#222222'>로그인이 필요한 서비스입니다</h2>",
        html: "<div style='font-size: 14px; color:#8d8d8d'>로그인 하시겠어요?</div>",
        icon: "info",
        iconColor: "#DD4255",
        showCancelButton: true,
        confirmButtonText: "네",
        cancelButtonText: "아니오",
        width: 394,
        customClass: {
          icon: "text-[10px]",
        },
        reverseButtons: true,
        willOpen: () => {
          const swal2Modals = document.getElementsByClassName("swal2-modal")[0];
          const confirmButton = document.getElementsByClassName("swal2-confirm")[0];
          const cancelButton = document.getElementsByClassName("swal2-cancel")[0];
          const buttonContainer = document.getElementsByClassName("swal2-actions")[0];
          swal2Modals.className += " rounded-[24px]";
          buttonContainer.className += " w-full justify-around";
          confirmButton.className =
            "swal2-confirm text-[14px] text-Accent font-semibold hover:bg-none bg-transparent hover:text-button-hovered";
          cancelButton.className +=
            "swal2-cancel text-[14px] font-semibold bg-transparent text-text-primary";
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });

      return;
    }
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
