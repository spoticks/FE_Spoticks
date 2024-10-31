import PopupMenuList from "@/common/components/Layout/Header/UserButton/UserInfoPopup/PopupMenu/PopupMenuList";
import { FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { LuTrophy } from "react-icons/lu";

export default function UserPopupMenu({ handleLogout }: { handleLogout: () => void }) {
  const menuItems = [
    {
      to: "/profile/user-info",
      icon: <FiUser className="mr-3" />,
      label: "프로필",
    },
    {
      to: "/profile/my-tickets/my-reservations",
      icon: <FiFileText className="mr-3" />,
      label: "예매한 티켓",
    },
    {
      to: "/profile/my-team",
      icon: <LuTrophy className="mr-3" />,
      label: "나의 팀",
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
