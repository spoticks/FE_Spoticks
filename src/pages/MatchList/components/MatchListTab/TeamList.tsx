// TeamList 컴포넌트
interface TeamListProps {
  teams: string[];
  activeTeam: string;
  handleTeamClick: (team: string) => void;
}

export default function TeamList({ teams, activeTeam, handleTeamClick }: TeamListProps) {
  return (
    <div className="transition-transform">
      {teams.map((name: string) => (
        <div
          key={name}
          onClick={() => handleTeamClick(name)}
          className={`flex cursor-pointer justify-center bg-focused-input-background py-1 text-xs ${
            activeTeam === name ? "font-bold text-Accent" : ""
          }`}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
