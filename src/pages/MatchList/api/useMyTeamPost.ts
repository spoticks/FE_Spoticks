import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/common/utils/axiosInstance";
import alertToast from "@/common/utils/alertToast";
import { AxiosError } from "axios";

// Function to register a team
async function addTeamToMyTeam(teamId: string): Promise<void> {
  await axiosInstance.post(`/my-team/${teamId}`);
}

export default function useMyTeamPost() {
  const queryClient = useQueryClient();

  const registration = useMutation({
    mutationFn: addTeamToMyTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTeam"] });
      alertToast("팀이 마이팀에 등록되었습니다!", "success");
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

  return registration;
}
