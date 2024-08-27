import { CiCircleCheck, CiWarning, CiTrophy, CiCalendar, CiCircleInfo } from "react-icons/ci";
import { LuHome } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function MenuButton({ menu, onClick }: { menu: string; onClick: () => void }) {
  const getMenuIcon = (menu: string) => {
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
      case "예매일정":
        return {
          link: "",
          icon: <CiCalendar />,
        };
      case "홈구장 안내":
        return {
          link: "",
          icon: <LuHome />,
        };
      case "예매정보":
        return {
          link: "",
          icon: <CiCircleInfo />,
        };
    }
  };

  return (
    <Link
      to={getMenuIcon(menu)?.link as string}
      className="button-hover flex w-[300px] items-center justify-center rounded-lg border bg-white px-[56px] py-[14px] text-[16px] text-black transition-colors duration-300"
    >
      <span className="mr-2">{getMenuIcon(menu)?.icon}</span>
      {menu}
    </Link>
  );
}
