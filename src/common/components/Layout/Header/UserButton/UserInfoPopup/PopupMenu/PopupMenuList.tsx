import MenuItem from "@/common/components/Layout/Header/UserButton/UserInfoPopup/MenuItem";
import { MenuItemProps } from "@/common/types/type";
export default function PopupMenuList({ items }: { items: MenuItemProps[] }) {
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
    </ul>
  );
}
