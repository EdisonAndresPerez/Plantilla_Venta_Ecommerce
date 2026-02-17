import { Outlet } from "react-router";
import { CustomHeader } from "../components/CustomHeader";
import { CustomFooter } from "../components/CustomFooter";
import { ScrollToTop } from "@/components/ScrollToTop";

export const ShopLayout = () => {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <CustomHeader />
      <Outlet />
      <CustomFooter />
    </div>
  );
};
