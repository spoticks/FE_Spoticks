import { Outlet } from "react-router-dom";
import Vector from "@/assets/Vector.svg?react";
import Footer from "@/common/components/Layout/Footer";
import Header from "@/common/components/Layout/Header/index";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex max-w-[1280px] flex-1 flex-col items-center pt-[80px]">
        <main className="w-full">
          <Outlet />
        </main>
        <Vector className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <Footer />
    </div>
  );
}
