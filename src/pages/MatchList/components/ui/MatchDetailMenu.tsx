import { Suspense, useState } from "react";
import HomeInfo from "@/pages/MatchList/components/HomeInfo";
import ReservationList from "@/pages/MatchList/components/ReservationList";
import ReserveInfo from "@/pages/MatchList/components/ReserveInfo";
import { ContentProps } from "@/common/types/type";
import MyTeamButton from "@/pages/MatchList/components/ui/MyTeamButton";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import Loading from "@/common/components/atoms/Loading";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/pages/ErrorPage";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

interface DetailProps {
  selectedTeam: string;
  filterData: ContentProps[];
  sport: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalEl: number;
  currentPage: number;
  pageSize: number;
}

export default function MatchDetailMenu({
  selectedTeam,
  filterData,
  sport,
  setCurrentPage,
  totalEl,
  currentPage,
  pageSize,
}: DetailProps) {
  const { reset } = useQueryErrorResetBoundary();
  //예매내역, 홈구장안내, 예매설명 메뉴 선택
  const [selectedMenu, setSelectedMenu] = useState("예매 일정");
  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const MenuList = () => {
    switch (selectedMenu) {
      case "예매 일정":
        return (
          <ReservationList
            filterData={filterData}
            setCurrentPage={setCurrentPage}
            totalEl={totalEl}
            selectedTeam={selectedTeam}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        );
      case "홈구장 안내":
        return <HomeInfo />;
      case "예매정보":
        return <ReserveInfo />;
      default:
        return (
          <ReservationList
            filterData={filterData}
            setCurrentPage={setCurrentPage}
            totalEl={totalEl}
            selectedTeam={selectedTeam}
            currentPage={currentPage}
            pageSize={pageSize}
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
              <ErrorBoundary
                FallbackComponent={ErrorPage}
                onReset={reset}
                resetKeys={[location.pathname]}
              >
                <MyTeamButton sport={sport} selectedTeam={selectedTeam} />
              </ErrorBoundary>
            </Suspense>
          </div>
          <div className="flex flex-row">
            {["예매 일정", "홈구장 안내", "예매정보"].map((menu) => (
              <div key={menu} onClick={() => handleMenuClick(menu)} className="mr-2 cursor-pointer">
                <MenuButton
                  menu={menu}
                  sport={sport}
                  reserveLen={menu === "예매 일정" ? totalEl : undefined}
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
