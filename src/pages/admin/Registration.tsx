import { useForm } from 'react-hook-form';
import Tickets from '../../assets/Tickets.svg';

type FormValues = {
  sport: string;
  date: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
};

export default function Registration() {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      sport: '',
      date: '',
      startTime: '',
      homeTeam: '',
      awayTeam: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const dateValue = watch('date');
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${year}/${month}/${day}`;
  };

  return (
    <div className='flex flex-row w-full my-5'>
      <div className='flex-1'>
        <div className="m-10 p-4">
          <div className='px-2 py-5 font-bold text-2xl'>경기 등록</div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className='flex'>
              {/* 종목 선택 */}
              <div>
                <label htmlFor="sport" className="block mb-2 font-medium">종목/경기일</label>
                <select
                  id="sport"
                  {...register('sport')}
                  className="border rounded px-3 py-[10px] w-full bg-foreground border-borders"
                >
                  <option value="">경기종목</option>
                  <option value="축구">축구</option>
                  <option value="야구">야구</option>
                  <option value="테니스">테니스</option>
                  <option value="배구">배구</option>
                </select>
              </div>

              {/* 경기일 선택 */}
              <div>
                <label htmlFor="date" className="block mb-2 font-medium">&nbsp;</label>
                <input
                  type="date"
                  id="date"
                  {...register('date')}
                  className="border rounded px-3 py-1 w-full"
                />
                <p className="text-gray-600">{dateValue ? formatDate(dateValue) : ''}</p>
              </div>
            </div>

            {/* 경기 시작 시간 선택 */}
            <div>
              <label htmlFor="startTime" className="block mb-2 font-medium">경기 시작 시간</label>
              <input
                type="time"
                id="startTime"
                {...register('startTime')}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            {/* 홈팀 선택 */}
            {/* option 은 추후 gameId 를 받아서 종목별로 변경할지 다른식으로 할지 생각중입니다. */}
            <div>
              <label htmlFor="homeTeam" className="block mb-2 font-medium">홈팀</label>
              <select
                id="homeTeam"
                {...register('homeTeam')}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">홈팀을 선택해주세요.</option>
                <option value="엔씨 다이노스">엔씨 다이노스</option>
                <option value="두산 베어스">두산 베어스</option>
                <option value="기아 타이거즈">기아 타이거즈</option>
                <option value="한화 이글스">한화 이글스</option>
              </select>
            </div>

            {/* 어웨이팀 선택 */}
            <div>
              <label htmlFor="awayTeam" className="block mb-2 font-medium">어웨이팀</label>
              <select
                id="awayTeam"
                {...register('awayTeam')}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">어웨이팀을 선택해주세요</option>
                <option value="엔씨 다이노스">엔씨 다이노스</option>
                <option value="두산 베어스">두산 베어스</option>
                <option value="기아 타이거즈">기아 타이거즈</option>
                <option value="한화 이글스">한화 이글스</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-Accent text-white px-4 py-2 rounded hover:Accent"
            >
              신규 경기 등록
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
