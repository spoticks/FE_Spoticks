import LeftTapIcon from "@/assets/matchListTap.svg?react";
import TabOpen from "@/assets/TabOpen.svg?react";
import TabClose from "@/assets/TabClose.svg?react";
import { teams, leagueName } from "@/common/constants";
import { useEffect, useState } from "react";
import Loading from "@/common/components/atoms/Loading";

interface TabProps {
  sport: string;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

export default function MatchListTab({
  sport,
  setSelectedTeam,
  setCurrentPage,
  isLoading,
}: TabProps) {
  const TabStyle = "flex flex-row items-center bg-background py-2 pl-1 bg-foreground";
  const TeamListIconStyle =
    "size-3 transform transition-all duration-300 ease-in-out absolute transform-origin-center top-[-10px]";

  const TapList = ["전체 일정", "예매 가이드"];
  const currentYear: number = new Date().getFullYear();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [activeTeam, setActiveTeam] = useState<string>("");

  const TapClick = () => {
    setIsOpen(!isOpen);
  };

  const [pendingTeam, setPendingTeam] = useState<string | null>(null);

  useEffect(() => {
    if (pendingTeam) {
      setSelectedTeam(pendingTeam);
      setActiveTeam(pendingTeam);
      setActiveTab("");
      setPendingTeam(null);
    }
  }, [pendingTeam, setSelectedTeam]);

  // Tab에서 team 선택했을 때
  const handleTeamClick = (team: string) => {
    setCurrentPage(1);
    setPendingTeam(team);
  };

  const handleTabClick = (tab: string) => {
    setPendingTeam(tab);
  };

  return (
    <section className="w-[300px]">
      <h5 className="mb-2 pl-1 text-xs">
        홈 &gt; {sport} &gt; {currentYear} {leagueName[sport]} 리그
      </h5>
      <div className="flex flex-col">
        <div className={TabStyle}>
          <LeftTapIcon className="size-3" />
          <h3 className="mx-1">
            {currentYear} {leagueName[sport]}리그
          </h3>
          <div onClick={TapClick} className="relative cursor-pointer border-none">
            <TabOpen className={`${TeamListIconStyle} ${isOpen ? "opacity-100" : "opacity-0"}`} />
            <TabClose className={`${TeamListIconStyle} ${isOpen ? "opacity-0" : "opacity-100"}`} />
          </div>
        </div>
        {isOpen ? (
          isLoading ? (
            <Loading />
          ) : (
            <div className="transition-transform">
              {teams[sport].map((name: string) => {
                return (
                  <div
                    key={name}
                    onClick={() => handleTeamClick(name)}
                    className={`flex cursor-pointer justify-center bg-focused-input-background py-1 ${
                      activeTeam === name ? "font-bold text-Accent" : ""
                    }`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <></>
        )}
        {/* 전체 일정, 예매 가이드 탭 */}
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            TapList.map((name, idx) => {
              return (
                <div
                  key={idx}
                  className={`${TabStyle} ${activeTab === name ? "font-bold text-Accent" : ""}`}
                  onClick={() => handleTabClick(name)}
                >
                  <LeftTapIcon className="size-3" />
                  <h3 className="mx-1 cursor-pointer">{name}</h3>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
