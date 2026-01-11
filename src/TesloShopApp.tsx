import { RouterProvider } from "react-router";
import { AppRouter } from "./app.router";

const TesloShopApp = () => {
  return <RouterProvider router={AppRouter}></RouterProvider>;
};

export default TesloShopApp;
