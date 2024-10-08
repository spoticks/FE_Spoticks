import Loading from "../../../../common/components/atoms/Loading";
import Error from "../../../ErrorPage";
import TeamLogo from "../../../../common/components/atoms/TeamLogo";
import useGetMyTeam from "@/pages/MyTeam/components/api/useGetMyTeam";
import MyTeamDeletionButton from "@/pages/MyTeam/components/MyTeamList/MyTeamDeletionButton";

export default function MyTeamList() {
  const { data, isLoading, isError } = useGetMyTeam();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <section className="grid grid-cols-8 gap-[44px]">
      {data.length ? (
        data.map((el) => (
          <div className="relative flex flex-col items-center" key={el.teamName}>
            <TeamLogo teamName={el.teamName} size="myTeam" />
            <span className="text-[20px] font-semibold text-text-tertiary">{el.teamName}</span>
            <MyTeamDeletionButton teamId={el.teamId} />
          </div>
        ))
      ) : (
        <div>아직 좋아하는 팀이 없어요...</div>
      )}
    </section>
  );
}
