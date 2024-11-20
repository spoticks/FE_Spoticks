import useGetMyTeam from "@/common/api/useGetMyTeam";
import MyTeamCard from "@/pages/MyTeam/components/MyTeamList/MyTeamCard";
import EmptyTeamList from "@/pages/MyTeam/components/MyTeamList/EmptyTeamList";
export default function MyTeamList() {
  const { data } = useGetMyTeam();

  return (
    <section className={`${data?.length ? "grid grid-cols-8 gap-[44px]" : "flex flex-1"}`}>
      {data?.length ? (
        data?.map((el) => <MyTeamCard key={el.id} teamName={el.teamName} id={el.id} />)
      ) : (
        <EmptyTeamList />
      )}
    </section>
  );
}
