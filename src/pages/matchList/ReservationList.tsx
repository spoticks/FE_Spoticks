import {useState, Dispatch, SetStateAction } from 'react';

interface ReservationListProps {
  setScheduleLen: Dispatch<SetStateAction<number>>;
}
const ReservationList: React.FC<ReservationListProps> = ({setScheduleLen}) => {
  const [viewMatches, setViewMatches] = useState(5);

  const addViewClick = () => {
    setViewMatches((prev)=> prev + 5)
  }

  // 샘플 데이터
  const matchData = [
    { home: '울산 HD FC', away: '포항 스틸러스', place: '울산 문수 경기장', date: '07/21(일)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/22(월)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/23(화)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/24(수)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/25(목)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/26(금)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/27(토)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/28(일)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/29(월)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/30(화)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '07/31(수)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/01(목)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/02(금)', reserveLink: '#' },
    { home: '광주 FC', away: '전북 현대모터스', place: '광주 월드컵 경기장', date: '08/03(토)', reserveLink: '#' },
    // 추가적인 경기 데이터...
  ];

  return(
    <div>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Home</th>
                  <th className="border px-4 py-2">Away</th>
                  <th className="border px-4 py-2">장소</th>
                  <th className="border px-4 py-2">날짜</th>
                  <th className="border px-4 py-2">예매하기</th>
                </tr>
              </thead>
              <tbody>
                {matchData.slice(0, viewMatches).map((match, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border px-4 py-2">{match.home}</td>
                    <td className="border px-4 py-2">{match.away}</td>
                    <td className="border px-4 py-2">{match.place}</td>
                    <td className="border px-4 py-2">{match.date}</td>
                    <td className="border px-4 py-2">
                      <a href={match.reserveLink} className="cursor-pointer hover:underline">예매하기</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {viewMatches < matchData.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={addViewClick}
                  className="bg-[#DD4255] text-white px-4 py-2 rounded"
                >
                  더보기
                </button>
              </div>
            )}
          </div>
  )
}

export default ReservationList;