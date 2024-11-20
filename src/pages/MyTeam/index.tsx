import MyTeamList from "@/pages/MyTeam/components/MyTeamList";

interface MyTeam {
  teamId: number;
  teamName: string;
}
export default function MyTeam() {
  return <MyTeamList />;
}
