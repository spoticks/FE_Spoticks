import { CiCircleCheck, CiWarning, CiCalendar, CiCircleInfo } from "react-icons/ci";
import { LuHome } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const getMenu = (menu: string, sport?: string) => {
  switch (menu) {
    case "예매완료":
      return {
        link: "/profile/my-tickets/my-reservations",
        icon: <CiCircleCheck />,
      };
    case "취소내역":
      return {
        link: "/profile/my-tickets/cancellation-history",
        icon: <CiWarning />,
      };
    case "예매 일정":
      return {
        link: `/match-list/${sport}/reserveSche`,
        icon: <CiCalendar />,
      };
    case "홈구장 안내":
      return {
        link: `/match-list/${sport}/homeInfo`,
        icon: <LuHome />,
      };
    case "예매정보":
      return {
        link: `/match-list/${sport}/reserveInfo`,
        icon: <CiCircleInfo />,
      };
  }
};
export default function MenuButton({
  menu,
  reserveLen,
  sport,
}: {
  menu: string;
  reserveLen?: number;
  sport?: string;
}) {
  const location = useLocation().pathname;

  const menuIcon = getMenu(menu, sport);
  const isActive = decodeURIComponent(location).includes((menuIcon?.link as string) || "");

  return (
    <Link
      to={menuIcon?.link as string}
      className={`flex w-[300px] items-center justify-center rounded-lg border px-[56px] py-[14px] text-[16px] transition-colors duration-150 ${
        isActive ? "bg-Accent text-foreground" : "button-hover bg-white text-black"
      }`}
    >
      <span className="mr-2">{menuIcon?.icon}</span>
      {menu}
      {menu === "예매 일정" && reserveLen !== undefined && <h5 className="ml-2">{reserveLen}</h5>}
    </Link>
  );
}
