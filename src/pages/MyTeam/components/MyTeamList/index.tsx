import useGetMyTeam from "@/common/api/useGetMyTeam";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import MyTeamCard from "@/pages/MyTeam/components/MyTeamList/MyTeamCard";
import EmptyTeamList from "@/pages/MyTeam/components/MyTeamList/EmptyTeamList";
export default function MyTeamList() {
  const { data, isLoading, isError } = useGetMyTeam();
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className={`${data.length && "grid grid-cols-8 gap-[44px]"}`}>
      {data.length ? (
        data.map((el) => <MyTeamCard key={el.id} teamName={el.teamName} id={el.id} />)
      ) : (
        <EmptyTeamList />
      )}
    </section>
  );
}
