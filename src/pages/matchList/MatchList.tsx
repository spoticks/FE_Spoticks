import { useEffect, useState } from 'react';
import LeftTapIcon from '../../assets/matchListTap.svg';
import TapOpen from '../../assets/TapOpen.svg';
import TapClose from '../../assets/TapClose.svg';
import ReserveIcon from '../../assets/reserveIcon.svg';
import HomeIcon from '../../assets/homeIcon.svg';
import InfoIcon from '../../assets/infoIcon.svg';
import Heart from '../../assets/Heart.svg';
import ReservationList from './ReservationList';
import ReserveInfo from './ReserveInfo';
import HomeInfo from './HomeInfo';
import MatchListMain from './MatchListMain';

interface MatchListProps{
  sport:string;
}

export default function MatchList({sport}:MatchListProps) {
  //Tap
  const TapList = ['전체 일정', '예매 가이드'];
  const Leagues = {
    soccer: ['울산 HD FC', '포항 스틸러스', '광주 FC', '전북 현대모터스']
  }

  const [isOpen, setIsOpen] = useState(false);
  
  const TapClick = () => {
    setIsOpen(!isOpen);
  };
  //Tab에서 team 선택했을 때
  const [selectedTeam, setSelectedTeam] = useState('');
   const handleTeamClick = (team:string) => {
    setSelectedTeam(team);
  };

  //예매내역, 홈구장안내, 예매설명
  const [selectedMenu, setSelectedMenu] = useState('');
  const handleMenuClick = ((menu:string)=>{
    setSelectedMenu(menu);
  })

  //예매일정 리스트 길이
  const [sceduleLen, setScheduleLen] = useState(0);
    const matchData = [
    { home: '울산 HD FC', away: '포항 스틸러스', place: '울산 문수 경기장', date: '07/21(일)', reserveLink: '/reservation' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/22(월)', reserveLink: '/reservation/2' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/23(화)', reserveLink: '/reservation/3' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/24(수)', reserveLink: '/reservation/4' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/25(목)', reserveLink: '/reservation/5' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/26(금)', reserveLink: '/reservation/6' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/27(토)', reserveLink: '/reservation/7' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/28(일)', reserveLink: '/reservation/8' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/29(월)', reserveLink: '/reservation/9' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/30(화)', reserveLink: '/reservation/10' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/31(수)', reserveLink: '/reservation/11' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/01(목)', reserveLink: '/reservation/12' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/02(금)', reserveLink: '/reservation/13' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/03(토)', reserveLink: '/reservation/14' },
    // 추가적인 경기 데이터...
  ];
  useEffect(()=>{
    setScheduleLen(matchData.length);
  },[])
  console.log(sceduleLen);
  const MenuList = () => {
    switch(selectedMenu) {
      case '예매 일정':
        return <ReservationList matchData={matchData} />;
      case '홈구장 안내':
        return <HomeInfo />;
      case '예매정보':
        return <ReserveInfo />;
      default:
        return <ReservationList matchData={matchData} />;
    }
  }
  

  return (
    <div className="flex flex-row w-[1280px] pt-10">
      <div className="w-[220px]">
        <div className="text-xs">홈 &gt; {sport} &gt; 2024 K 리그</div>
        <div className="flex flex-col">
          <div className='flex flex-row'>
            <div>
              <img src={LeftTapIcon} alt="Left Tap Icon" className="w-3 h-3" />
            </div>
            <div className='mx-1'>2024 k리그</div>
            <div onClick={TapClick} className="cursor-pointer">
              {isOpen ? <img src={TapOpen} alt="Left Tap Icon" className="w-3 h-3" /> : <img src={TapClose} alt="Left Tap Icon" className="w-3 h-3" />}
            </div>
          </div>
          {
            isOpen ? <div>
              {Leagues.soccer.map((name)=> {
                return(<div key={name} onClick={() => handleTeamClick(name)} className="cursor-pointer">
                  {name}
                </div>)
              })}
            </div> : <></>
          }
          {TapList.map((name, idx)=>{
            return(
              <div key={idx} className='flex flex-row'>
                <div>
                  <img src={LeftTapIcon} alt="Left Tap Icon" className="w-3 h-3" />
                </div>
                <div className='mx-1'>{name}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex w-[100%] px-[106px]">
        {selectedTeam ? (
          <div className='w-[100%]'>
            <div className='header flex flex-row w-[100%] items-center'>
              <div className='flex flex-col mr-[100px]'>
                <div>{selectedTeam}</div>
                <div>경기목록을 확인하고 예매해보세요!</div>
                <div className='flex flex-row'>
                  <div onClick={() => handleMenuClick('예매 일정')} className='flex flex-row w-[200px] justify-around items-center cursor-pointer'>
                    <img src={ReserveIcon} alt="Left Tap Icon" className="w-3 h-3" />
                    <div>예매 일정</div>
                    <div>{sceduleLen}</div>
                  </div>
                  <div onClick={() => handleMenuClick('홈구장 안내')} className='flex flex-row w-[200px] justify-around items-center cursor-pointer'>
                    <img src={HomeIcon} alt="Left Tap Icon" className="w-3 h-3" />
                    <div>홈구장 안내</div>
                  </div>
                  <div onClick={() => handleMenuClick('예매정보')} className='flex flex-row w-[200px] justify-around items-center cursor-pointer'>
                    <img src={InfoIcon} alt="Left Tap Icon" className="w-3 h-3" />
                    <div>예매정보</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <img src={Heart} alt="Left Tap Icon" className="w-3 h-3" />
                <div>홈팀</div>
              </div>
            </div>
            <div />
            <div className='pt-4'>
              {MenuList()}
            </div>
          </div>
        ) : (
          <MatchListMain sceduleLen={sceduleLen} />
        )}
      </div>
    </div>
  );
}
