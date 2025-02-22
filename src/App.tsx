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
          errorHandler(error);
        },
      }),
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
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
