import { useState } from "react";
import HomeInfo from "./HomeInfo";
import ReservationList from "./ReservationList";
import ReserveInfo from "./ReserveInfo";
import HomeIcon from "../../assets/homeIcon.svg";
import InfoIcon from "../../assets/infoIcon.svg";
import ReserveIcon from "../../assets/reserveIcon.svg";
import { Content } from "../../common/types/type";
import MyTeamButton from "./MyTeamButton";

interface DetailProps {
  selectedTeam: string;
  filterData: Content[];
}

export default function MatchTabList({ selectedTeam, filterData }: DetailProps) {
  //예매내역, 홈구장안내, 예매설명 메뉴 선택
  const [selectedMenu, setSelectedMenu] = useState("예매 일정");
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const MenuList = () => {
    switch (selectedMenu) {
      case "예매 일정":
        return <ReservationList filterData={filterData} />;
      case "홈구장 안내":
        return <HomeInfo />;
      case "예매정보":
        return <ReserveInfo />;
      default:
        return <ReservationList filterData={filterData} />;
    }
  };

  const menuItems = [
    { name: "예매 일정", icon: ReserveIcon },
    { name: "홈구장 안내", icon: HomeIcon },
    { name: "예매정보", icon: InfoIcon },
  ];

  return (
    <div className="w-full">
      <div className="header flex w-full flex-row items-center">
        <div className="mr-[100px] flex flex-col">
          <div className="text-[40px] font-semibold">{selectedTeam}</div>
          <div className="mb-2 text-[20px] text-text-primary opacity-50">
            경기목록을 확인하고 예매해보세요!
          </div>
          <div className="flex flex-row">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => handleMenuClick(item.name)}
                className={`mr-2 flex w-[200px] cursor-pointer flex-row items-center justify-around rounded-[10px] py-2 ${
                  selectedMenu === item.name
                    ? "bg-Accent text-foreground"
                    : "bg-foreground text-text-primary"
                }`}
              >
                <img src={item.icon} alt={`${item.name} Icon`} className="size-3" />
                <div>{item.name}</div>
                {item.name === "예매 일정" && <div>{filterData.length}</div>}
              </div>
            ))}
          </div>
        </div>
        {/* 좋아요 */}
        <MyTeamButton selectedTeam={selectedTeam} />
      </div>
      <div />
      <div className="pt-4">{MenuList()}</div>
    </div>
  );
}
