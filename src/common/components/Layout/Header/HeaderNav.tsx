import { menu } from "@/common/constants";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  return (
    <nav className="m-auto flex w-60 flex-row justify-between">
      {/* <div className="text-[18px] font-medium">{el}</div> */}
      {menu.map((el) => (
        <Link
          key={el}
          to={el === "HOME" ? "/" : `/match-list/${el}`}
          className="text-[18px] font-medium"
        >
          {el}
        </Link>
      ))}
    </nav>
  );
}
