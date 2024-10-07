import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../common/components/atoms/Loading";
import Error from "../pages/ErrorPage";
import TeamLogo from "../common/components/atoms/TeamLogo";

async function fetchMyTeam() {
  const { data } = await axios.get("http://localhost:3000/myteam/");
  return data;
}
async function deleteTeam(teamId: number) {
  await axios.delete(`http://localhost:3000/myteam/${teamId}`);
}
interface MyTeam {
  teamId: number;
  teamName: string;
}

export default function MyTeamList() {
  const queryClient = useQueryClient();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<MyTeam[]>({
    queryKey: ["myTeam"],
    queryFn: fetchMyTeam,
  });
  const deletion = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTeam"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section className="flex w-[1280px] flex-wrap gap-[44px]">
      {data.length ? (
        data.map((el) => (
          <div className="relative flex flex-col items-center" key={el.teamName}>
            <TeamLogo teamName={el.teamName} size="myTeam" />
            <span className="text-[20px] font-semibold text-text-tertiary">{el.teamName}</span>
            <button
              className="absolute right-0"
              type="button"
              onClick={() => {
                deletion.mutate(el.teamId);
              }}
            >
              {/**버튼 내용물은 바꾸는걸로... 단체로 이러니까 좀 짜치는 너낌... */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 33 33"
                fill={"#dd4255"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.2867 6.64666C27.6057 5.96533 26.7971 5.42485 25.9071 5.0561C25.0172 4.68735 24.0633 4.49756 23.1 4.49756C22.1367 4.49756 21.1828 4.68735 20.2929 5.0561C19.4029 5.42485 18.5943 5.96533 17.9133 6.64666L16.5 8.05999L15.0867 6.64666C13.7111 5.27107 11.8454 4.49827 9.9 4.49827C7.95462 4.49827 6.08892 5.27107 4.71333 6.64666C3.33774 8.02225 2.56494 9.88795 2.56494 11.8333C2.56494 13.7787 3.33774 15.6444 4.71333 17.02L16.5 28.8067L28.2867 17.02C28.968 16.339 29.5085 15.5304 29.8772 14.6405C30.246 13.7505 30.4358 12.7966 30.4358 11.8333C30.4358 10.87 30.246 9.91613 29.8772 9.02619C29.5085 8.13624 28.968 7.32767 28.2867 6.64666Z"
                  stroke={"#dd4255"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))
      ) : (
        <div>아직 좋아하는 팀이 없어요...</div>
      )}
    </section>
  );
}
