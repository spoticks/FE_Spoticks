import useAuthStore from "@/common/stores/authStore";
import MyTeamList from "@/components/MyTeamList";

interface MyTeam {
  teamId: number;
  teamName: string;
}
export default function MyTeam() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-10 flex flex-col items-center border-b border-b-borders pb-2">
        <h1 className="mb-2 text-2xl font-bold">My Team</h1>
        <span className="text-text-tertiary">
          {userName}님이 관심있는 팀들의 일정을 확인해보세요!
        </span>
      </div>
      <MyTeamList />
    </>
  );
}
