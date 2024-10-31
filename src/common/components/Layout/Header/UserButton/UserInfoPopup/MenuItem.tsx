import { MenuItemProps } from "@/common/types/type";
import { Link } from "react-router-dom";

function MenuItem({ to, onClick, icon, label, isButton = false }: MenuItemProps) {
  const classes = "flex cursor-pointer items-center p-3 text-[14px] hover:bg-gray-100";

  if (isButton) {
    return (
      <button onClick={onClick} className={`${classes} w-full rounded-b-lg text-Accent`}>
        {icon}
        {label}
      </button>
    );
  }

  return (
    <li>
      <Link to={to as string} className={classes}>
        {icon}
        {label}
      </Link>
    </li>
  );
}

export default MenuItem;
