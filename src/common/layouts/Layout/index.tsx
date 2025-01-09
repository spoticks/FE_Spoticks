import { Outlet, useLocation } from "react-router-dom";
import Vector from "@/assets/Vector.svg?react";
import Header from "@/common/layouts/Layout/Header";
import Footer from "@/common/layouts/Layout/Footer";
import useExcludeHeaderFooter from "@/hooks/useExcludeHeaderFooter";

export default function Layout() {
  const shouldExcludeHeaderFooter = useExcludeHeaderFooter();
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center">
      {!shouldExcludeHeaderFooter && <Header />}
      <div className="relative flex w-full max-w-[1280px] flex-1 flex-col items-center pb-20 pt-[80px]">
        <main className="flex w-full flex-1 flex-col">
          <Outlet />
        </main>
        {/*배경 빨간얼룩 */}
        {pathname === "/" && <Vector className="fixed left-0 top-[-20px] -z-50" />}
      </div>
      {!shouldExcludeHeaderFooter && <Footer />}
    </div>
  );
}
