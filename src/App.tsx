import Router from "./Router";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import errorHandler from "@/common/utils/errorHandler";

function App() {
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          // 리프레시 토큰이 제작된다면 로직 바꿀 것.
          errorHandler(error);
        },
      }),
      defaultOptions: {
        queries: {
          retry: false,
          // throwOnError: true,
        },
        mutations: {
          retry: false,
          onError: (error) => {
            errorHandler(error);
          },
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
