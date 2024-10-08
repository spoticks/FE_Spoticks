import useMyTeamDeletion from "@/pages/MyTeam/components/api/useMyTeamDeletion";
import RedHeart from "@/assets/RedHeart.svg?react";
export default function MyTeamDeletionButton({ teamId }: { teamId: string }) {
  const deletion = useMyTeamDeletion();

  return (
    <button
      className="absolute right-0"
      type="button"
      onClick={() => {
        deletion.mutate(teamId);
      }}
    >
      {/**버튼 내용물은 바꾸는걸로... 단체로 이러니까 좀 짜치는 너낌... */}
      <RedHeart />
    </button>
  );
}
