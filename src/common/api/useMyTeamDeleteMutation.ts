import alertToast from "@/common/utils/alertToast";
import axiosInstance from "@/common/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function deleteTeam(teamId: string) {
  await axiosInstance.delete(`/my-team/${teamId}`);
}
export default function useMyTeamDeleteMutation() {
  const queryClient = useQueryClient();

  const deletion = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTeam"] });
      alertToast("성공적으로 팀을 제외했습니다!", "success");
    },
    onError: (err: AxiosError) => {
      if (err.response) {
        const status = err.response?.status;
        if (status === 403) {
          alertToast("로그아웃 되었습니다! 다시 로그인해 주세요!", "error", "top");
        }
      } else if (err.request) {
        alertToast("서버로부터 응답이 없습니다!", "error", "top");
      } else {
        alertToast("요청 중 문제가 발생했습니다!", "error", "top");
      }
    },
  });

  return deletion;
}
