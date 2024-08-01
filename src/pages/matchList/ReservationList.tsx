import { useState } from 'react';
import { Link } from 'react-router-dom';
interface Match {
  home: string;
  away: string;
  place: string;
  date: string;
  reserveLink: string;
}
interface ReservationListProps {
  matchData: Match[]
}
const ReservationList: React.FC<ReservationListProps> = ({matchData}) => {
  const [viewMatches, setViewMatches] = useState(5);

  const addViewClick = () => {
    setViewMatches((prev)=> prev + 5)
  }

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
                      <Link to={match.reserveLink} className="cursor-pointer hover:underline">
                        예매하기
                      </Link>
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