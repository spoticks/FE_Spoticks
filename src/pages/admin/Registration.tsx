import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Tickets from '../../assets/Tickets.svg';
import useStore from '../../stores/useStore';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  id?: number; //수정시
  sportName: string;
  date: string;
  gameStartTime: string;
  homeTeamName: string;
  awayTeamName: string;
};

interface ModeProps {
  mode: 'create' | 'edit';
  existMatch?: FormValues;
}

export default function Registration({ mode, existMatch }: ModeProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: existMatch || {
      sportName: '',
      date: '',
      gameStartTime: '',
      homeTeamName: '',
      awayTeamName: '',
    }
  });

  const navigate = useNavigate();
  const {addMatch, updateMatch} = useStore(state => ({
    addMatch: state.addMatch,
    updateMatch: state.updateMatch
  }));

  const onSubmit = (data: FormValues) => {
    console.log(data);
    if(mode === 'create'){
      const newMatch = {
        ...data,
        id: Math.random(), // 추후 서버에서 받음
        date: data.date.replace(/-/g, '/'),
        reserveLink: '/' // 추후 수정
      };
      addMatch(newMatch);
      navigate('/admin');
    } else if(mode === 'edit' && existMatch){
      if (existMatch.id !== undefined) { 
        const updatedMatch = {
          ...existMatch,
          ...data,
          id: existMatch.id,
        };
        updateMatch(updatedMatch);
      }
      navigate('/admin');
    }
    // const newMatch = {
    //   id: data.id,
    //   date: data.date.replace(/-/g, '/'),
    //   gameStartTime: data.startTime,
    //   homeTeamName: data.homeTeam,
    //   awayTeamName: data.awayTeam,
    //   sportName: data.sport,
    //   reserveLink: '#'
    // };
  };

  // const dateValue = watch('date');
  // const formatDate = (dateString: string): string => {
  //   const [year, month, day] = dateString.split('-');
  //   return `${year}/${month}/${day}`;
  // };
  const sports = ['축구', '야구', '배구', '농구'];
  // 샘플데이터
  const teams: Record<string, string[]> = {
    '축구': ['울산', '포항', '전북'],
    '야구': ['엔씨다이노스', '기아타이거즈', '두산베어스', '한화이글스', '키움히어로즈'],
    '배구': ['대한항공점보스', '현대캐피탈', 'ok금융그룹', '우리카드', 'kb손해보험 스타즈'],
    '농구': ['서울 Sk 나이츠', '고양 캐롯 점퍼스', '원주 DB 프로미']
    }
  const sportValue = watch('sportName');
  const homeTeamValue = watch('homeTeamName');
  const teamsInSport = sportValue ? teams[sportValue] || [] : [];

  useEffect(() => {
    if(mode === 'create'){
      setValue('homeTeamName', '');
      setValue('awayTeamName', '');
    }else if( mode === 'edit' && existMatch){
      setValue('sportName', existMatch.sportName);
      setValue('date', existMatch.date);
      setValue('gameStartTime', existMatch.gameStartTime);
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
                {/* <p className="text-gray-600">{dateValue ? formatDate(dateValue) : ''}</p> */}
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

            {/* 홈팀 선택 */}
            {/* option 은 추후 gameId 를 받아서 종목별로 변경할지 다른식으로 할지 생각중입니다. */}
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
