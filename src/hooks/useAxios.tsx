import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://spoticks.shop:8080",
  timeout: 3000,
});

interface UseAxiosOptions<TData>
  extends Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn"> {
  config?: AxiosRequestConfig;
  accessToken?: string;
  params?: Record<string, string | number>;
}

function useAxios<TData>(
  queryKey: string[],
  options?: UseAxiosOptions<TData>,
): UseQueryResult<TData, Error> {
  const { config, accessToken, params, ...queryOptions } = options || {};

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    params,
    headers: {
      ...config?.headers,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };

  return useQuery<TData, Error>({
    queryKey: [queryKey, axiosConfig],
    queryFn: async () => {
      const response = await axiosInstance.request<TData>(axiosConfig);
      return response.data;
    },
    ...queryOptions,
  });
}

export default useAxios;
