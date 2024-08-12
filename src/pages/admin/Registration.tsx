import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Tickets from '../../assets/Tickets.svg';
import useStore from '../../stores/useStore';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Match } from '../../type';
import axios from 'axios';

interface FormValues {
  id?: number; //수정시
  sportName: string;
  date: string;
  gameStartTime: string;
  stadiumName: string;
  homeTeamName: string;
  awayTeamName: string;
}

interface ModeProps {
  mode: 'create' | 'edit';
  existMatch?: Match;
}

export default function Registration() {
  const location = useLocation();
  const {mode, existMatch}:ModeProps = location.state;
  console.log(mode, existMatch)
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: existMatch || {
      sportName: '',
      date: '',
      gameStartTime: '',
      stadiumName: '',
      homeTeamName: '',
      awayTeamName: '',
    }
  });

  const navigate = useNavigate();
  const {addMatch, updateMatch} = useStore(state => ({
    addMatch: state.addMatch,
    updateMatch: state.updateMatch
  }));

  const onSubmit = async(data: FormValues) => {
    try{
      console.log(data);
      const addDateTime = `${data.date}T${data.gameStartTime}`;
      const matchData = {
        sportName: data.sportName,
        gameStartTime: addDateTime,
        stadiumName: data.stadiumName,
        homeTeamName: data.homeTeamName,
        awayTeamName: data.awayTeamName,
      }
      if(mode === 'create'){
        const res = await axios.post('http://localhost:3000/matches', matchData);
        addMatch(res.data);
      } else if(mode === 'edit' && existMatch){
        console.log(existMatch.id)
        if (existMatch.id !== undefined) { 
          const updatedMatch = {
            ...existMatch,
            ...matchData,
            id: existMatch.id,
          };
          const res = await axios.patch(`http://localhost:3000/matches/${existMatch.id}`, updatedMatch)
          updateMatch(res.data);
        }
        }
      navigate('/admin');
    }
    catch(err) {
      console.error('Error: ', err);
    }
  };

  const sports = ['축구', '야구', '배구', '농구'];
  // 샘플데이터
  const teams: Record<string, string[]> = {
    '축구': ['울산 현대', '포항 스틸러스', '전북 현대 모터스', 'FC 서울', '수원 삼성 블루윙즈', '인천 유나이티드', '대구 FC', '강원 FC', '제주 유나이티드'],
    '야구': ['NC 다이노스', '기아 타이거즈', '두산 베어스', '한화 이글스', '키움 히어로즈', 'LG 트윈스', '삼성 라이온즈', '롯데 자이언츠', 'SSG 랜더스', 'KT 위즈'],
    '배구': ['대한항공점보스', '현대캐피탈', 'ok금융그룹', '우리카드', 'kb손해보험 스타즈'],
    '농구': ['서울 Sk 나이츠', '고양 캐롯 점퍼스', '원주 DB 프로미']
    }
  const stadiums: Record<string, string[]> = {
    '축구': ['울산', '포항', '전북'],
    '야구': ['대구', '잠실(서울)', '고척(서울)', '사직(부산)', '문학(인천)', 'NC파크(창원)'],
    '배구': ['인천', '천안', '안산', '장충(서울)', '의정부', '대전', '수원'],
    '농구': ['서울', '고양', '원주']
  }
  const sportValue = watch('sportName');
  const homeTeamValue = watch('homeTeamName');
  const teamsInSport = sportValue ? teams[sportValue] || [] : [];
  const stadiumsInSport = sportValue ? stadiums[sportValue] || [] : [];

  useEffect(() => {
    if(mode === 'create'){
      setValue('homeTeamName', '');
      setValue('awayTeamName', '');
    }else if( mode === 'edit' && existMatch){
      setValue('sportName', existMatch.sportName);
      setValue('date', existMatch.gameStartTime.split('T')[0]);
      setValue('gameStartTime', existMatch.gameStartTime.split('T')[1]);
      setValue('homeTeamName', existMatch.homeTeamName);
      setValue('awayTeamName', existMatch.awayTeamName);
    }
  }, [mode, existMatch, setValue]);

  return (
    <div className='flex flex-row w-full my-5'>
      <div className='flex-1'>
        <div className="m-10 p-4">
          <div className='px-2 py-5 font-bold text-2xl'>{mode === 'create' ? '경기 등록' : '경기 수정'}</div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className='flex'>
              {/* 종목 선택 */}
              <div>
                <label htmlFor="sport" className="block mb-2 font-medium">종목/경기일</label>
                <select
                  id="sport"
                  {...register('sportName')}
                  className="border rounded px-3 py-[10px] w-full bg-foreground border-borders cursor-pointer"
                >
                  <option value="">경기종목</option>
                  {sports.map((sport:string, idx:number)=>{
                    return(<option key={idx} value={sport}>{sport}</option>)
                  })}
                </select>
              </div>
              {/* 경기일 선택 */}
              <div>
                <label htmlFor="date" className="block mb-2 font-medium">&nbsp;</label>
                <input
                  type="date"
                  id="date"
                  {...register('date')}
                  className="border rounded px-3 py-1 w-full cursor-pointer"
                />
              </div>
            </div>

            {/* 경기 시작 시간 선택 */}
            <div>
              <label htmlFor="startTime" className="block mb-2 font-medium">경기 시작 시간</label>
              <input
                type="time"
                id="startTime"
                {...register('gameStartTime')}
                className="border rounded px-3 py-2 w-full cursor-pointer"
              />
            </div>

            {/* 장소 선택 */}
            <div>
              <label htmlFor="homeTeam" className="block mb-2 font-medium">장소</label>
              <select
                id="stadiumName"
                {...register('stadiumName')}
                className="border rounded px-3 py-2 w-full"
                disabled={!sportValue}
              >
                <option value="">장소를 선택해주세요.</option>
                {stadiumsInSport.map((stadium: string) => (
                  <option key={stadium} value={stadium}>{stadium}</option>
                ))}
              </select>
            </div>

            {/* 홈팀 선택 */}
            <div>
              <label htmlFor="homeTeam" className="block mb-2 font-medium">홈팀</label>
              <select
                id="homeTeam"
                {...register('homeTeamName')}
                className="border rounded px-3 py-2 w-full"
                disabled={!sportValue}
              >
                <option value="">홈팀을 선택해주세요.</option>
                {teamsInSport.map((team: string) => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* 어웨이팀 선택 */}
            <div>
              <label htmlFor="awayTeam" className="block mb-2 font-medium">어웨이팀</label>
              <select
                id="awayTeam"
                {...register('awayTeamName')}
                className="border rounded px-3 py-2 w-full"
                disabled={!sportValue}
              >
                <option value="">어웨이팀을 선택해주세요</option>
                {teamsInSport
                  .filter((team: string) => team !== homeTeamValue)
                  .map((team: string) => (
                    <option key={team} value={team}>{team}</option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-Accent text-white px-4 py-2 rounded hover:Accent"
            >
              {mode === 'create' ? '신규 경기 등록' : '경기 수정'}
            </button>
          </form>
        </div>
      </div>
      <div className='flex-2 flex'>
        <img src={Tickets} alt="Tickets" className="w-30 h-30" />
      </div>
    </div>
  )
}
