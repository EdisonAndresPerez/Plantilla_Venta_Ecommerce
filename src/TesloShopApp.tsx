import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./app.router";

const TesloShopApp = () => {
  return <RouterProvider router={AppRouter} />;
};

export default TesloShopApp;
