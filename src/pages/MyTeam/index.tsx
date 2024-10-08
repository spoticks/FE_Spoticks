import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import useAuthStore from "@/common/stores/authStore";
import MyTeamList from "@/pages/MyTeam/components/MyTeamList";

interface MyTeam {
  teamId: number;
  teamName: string;
}
export default function MyTeam() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-10 flex flex-col items-center border-b border-b-borders pb-2">
        <AuthFirstHeading content="My Team" />
        <span className="text-text-tertiary">
          {userName}님이 관심있는 팀들의 일정을 확인해보세요!
        </span>
      </div>
      <MyTeamList />
    </>
  );
}
