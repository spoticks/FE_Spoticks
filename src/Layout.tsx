import { Outlet } from "react-router-dom";
import vector from "./assets/Vector.svg";

export default function Layout() {
  return (
    <div>
      <header className="fixed w-full border border-black">헤더</header>
      <Outlet />
      <img src={vector} className="fixed left-0 top-[-20px] -z-50" />
    </div>
  );
}
