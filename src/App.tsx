import Router from "./Router";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuthStore from "@/common/stores/authStore";
import { isAxiosError } from "axios";
import alertToast from "@/common/utils/alertToast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      // 리프레시 토큰이 제작된다면 로직 바꿀 것.
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 403) {
          useAuthStore.getState().logout();
          alertToast("로그인이 만료되었습니다. 다시 로그인 해주세요!", "info");
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      // 리프레시 토큰이 제작된다면 로직 바꿀 것.
      if (isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 403) {
          useAuthStore.getState().logout();
          alertToast("로그인이 만료되었습니다. 다시 로그인 해주세요!", "info");
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
    mutations: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
