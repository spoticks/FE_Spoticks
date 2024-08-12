import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { Match } from '../../type';
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export default function DetailModal ({
  isOpen,
  onClose,
  match
}: DetailModalProps) {
  // 경기날짜
  const matchDate = new Date(match.gameStartTime);
  // 티켓 오픈 시간
  const timeOnSale = new Date(matchDate);
  timeOnSale.setDate(matchDate.getDate()-7); // 7일전 오픈
  timeOnSale.setHours(11,0,0,0); //오전 11시로 세팅
  // console.log(timeOnSale)
  
  // 예매 마감 시간
  const timeOffSale = new Date(matchDate);
  timeOffSale.setHours(timeOffSale.getHours()-7); //7시간 전 마감

  //날짜 변경 함수
  function formateDate(date:Date){
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } 

  const Detail = [
    { '종목': match.sportName, '홈팀': match.homeTeamName, '티켓오픈': formateDate(timeOnSale) },
    { '경기시작': formateDate(matchDate), '어웨이팀': match.awayTeamName, '예매마감': formateDate(timeOffSale) },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="경기 상세 정보"
      className="modal fixed inset-0 flex justify-center items-center"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50"
    >
      <div className='bg-background w-[500px] h-[550px] flex flex-col items-center justify-center rounded-[10px] pt-[50px] pb-[30px] px-[50px]"'>
        <header className="w-[450px] justify-between mb-4 flex flex-row">
          <h1 className=" text-2xl font-bold">경기 상세 정보</h1>
          <button
            onClick={onClose}
            className="top-3 right-3 text-background bg-borders rounded-full w-5 h-5 hover:text-text-primary text-xl flex items-center justify-center"
          >
            x
          </button>
        </header>
        <hr className="w-[450px] border-t-2 border-borders mb-4" />
        <main className="flex space-x-8">
          <div className="flex flex-col font-bold">
            {Object.entries(Detail[0]).map(([key, value]) => (
              <div className="flex flex-col justify-start" key={key}>
                <div className="font-semibold text-text-primary opacity-50">{key}:</div>
                <div className={key === '티켓오픈' ? 'text-Accent' : ''}>{value}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-bold">
            {Object.entries(Detail[1]).map(([key, value]) => (
              <div className="flex flex-col items-end" key={key}>
                <div className="font-semibold text-text-primary opacity-50">{key}:</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </main>
        <div className="flex justify-end mt-4 space-x-11">
          <Link to={`/admin/registration/${match.id}`} state={{mode: 'edit', existMatch: match}} className="bg-Accent text-background px-8 py-2 rounded-lg">경기 수정</Link>
        </div>
      </div>
    </Modal>
  );
}
