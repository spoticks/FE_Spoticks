import MenuItem from "@/common/layouts/Layout/Header/UserButton/UserInfoPopup/MenuItem";
import { MenuItemProps } from "@/common/types/type";
import { FiLogOut } from "react-icons/fi";
export default function PopupMenuList({
  items,
  handleLogout,
}: {
  items: MenuItemProps[];
  handleLogout: () => void;
}) {
  return (
    <ul className="border-t border-gray-200">
      {items.map((item) => (
        <MenuItem
          key={item.label}
          to={item.to}
          icon={item.icon}
          label={item.label}
          onClick={item?.onClick}
          isButton={item?.isButton}
        />
      ))}
      <MenuItem
        icon={<FiLogOut className="mr-3" />}
        label="로그아웃"
        onClick={handleLogout}
        isButton
      />
    </ul>
  );
}
