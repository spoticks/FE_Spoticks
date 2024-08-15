import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../../type';
interface ReservationListProps {
  filterData: Content[]
}
const ReservationList = ({filterData}:ReservationListProps) => {
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
                {filterData.slice(0, viewMatches).map((match, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border px-4 py-2">{match.homeTeamName}</td>
                    <td className="border px-4 py-2">{match.awayTeamName}</td>
                    <td className="border px-4 py-2">{match.stadiumName}</td>
                    <td className="border px-4 py-2">{match.gameStartTime.split('T')[0]}</td>
                    <td className="border px-4 py-2">
                      <Link to={"/reservation"}
                       state={{ match: match }}
                       className="cursor-pointer hover:underline">
                        예매하기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {viewMatches < filterData.length && (
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