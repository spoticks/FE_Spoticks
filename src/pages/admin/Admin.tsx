import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DetailModal from './DetailModal';
import { Match } from '../../type';
import axios from 'axios';

export default function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [matches, setMatches] = useState<Match[]>([]);

  // data 로드
  useEffect(() => {
      axios.get('http://localhost:3000/matches')
        .then(res => {
          setMatches(res.data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

  // 페이지네이션 및 필터링
  const filteredMatches = selectedSport === 'All' ? matches : matches.filter(match => match.sportName === selectedSport);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMatches.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지네이션
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sports = ['축구', '야구', '배구', '농구'];

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleModalOpen = (match:Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  }

  return (
    <div className="m-10 w-full flex flex-col justify-start">
      <div className="flex justify-between p-4">
        <h1 className="flex font-bold  text-2xl">등록된 경기 목록</h1>
          <Link to ={'/admin/registration'} state={{mode: 'create'}} className='bg-Accent text-white px-3 py-2 cursor-pointer rounded-[10px] hover:opacity-75'>등록하기</Link>
      </div>
      <div className="p-4">
        <table className="min-w-full bg-white rounded-[10px]">
          <thead>
            <tr className="w-full text-left text-[#B5B7C0] border-b border-borders">
              <th className="p-4">경기일</th>
              <th className="p-4">경기시작</th>
              <th className="p-4">홈팀</th>
              <th className="p-4">어웨이팀</th>
              <th className='p-4'>
                <label htmlFor="sportFilter" className="mr-2" />
                <select
                  id="sportFilter"
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="p-2 border rounded cursor-pointer hover:text-Accent"
                >
                  <option value="All">종목선택</option>
                  {sports.map((sport:string, idx:number)=>{
                      return(<option key={idx} value={sport}>{sport}</option>)
                    })}
                </select>
              </th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((match, index) => (
              <tr key={index} className="border-b border-borders">
                <td className="p-4">{match.gameStartTime.split('T')[0]}</td>
                <td className="p-4">{match.gameStartTime.split('T')[1].slice(0,5)}</td>
                <td className="p-4">{match.homeTeamName}</td>
                <td className="p-4">{match.awayTeamName}</td>
                <td className="p-4 pl-8">{match.sportName}</td>
                <td className="p-4">
                  <button onClick={() => handleModalOpen(match)} className="bg-Accent text-white px-6 py-2 rounded cursor-pointer flex items-center justify-center hover:opacity-75">
                    경기상세
                  </button>
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
              className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-Accent text-white rounded-[10px]' : 'bg-borders rounded-[10px]'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {isModalOpen && selectedMatch && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          match={selectedMatch}
        />
      )}
    </div>
  );
}
