import Soccer from '../../assets/soccer.svg';
import Tennis from '../../assets/Tennis.svg';
import Baseball from '../../assets/baseball.svg';
import Basketball from '../../assets/basketball.svg';
import Volleyball from '../../assets/volleyball.svg';

interface ReservationListProps {
  sceduleLen: number;
}

const MatchListMain = ({sceduleLen}:ReservationListProps) => {

  return(
    <div className='flex w-[100%] justify-center'>
      {sceduleLen === 0 ? <div className='flex flex-col justify-center items-center'>
        {/*  이미지는 헤더 탭에 따라 변경 될 예정 */}
        <img src={Tennis} alt="Left Tap Icon" className="w-30 h-30" />
        <div>현재 oo는 시즌오프입니다.</div>
        <div>다음 시즌을 기대해주세요!</div>
      </div> : <div className='flex flex-col justify-center items-center'>
        <img src={Soccer} alt="Left Tap Icon" className="w-30 h-30" />
        <div>oo-리그 시즌 경기예매가 오픈되었습니다.</div>
        <div>좌측 메뉴에서 확인해주세요!</div>
        </div>}
    </div>
  )
}

export default MatchListMain;