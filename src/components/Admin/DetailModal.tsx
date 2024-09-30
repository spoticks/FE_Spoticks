import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { Match } from "../../common/types/type";
import ModalPortal from "../../common/components/atoms/ModalPortal";

import axios from "axios";
import ConfirmAlert from "@/common/components/molecules/ConfirmAlert";
interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export default function DetailModal({ isOpen, onClose, match }: DetailModalProps) {
  const navigate = useNavigate();
  // 경기날짜
  const matchDate = new Date(match.gameStartTime);
  // 티켓 오픈 시간
  const timeOnSale = new Date(matchDate);
  timeOnSale.setDate(matchDate.getDate() - 7); // 7일전 오픈
  timeOnSale.setHours(11, 0, 0, 0); //오전 11시로 세팅
  // console.log(timeOnSale)

  // 예매 마감 시간
  const timeOffSale = new Date(matchDate);
  timeOffSale.setHours(timeOffSale.getHours() - 7); //7시간 전 마감

  //날짜 변경 함수
  function formateDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const Detail = [
    { 종목: match.sportName, 홈팀: match.homeTeamName, 티켓오픈: formateDate(timeOnSale) },
    {
      경기시작: formateDate(matchDate),
      어웨이팀: match.awayTeamName,
      예매마감: formateDate(timeOffSale),
    },
  ];

  const handleDelete = () => {
    ConfirmAlert({
      title: "경기를 삭제하시겠습니까?",
      confirmButtonText: "삭제",
      text: "경기가 삭제되었습니다.",
      functionDispatch: async () => {
        try {
          await axios.delete(`http://localhost:3000/matches/${match.id}`);
          navigate("/admin");
          window.location.reload();
        } catch (error) {
          console.error("경기 삭제 중 오류 발생:", error);
        }
      },
    });
  };

  return (
    <ModalPortal>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="경기 상세 정보"
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className='px-[50px]" flex h-[550px] w-[500px] flex-col items-center justify-center rounded-[10px] bg-background pb-[30px] pt-[50px]'>
          <header className="mb-4 flex w-[450px] flex-row justify-between">
            <h1 className="text-2xl font-bold">경기 상세 정보</h1>
            <button
              onClick={onClose}
              className="right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-borders text-xl text-background hover:text-text-primary"
            >
              x
            </button>
          </header>
          <hr className="mb-4 w-[450px] border-t-2 border-borders" />
          <main className="flex space-x-8">
            <div className="flex flex-col font-bold">
              {Object.entries(Detail[0]).map(([key, value]) => (
                <div className="flex flex-col justify-start" key={key}>
                  <div className="font-semibold text-text-primary opacity-50">{key}:</div>
                  <div className={key === "티켓오픈" ? "text-Accent" : ""}>{value}</div>
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
          <div className="mt-4 flex justify-end space-x-11">
            <button
              onClick={handleDelete}
              className="rounded-lg bg-text-tertiary px-8 py-2 text-background"
            >
              경기 삭제
            </button>
            <Link
              to={`/admin/registration/${match.id}`}
              state={{ mode: "edit", existMatch: match }}
              className="rounded-lg bg-Accent px-8 py-2 text-background"
            >
              경기 수정
            </Link>
          </div>
        </div>
      </Modal>
    </ModalPortal>
  );
}
