import useMyTeamQuery from "@/common/api/useMyTeamQuery";
import Loading from "@/common/components/atoms/Loading";
import ErrorPage from "@/pages/ErrorPage";
import EmptyTeamList from "@/pages/MyTeam/components/EmptyTeamList";
import MyTeamCard from "@/pages/MyTeam/components/MyTeamCard";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface MyTeam {
  teamId: number;
  teamName: string;
}
export default function MyTeam() {
  const { data, isLoading, isError, error } = useMyTeamQuery(true);
  const { reset } = useQueryErrorResetBoundary();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} resetErrorBoundary={reset} />;
  }

  return (
    <section className={`${data?.length ? "grid grid-cols-8 gap-[44px]" : "flex flex-1"}`}>
      {data?.length !== 0 ? (
        data?.map((el) => <MyTeamCard key={el.id} teamName={el.teamName} id={el.id} />)
      ) : (
        <EmptyTeamList />
      )}
    </section>
  );
}
