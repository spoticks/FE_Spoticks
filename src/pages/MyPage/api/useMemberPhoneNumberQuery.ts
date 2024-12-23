import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useMemberPhoneNumberQuery() {
  const { data } = useSuspenseQuery<{ memberName: string; phoneNumber: string }, AxiosError>({
    queryKey: ["memberInfo"],
    queryFn: () => axiosInstance.get(`/members/me`).then((res) => res.data),
    staleTime: Infinity,
  });

  return { data };
}
