import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../../type';
import Button from '../../components/Button';
interface ReservationListProps {
  filterData: Content[]
}
const ReservationList = ({filterData}:ReservationListProps) => {
  const [viewMatches, setViewMatches] = useState(5);

  const addViewClick = () => {
    setViewMatches((prev)=> prev + 5)
  }

  const columnName = ['Home', "Away", "장소", "날짜", ""]

  return(
    <div>
      <table className="w-full border-separate mx-[-10px] border-spacing-x-[10px]">
        <thead>
          <tr>
          {columnName.map(column => (
            <th key={column} className={`text-text-primary opacity-50 border px-4 py-2 ${column === "" ? 'bg-none border-none' : 'bg-foreground'}`}>{column}</th>
          ))}
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
                <Link to={`/reservation/${match.gameId}`}
                  state={{ match: match }}
                  className="cursor-pointer hover:underline">
                  <Button content="예매하기" />
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
            className="bg-Accent text-white px-4 py-2 rounded"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  )
}

export default ReservationList;