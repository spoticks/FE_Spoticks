import RedHeart from "@/assets/RedHeart.svg?react";
import useMyTeamDeletion from "@/common/api/useMyTeamDeletion";
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
      <RedHeart />
    </button>
  );
}
