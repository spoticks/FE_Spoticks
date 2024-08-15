import LeftTapIcon from '../../assets/matchListTap.svg';
import TapOpen from '../../assets/TapOpen.svg';
import TapClose from '../../assets/TapClose.svg';
import { teams } from '../../components/constants';
import { useState } from "react";
import { leagueName } from '../../components/constants';

interface TabProps {
  sport: string;
  setSelectedTeam:React.Dispatch<React.SetStateAction<string>>
}
export default function MatchListTab ({sport, setSelectedTeam}:TabProps) {
  const TapList = ['전체 일정', '예매 가이드'];
  const [isOpen, setIsOpen] = useState(false);
  
  const TapClick = () => {
    setIsOpen(!isOpen);
  };
  //Tab에서 team 선택했을 때
  const handleTeamClick = (team:string) => {
    setSelectedTeam(team);
  };

  const handleTabClick = (tab:string) => {
    setSelectedTeam(tab);
  }

  return(
    <div className="w-[270px]">
        <div className="text-xs mb-2">홈 &gt; {sport} &gt; 2024 {leagueName[sport]} 리그</div>
        <div className="flex flex-col">
          <div className='flex flex-row items-center pl-1 bg-background py-2'>
            <div>
              <img src={LeftTapIcon} alt="Left Tap Icon" className="w-3 h-3" />
            </div>
            <div className='mx-1'>2024 {leagueName[sport]}리그</div>
            <div onClick={TapClick} className="cursor-pointer">
              {isOpen ? <img src={TapOpen} alt="Left Tap Icon" className="w-3 h-3" /> : <img src={TapClose} alt="Left Tap Icon" className="w-3 h-3" />}
            </div>
          </div>
          {
            isOpen ? <div className='transition-transform '>
              {teams[sport].map((name:string)=> {
                return(<div key={name} onClick={() => handleTeamClick(name)} className="flex justify-center bg-borders opacity-45 cursor-pointer py-1">
                  {name}
                </div>)
              })}
            </div> : <></>
          }
          {TapList.map((name, idx)=>{
            return(
              <div key={idx} className='flex flex-row items-center pl-1 py-2 bg-background' onClick={()=> handleTabClick(name)}>
                <div>
                  <img src={LeftTapIcon} alt="Left Tap Icon" className="w-3 h-3" />
                </div>
                <div className='mx-1 cursor-pointer'>{name}</div>
              </div>
            )
          })}
        </div>
      </div>
  )
}