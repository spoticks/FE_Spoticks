import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/common/components/atoms/Loading";
import Error from "@/pages/ErrorPage";
import Heart from "@/assets/Heart.svg?react";
import { teams, localUrl } from "@/common/constants";

interface MyTeamProps {
  selectedTeam: string;
}

export default function MyTeamButton({ selectedTeam }: MyTeamProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["myTeamData", selectedTeam],
    queryFn: async () => {
      const sport = Object.keys(teams).find((sport) => teams[sport].includes(selectedTeam));
      if (sport) {
        // const teamIndex = teams[sport].indexOf(selectedTeam);
        const { data } = await axios.get(`http://localhost:3000/myTeam`);
        return data;
      }
      return null;
    },
    enabled: selectedTeam !== "전체 일정",
  });
  console.log("data :", data);

  const isMyTeam = data && data.includes(selectedTeam);

  // 마이팀 추가/삭제 처리 함수
  const handleMyTeam = async () => {
    const sport = Object.keys(teams).find((sport) => teams[sport].includes(selectedTeam));

    if (sport && data) {
      const teamIndex = teams[sport].indexOf(selectedTeam) + 1;
      console.log(teamIndex);
      try {
        if (isMyTeam) {
          await axios.delete(`http://localhost:3000/myTeam`, {
            data: { teamIndex },
          });
        } else {
          await axios.post(`http://localhost:3000/myTeam`, { teamIndex });
        }

        queryClient.invalidateQueries({ queryKey: ["myTeamData", selectedTeam] });
      } catch (error) {
        console.error("Error adding/removing team:", error);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      {selectedTeam !== "전체 일정" && (
        <div
          onClick={handleMyTeam}
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-[10px] border-[1px] border-borders bg-foreground"
        >
          <Heart
            className={`${isMyTeam ? "fill-#dd4255 stroke-#dd4255" : "stroke-#767676 fill-none"}`}
          />
          <div className={`text-[15px] ${isMyTeam ? "text-Accent" : "text-borders"}`}>마이팀</div>
        </div>
      )}
    </>
  );
}
