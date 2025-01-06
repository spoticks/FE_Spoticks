import { Outlet } from "react-router-dom";
import Vector from "@/assets/Vector.svg?react";
import Footer from "@/common/components/Layout/Footer";
import Header from "@/common/components/Layout/Header/index";
import useExcludeHeaderFooter from "@/hooks/useExcludeHeaderFooter";

export default function Layout() {
  const shouldExcludeHeaderFooter = useExcludeHeaderFooter();

  return (
    <div className="flex min-h-screen flex-col items-center">
      {!shouldExcludeHeaderFooter && <Header />}
      <div className="relative flex w-full max-w-[1280px] flex-1 flex-col items-center pb-20 pt-[80px]">
        <main className="flex w-full flex-1 flex-col">
          <Outlet />
        </main>
        {/*배경 빨간얼룩 */}
        {!shouldExcludeHeaderFooter && <Vector className="fixed left-0 top-[-20px] -z-50" />}
      </div>
      {!shouldExcludeHeaderFooter && <Footer />}
    </div>
  );
}
