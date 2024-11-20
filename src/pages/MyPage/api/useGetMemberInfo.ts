import axiosInstance from "@/common/utils/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useGetMemberInfo() {
  const { data } = useSuspenseQuery<{ phoneNumber: string }, AxiosError>({
    queryKey: ["memberInfo"],
    queryFn: () => axiosInstance.get(`/members/me`).then((res) => res.data),
  });

  return { data };
}
