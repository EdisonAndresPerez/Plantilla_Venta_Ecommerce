import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app.router";
import { Toaster } from "@/components/ui/sonner";

const TesloShopApp = () => {
  return (
    <>
      <RouterProvider router={AppRouter} />
      <Toaster />
    </>
  );
};

export default TesloShopApp;
