import { Suspense, useState } from "react";
import HomeInfo from "@/pages/MatchList/components/HomeInfo";
import ReservationList from "@/pages/MatchList/components/ReservationList";
import ReserveInfo from "@/pages/MatchList/components/ReserveInfo";
import MyTeamButton from "@/pages/MatchList/components/MatchDetailMenu/MyTeamButton";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import Loading from "@/common/components/atoms/Loading";
import CustomErrorBoundary from "@/common/components/atoms/CustomErrorBoundary";
import { PageInfoProps, MainMatchType, MatchType } from "@/common/types/matchTypes";

interface DetailProps {
  matchData:
    | MatchType
    | { content: MainMatchType[]; pageInfo: PageInfoProps | Record<string, number> };
  selectedTeam: string;
  sport: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  isLoading: boolean;
  onlyHomeGames: boolean;
  setOnlyHomeGames: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MatchDetailMenu({
  matchData,
  selectedTeam,
  sport,
  setCurrentPage,
  currentPage,
  isLoading,
  onlyHomeGames,
  setOnlyHomeGames,
}: DetailProps) {
  //예매내역, 홈구장안내, 예매설명 메뉴 선택
  const [selectedMenu, setSelectedMenu] = useState("예매 일정");
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const menuItems = ["예매 일정", "예매정보"];
  if (selectedTeam !== "전체 일정") {
    menuItems.splice(1, 0, "홈구장 안내");
  }

  const MenuList = () => {
    switch (selectedMenu) {
      case "예매 일정":
        return (
          <ReservationList
            pageInfo={matchData.pageInfo}
            filterData={matchData.content}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            isLoading={isLoading}
            selectedTeam={selectedTeam}
            onlyHomeGames={onlyHomeGames}
            setOnlyHomeGames={setOnlyHomeGames}
          />
        );
      case "홈구장 안내":
        return <HomeInfo />;
      case "예매정보":
        return <ReserveInfo />;
      default:
        return (
          <ReservationList
            filterData={matchData.content}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageInfo={matchData.pageInfo}
            isLoading={isLoading}
            selectedTeam={selectedTeam}
            onlyHomeGames={onlyHomeGames}
            setOnlyHomeGames={setOnlyHomeGames}
          />
        );
    }
  };

  return (
    <div className="w-full">
      <div className="header flex w-full flex-row items-center">
        <div className="mr-[100px] flex flex-col">
          <div className="flex flex-row gap-10">
            <div>
              <h1 className="text-[40px] font-semibold">{selectedTeam}</h1>
              <h3 className="mb-2 text-[20px] text-text-primary opacity-50">
                경기목록을 확인하고 예매해보세요!
              </h3>
            </div>
            {/* 좋아요 */}
            <Suspense fallback={<Loading />}>
              <CustomErrorBoundary>
                <MyTeamButton sport={sport} selectedTeam={selectedTeam} />
              </CustomErrorBoundary>
            </Suspense>
          </div>
          <div className="flex flex-row">
            {menuItems.map((menu) => (
              <div key={menu} onClick={() => handleMenuClick(menu)} className="mr-2 cursor-pointer">
                <MenuButton
                  menu={menu}
                  sport={sport}
                  reserveLen={menu === "예매 일정" ? matchData.pageInfo.totalElements : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div />
      <div className="pt-4">{MenuList()}</div>
    </div>
  );
}
