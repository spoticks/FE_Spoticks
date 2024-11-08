import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function deleteTeam(teamId: string) {
  await axios.delete(`http://localhost:3000/myteam/${teamId}`);
}
export default function useMyTeamDeletion() {
  const queryClient = useQueryClient();

  const deletion = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTeam"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return deletion;
}
