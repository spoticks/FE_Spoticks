import Modal from 'react-modal';
import { Link } from 'react-router-dom';
interface DetailModalProps {
  isOpen: boolean;
  sportName: string;
  gameStartTime: string;
  homeTeamName: string;
  awayTeamName: string;
  timeOnSale: string;
  timeOffSale: string;
  onClose: () => void;
}

export default function DetailModal ({
  isOpen,
  sportName,
  gameStartTime,
  homeTeamName,
  awayTeamName,
  timeOnSale,
  timeOffSale,
  onClose
}: DetailModalProps) {
  const Detail = [
    { '종목': sportName, '홈팀': homeTeamName, '티켓오픈': timeOnSale },
    { '경기시작': gameStartTime, '어웨이팀': awayTeamName, '예매마감': timeOffSale },
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
          <Link to={"/admin/registration"} className="bg-borders text-background px-8 py-2 rounded-lg">경기 등록</Link>
          <button className="bg-Accent text-background px-8 py-2 rounded-lg">경기 수정</button>
        </div>
      </div>
    </Modal>
  );
}
