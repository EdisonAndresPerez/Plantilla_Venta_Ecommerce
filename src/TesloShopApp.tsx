import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app.router";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TesloShopApp = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}

        <RouterProvider router={AppRouter} />
        <Toaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TesloShopApp;
