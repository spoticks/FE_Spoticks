import { Outlet } from "react-router-dom";
import vector from "./assets/Vector.svg";
import Footer from "./Footer";
import Header from "@/common/components/Layout/Header/index";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex max-w-[1280px] flex-1 flex-col items-center pt-[80px]">
        <main className="w-full">
          <Outlet />
        </main>
        <img src={vector} className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <Footer />
    </div>
  );
}
