import LeftTapIcon from "@/assets/matchListTap.svg?react";
import TabOpen from "@/assets/TabOpen.svg?react";
import TabClose from "@/assets/TabClose.svg?react";
import { teams, leagueName } from "@/common/constants";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MainMatchType } from "@/common/types/matchTypes";

interface TabProps {
  sport: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
  setFilterData: React.Dispatch<React.SetStateAction<MainMatchType[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export default function MatchListTab({
  sport,
  setSelectedTeam,
  setFilterData,
  setCurrentPage,
}: TabProps) {
  // const navigate = useNavigate();

  const TabStyle = "flex flex-row items-center bg-background py-2 pl-1";
  const TeamListIconStyle =
    "size-3 transform transition-all duration-300 ease-in-out absolute transform-origin-center top-[-10px]";

  const TapList = ["전체 일정", "예매 가이드"];

  const [isOpen, setIsOpen] = useState(false);

  const TapClick = () => {
    setIsOpen(!isOpen);
  };
  //Tab에서 team 선택했을 때
  const handleTeamClick = (team: string) => {
    setSelectedTeam(team);
    setFilterData([]);
    setCurrentPage(1);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTeam(tab);
  };

  return (
    <div className="w-[300px]">
      <h5 className="mb-2 pl-1 text-xs">
        홈 &gt; {sport} &gt; 2024 {leagueName[sport]} 리그
      </h5>
      <div className="flex flex-col">
        <div className={TabStyle}>
          <LeftTapIcon className="size-3" />
          <h3 className="mx-1">2024 {leagueName[sport]}리그</h3>
          <div onClick={TapClick} className="relative cursor-pointer border-none">
            <TabOpen className={`${TeamListIconStyle} ${isOpen ? "opacity-100" : "opacity-0"}`} />
            <TabClose className={`${TeamListIconStyle} ${isOpen ? "opacity-0" : "opacity-100"}`} />
          </div>
        </div>
        {isOpen ? (
          <div className="transition-transform">
            {teams[sport].map((name: string) => {
              return (
                <div
                  key={name}
                  onClick={() => handleTeamClick(name)}
                  className="flex cursor-pointer justify-center bg-borders py-1 opacity-45"
                >
                  {name}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {TapList.map((name, idx) => {
          return (
            <div key={idx} className={TabStyle} onClick={() => handleTabClick(name)}>
              <LeftTapIcon className="size-3" />
              <h3 className="mx-1 cursor-pointer">{name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
