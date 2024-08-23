import { useEffect, useState } from 'react';
import MatchListMain from './MatchListMain';
import MatchListTab from './Tab';
import axios from 'axios';
import { Content } from '../../type';
import MatchListDetail from './MatchListDetail';

interface MatchListProps{
  sport:string;
}

export default function MatchList({sport}:MatchListProps) {
  
  //Tab에서 선택된 team 
  const [selectedTeam, setSelectedTeam] = useState('');

  //예매일정
  const [sceduleLen, setScheduleLen] = useState(0);
  const [matchData, setMatchData] = useState<Content[]>([]);
  const [filterData, setFilterData] = useState<Content[]>([]);

  //홈구장
  const [stadium, setStadium] = useState<string>('');

  useEffect(() => {
      axios.get('http://localhost:3000/content')
        .then(res => {
          const filterSport = res.data.filter((game: { sportName: string; }) => game.sportName === sport)
          setMatchData(filterSport);
          setScheduleLen(filterSport.length);
        })
        .catch(error => console.error('Error:', error));
  }, [sport]);
  // console.log('matchData :',matchData)

  useEffect(() => {
    setFilterData(
      matchData.filter((data) =>
        data.homeTeamName === selectedTeam || data.awayTeamName === selectedTeam
      )
    );
  }, [selectedTeam, matchData]);

  // console.log('filterData :',filterData);

  return (
    <div className="flex flex-row w-[1280px] pt-10">
      <MatchListTab sport={sport} setSelectedTeam={setSelectedTeam} />
      <div className="flex w-full pl-[30px]">
        {selectedTeam === '전체 일정' ? (<MatchListDetail selectedTeam={selectedTeam} filterData={matchData}   />) : selectedTeam ? (
          <MatchListDetail selectedTeam={selectedTeam} filterData={filterData}/>
        ) : (
          <MatchListMain sceduleLen={sceduleLen} sport={sport} />
        )}
      </div>
    </div>
  );
}
