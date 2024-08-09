import { CiCircleCheck, CiWarning, CiTrophy, CiCalendar, CiCircleInfo } from "react-icons/ci";
import { LuHome } from "react-icons/lu";

export default function MenuButton({ menu, onClick }: { menu: string; onClick: () => void }) {
  const getMenuIcon = (menu: string) => {
    switch (menu) {
      case "예매완료":
        return <CiCircleCheck />;
      case "예매취소":
        return <CiWarning />;
      case "나의 팀":
        return <CiTrophy />;
      case "예매일정":
        return <CiCalendar />;
      case "홈구장 안내":
        return <LuHome />;
      case "예매정보":
        return <CiCircleInfo />;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="button-hover flex items-center justify-center rounded-lg border bg-white px-[45px] py-[12px] text-[16px] text-black transition-colors duration-300"
    >
      <span className="mr-2">{getMenuIcon(menu)}</span>
      {menu}
    </button>
  );
}
