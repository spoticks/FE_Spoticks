import RedHeart from "@/assets/RedHeart.svg?react";
import useMyTeamDeleteMutation from "@/common/api/useMyTeamDeleteMutation";
export default function MyTeamDeletionButton({ teamId }: { teamId: string }) {
  const deletion = useMyTeamDeleteMutation();

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
