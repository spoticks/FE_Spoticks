import { Outlet } from "react-router-dom";
import vector from "./assets/Vector.svg";

export default function Layout() {
  return (
    <div>
      <Outlet />
      <img src={vector} className="left- fixed top-[-20px] -z-50" />
    </div>
  );
}
