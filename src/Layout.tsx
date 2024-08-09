import { Outlet } from "react-router-dom";
import vector from "./assets/Vector.svg";
import Header from "./components/Header.tsx/Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex max-w-[1280px] flex-1 flex-col items-center pt-[80px]">
        <Outlet />
        <img src={vector} className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <Footer />
    </div>
  );
}
