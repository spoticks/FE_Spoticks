import { Outlet } from "react-router-dom";
import Vector from "@/assets/Vector.svg?react";
import Footer from "@/common/components/Layout/Footer";
import Header from "@/common/components/Layout/Header/index";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="relative flex w-content-width flex-1 flex-col items-center pb-20 pt-[80px]">
        <main className="flex w-full flex-1 flex-col">
          <Outlet />
        </main>
        <Vector className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <Footer />
    </div>
  );
}
