import axiosInstance from "@/common/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetMemberInfo(memberId: number) {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["memberInfo", memberId],
    queryFn: () => axiosInstance.get(`/members/${memberId}`).then((res) => res.data),
  });

  return { isLoading, data, isError };
}
