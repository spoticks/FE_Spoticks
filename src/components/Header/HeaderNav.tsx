import { Link } from "react-router-dom";
import { menu } from "../constants";

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
