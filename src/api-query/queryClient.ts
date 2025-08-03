import { QueryClient } from "@tanstack/react-query";
import { errorHandler } from "../utils/errors.utils";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000,
    },
  },
});

queryClient.getQueryCache().subscribe((event) => {
  if (
    (event?.type === "updated" || event?.type === "added") &&
    event.query.state.status === "error" &&
    event.query.state.error
  ) {
    errorHandler(event.query.state.error);
  }
});
