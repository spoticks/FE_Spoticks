import { FiUser, FiFileText, FiList, FiPlusCircle } from "react-icons/fi";
import { LuTrophy } from "react-icons/lu";

export default function getPopupMenuItems(menuType: "user" | "admin") {
  const userMenuItems = [
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
  ];

  const adminMenuItems = [
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
  ];

  return menuType === "user" ? userMenuItems : adminMenuItems;
}
