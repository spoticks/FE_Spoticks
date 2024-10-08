import useGetMyTeam from "@/common/api/useGetMyTeam";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import MyTeamCard from "@/pages/MyTeam/components/MyTeamList/MyTeamCard";

export default function MyTeamList() {
  const { data, isLoading, isError } = useGetMyTeam();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className="grid grid-cols-8 gap-[44px]">
      {data.length ? (
        data.map((el) => <MyTeamCard key={el.teamId} teamName={el.teamName} teamId={el.teamId} />)
      ) : (
        <div>아직 좋아하는 팀이 없어요...</div>
      )}
    </section>
  );
}
