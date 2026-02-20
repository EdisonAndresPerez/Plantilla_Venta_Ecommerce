import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app.router";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { Loading } from "./components/Loading";
import { useStoreAuth } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

  const {checkAuthStatus} = useStoreAuth();


  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1, 
  });

  if (isLoading) {
    return <Loading />;
  }

  return children;
};

const TesloShopApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}

        <CheckAuthProvider>
          <RouterProvider router={AppRouter} />
        </CheckAuthProvider>

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TesloShopApp;
