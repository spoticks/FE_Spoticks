import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Match {
  date: string;
  gameStartTime: string;
  homeTeamName: string;
  awayTeamName: string;
  sportName: string;
  reserveLink: string;
}

const matches: Match[] = [
  { date: '2024/08/01', gameStartTime: '18:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '축구', reserveLink: '#' },
  { date: '2024/08/02', gameStartTime: '19:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '야구', reserveLink: '#' },
  { date: '2024/08/03', gameStartTime: '20:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '테니스', reserveLink: '#' },
  { date: '2024/08/04', gameStartTime: '21:00', homeTeamName: '삼성라이온즈', awayTeamName: '엔씨다이노스', sportName: '배구', reserveLink: '#' }
];

export default function Admin() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedSport, setSelectedSport] = useState<string>('All');

  // 페이지네이션 및 필터링
  const filteredMatches = selectedSport === 'All' ? matches : matches.filter(match => match.sportName === selectedSport);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMatches.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="m-10 w-[100%] flex flex-col justify-start">
      <div className="flex justify-between p-4">
        <h1 className="flex font-bold px-5 text-2xl">등록된 경기 목록</h1>
          <button onClick={() => navigate('/admin/registration')} className='bg-Accent text-white px-3 py-2 cursor-pointer rounded-[10px]'>등록하기</button>
      </div>
      <div className="p-4">
        <table className="min-w-full bg-white rounded-[10px]">
          <thead>
            <tr className="w-full text-left text-borders border-b border-borders">
              <th className="p-4">경기일</th>
              <th className="p-4">경기시작</th>
              <th className="p-4">홈팀</th>
              <th className="p-4">어웨이팀</th>
              <label htmlFor="sportFilter" className="mr-2" />
              <select
                id="sportFilter"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="p-2 border rounded cursor-pointer"
              >
                <option value="All">종목선택</option>
                <option value="축구">축구</option>
                <option value="야구">야구</option>
                <option value="테니스">테니스</option>
                <option value="배구">배구</option>
              </select>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((match, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-4">{match.date}</td>
                <td className="p-4">{match.gameStartTime}</td>
                <td className="p-4">{match.homeTeamName}</td>
                <td className="p-4">{match.awayTeamName}</td>
                <td className="p-4">{match.sportName}</td>
                <td className="p-4">
                  <Link to={match.reserveLink} className="bg-Accent text-white px-3 py-2 rounded">
                    경기상세
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredMatches.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-Accent text-white rounded-[10px]' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
