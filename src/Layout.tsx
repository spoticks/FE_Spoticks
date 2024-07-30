import { Outlet } from "react-router-dom";
import vector from "./assets/Vector.svg";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="fixed w-full border border-black">헤더</header>
      <div className="flex min-w-[1280px] flex-1 flex-col items-center pt-6">
        <Outlet />
        <img src={vector} className="fixed left-0 top-[-20px] -z-50" />
      </div>
      <footer className="w-full border border-black">풋터</footer>
    </div>
  );
}
