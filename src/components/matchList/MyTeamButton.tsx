import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import { teams } from "@/common/constants";
import myTeamStore from "@/common/stores/myTeamStore";

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
  console.log(data);

  const isMyTeam = data && data.includes(selectedTeam);

  // 마이팀 추가/삭제 처리 함수
  const handleMyTeam = async () => {
    const sport = Object.keys(teams).find((sport) => teams[sport].includes(selectedTeam));

    if (sport && data) {
      const teamIndex = teams[sport].indexOf(selectedTeam);

      try {
        if (data.includes(selectedTeam)) {
          await axios.delete(`http://localhost:3000/myTeam/${teamIndex}`);
        } else {
          await axios.post(`http://localhost:3000/myTeam/${teamIndex}`);
        }

        // useQuery 데이터 갱신
        queryClient.invalidateQueries({ queryKey: ["myTeamData", selectedTeam] });
      } catch (error) {
        console.error("Error adding/removing team:", error);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <>
      {selectedTeam !== "전체 일정" && (
        <div
          onClick={handleMyTeam}
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-[10px] border-[1px] border-borders bg-foreground"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 33 33"
            fill={isMyTeam ? "#dd4255" : "none"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.2867 6.64666C27.6057 5.96533 26.7971 5.42485 25.9071 5.0561C25.0172 4.68735 24.0633 4.49756 23.1 4.49756C22.1367 4.49756 21.1828 4.68735 20.2929 5.0561C19.4029 5.42485 18.5943 5.96533 17.9133 6.64666L16.5 8.05999L15.0867 6.64666C13.7111 5.27107 11.8454 4.49827 9.9 4.49827C7.95462 4.49827 6.08892 5.27107 4.71333 6.64666C3.33774 8.02225 2.56494 9.88795 2.56494 11.8333C2.56494 13.7787 3.33774 15.6444 4.71333 17.02L16.5 28.8067L28.2867 17.02C28.968 16.339 29.5085 15.5304 29.8772 14.6405C30.246 13.7505 30.4358 12.7966 30.4358 11.8333C30.4358 10.87 30.246 9.91613 29.8772 9.02619C29.5085 8.13624 28.968 7.32767 28.2867 6.64666Z"
              stroke={isMyTeam ? "#dd4255" : "#767676"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className={`text-[15px] ${isMyTeam ? "text-Accent" : "text-borders"}`}>마이팀</div>
        </div>
      )}
    </>
  );
}
