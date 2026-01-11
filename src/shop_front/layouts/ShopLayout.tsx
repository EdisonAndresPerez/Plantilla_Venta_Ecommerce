import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomJumbotron } from "../components/CustomJumbotron";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader/>
      <CustomJumbotron />
      <Outlet />
    </div>
  );
};
