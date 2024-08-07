interface DetailModalProps {
  sportName: string;
  gameStartTime: string;
  homeTeamName: string;
  awayTeamName: string;
  timeOnSale: string;
  timeOffSale: string;
}
export default function DetailModal({sportName, gameStartTime,
homeTeamName, awayTeamName,
 timeOnSale, timeOffSale}:DetailModalProps) {
  const Detail = [{'종목': sportName, '홈팀': homeTeamName, '티켓오픈': timeOnSale}, {'경기시작':gameStartTime, '어웨이팀':awayTeamName, '예매마감': timeOffSale}]
  
  return(
    <div>
      <header>
        <h1 className="text-[30px] font-bold">경기 상세 정보</h1>
        <div className="cursor-pointer bg-borders rounded-lg w-2 h-2">x</div>
      </header>
      <hr />
      <main>
        <div className="flex flex-col">
         {Object.entries(Detail[0]).map(([key, value]) => (
            <div className="flex flex-col justify-start" key={key}>
              <div>{key}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {Object.entries(Detail[1]).map(([key, value]) => (
            <div className="flex flex-col justify-start" key={key}>
              <div>{key}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </main>
      <div>
        <button>경기 등록</button>
        <button>경기 수정</button>
      </div>
    </div>
  )
}