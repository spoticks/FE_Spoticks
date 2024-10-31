import PopupMenuList from "@/common/components/Layout/Header/UserButton/UserInfoPopup/PopupMenu/PopupMenuList";
import { FiList, FiPlusCircle, FiLogOut, FiUser } from "react-icons/fi";

export default function AdminPopupMenu({ handleLogout }: { handleLogout: () => void }) {
  const menuItems = [
    {
      to: "/profile/user-info",
      icon: <FiUser className="mr-3" />,
      label: "프로필",
    },
    {
      to: "/admin",
      icon: <FiList className="mr-3" />,
      label: "경기 목록",
    },
    {
      to: "/admin/registration",
      icon: <FiPlusCircle className="mr-3" />,
      label: "경기 등록",
    },
    {
      onClick: handleLogout,
      icon: <FiLogOut className="mr-3" />,
      label: "로그아웃",
      isButton: true,
    },
  ];

  return <PopupMenuList items={menuItems} />;
}
