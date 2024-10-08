import LeftTapIcon from "../../assets/matchListTap.svg";
import TabOpen from "../../assets/TabOpen.svg";
import TabClose from "../../assets/TabClose.svg";
import { useState } from "react";
import { leagueName, teams } from "@/common/constants";

interface TabProps {
  sport: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
}
export default function MatchListTab({ sport, setSelectedTeam }: TabProps) {
  const TapList = ["전체 일정", "예매 가이드"];
  const [isOpen, setIsOpen] = useState(false);

  const TapClick = () => {
    setIsOpen(!isOpen);
  };
  //Tab에서 team 선택했을 때
  const handleTeamClick = (team: string) => {
    setSelectedTeam(team);
  };

  const handleTabClick = (tab: string) => {
    setSelectedTeam(tab);
  };

  return (
    <div className="w-[270px]">
      <div className="mb-2 text-xs">
        홈 &gt; {sport} &gt; 2024 {leagueName[sport]} 리그
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center bg-background py-2 pl-1">
          <div>
            <img src={LeftTapIcon} alt="Left Tap Icon" className="size-3" />
          </div>
          <div className="mx-1">2024 {leagueName[sport]}리그</div>
          <div onClick={TapClick} className="cursor-pointer">
            {isOpen ? (
              <img src={TabOpen} alt="Left Tap Icon" className="size-3" />
            ) : (
              <img src={TabClose} alt="Left Tap Icon" className="size-3" />
            )}
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
            <div
              key={idx}
              className="flex flex-row items-center bg-background py-2 pl-1"
              onClick={() => handleTabClick(name)}
            >
              <div>
                <img src={LeftTapIcon} alt="Left Tap Icon" className="size-3" />
              </div>
              <div className="mx-1 cursor-pointer">{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
