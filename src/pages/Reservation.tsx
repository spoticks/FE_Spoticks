import { useState } from "react";
interface sectionOfSeats {
  section: string;
  price: number;
  availableSeat: number;
  allSeat: number;
}

interface Seat {
  id: number;
  isReserved: boolean;
  isSelected: boolean;
}

export default function Reservation() {

  //샘플 seats
  const initSeats: Seat[] = [
    { id:1, isReserved: false, isSelected: true},
    { id:2, isReserved: true, isSelected: false},
    { id:3, isReserved: false, isSelected: false},
    { id:4, isReserved: false, isSelected: false},
    { id:5, isReserved: false, isSelected: false},
    { id:6, isReserved: false, isSelected: false},
    { id:7, isReserved: false, isSelected: false},
    { id:8, isReserved: false, isSelected: false},
    { id:9, isReserved: false, isSelected: false},
    { id:10, isReserved: false, isSelected: false},
    { id:11, isReserved: false, isSelected: false},
    { id:12, isReserved: false, isSelected: true},
    { id:13, isReserved: true, isSelected: false},
    { id:14, isReserved: false, isSelected: false},
    { id:15, isReserved: false, isSelected: false},
    { id:16, isReserved: false, isSelected: false},
    { id:17, isReserved: false, isSelected: false},
    { id:18, isReserved: false, isSelected: false},
    { id:19, isReserved: false, isSelected: false},
    { id:20, isReserved: false, isSelected: false},
    { id:21, isReserved: false, isSelected: false},
    // 10*5 50개 좌석들
  ]

  

  // 샘플 데이터
  const SeatData: sectionOfSeats[] = [
    { section: '1루', price: 12000, availableSeat: 39, allSeat: 50},
    { section: '2루', price: 12000, availableSeat: 23, allSeat: 50},
    { section: '외야', price: 12000, availableSeat: 12, allSeat: 50},
    { section: '프리미엄', price: 24000, availableSeat: 0, allSeat: 50}
  ]

  const [seats, setSeats] = useState<Seat[]>(initSeats);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatClick = (seat:Seat) => {
    //이미 예약되었거나 이미 선택한 좌석이 4자리 이상일경우
    if(seat.isReserved || selectedSeats.length >=4) return;

    const updatedSeats = seats.map((el)=> el.id === seat.id ? {...el, isSelected: !el.isSelected} : el);

    const updatedSelectedSeats = seat.isSelected ?
    selectedSeats.filter(el => el.id !== seat.id) : [...selectedSeats, seat];

    setSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);
  }

  return(
  <div>
    <div className='flex flex-row justify-between items-center'>
      <h1 className="text-[18px] font-bold rounded-[10px] border-borders border-[2px] flex items-center px-2">경기 목록</h1>
      <div className='flex-1 text-center'>
        <span className='inline-block font-bold bg-[#d9d9d9] px-1 rounded-[10px] text-[18px]'>
          좌석 선택
        </span>
      </div>
    </div>
    <h1 className='text-[40px] font-extrabold'>한화 이글스 vs 삼성라이온즈</h1>
    <div className='text-[18px] font-bold'>대구 삼성라이온즈 파크 <span>2024.07.22 18:30</span></div>
    <hr className='border-[#222222] opacity-25 border-2 ' />
    <div className='flex flex-row my-5'>
      <div className='flex flex-col'>
        <h1 className='flex justify-center text-[32px] font-bold'>1루</h1>
        <div className="grid grid-cols-10 gap-2">
          {seats.map(seat => (
            <div key={seat.id} onClick={()=> handleSeatClick(seat)} className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-[10px] text-white ${
              seat.isReserved
                ? 'bg-borders cursor-not-allowed'
                : seat.isSelected
                ? 'bg-Accent'
                : 'bg-[#222222] opacity-50'
            }`}>
              {seat.id}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='flex justify-center text-[32px] font-bold'>구역 선택</h1>
        <div className='grid grid-cols-2 gap-4 p-4'>
        {SeatData.map((section, idx)=>(
          <div key={idx} className='flex flex-col border px-7 py-2 items-center font-bold rounded-[10px] border-borders'>
            <div className='text-[24px]'>{section.section}</div>
            <div className='text-[16px]'>{section.price}원</div>
            <div className='text-[16px]'>{section.availableSeat}/{section.allSeat}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
    <hr className='border-[#222222] opacity-25 border-2' />
    <div className='flex flex-row'>
      <div className='flex flex-col'>
        <div>1루 2열 12번</div>
        <div>프리미엄 2열 12번</div>
      </div>
      <div className='flex flex-col'>
        <div>1루 2열 12번</div>
        <div>프리미엄 2열 12번</div>
      </div>
      <div className='flex flex-col'>
        <div>1루 2열 12번</div>
        <div>프리미엄 2열 12번</div>
      </div>
      <div className='flex flex-col'>
        <div>총 6 매</div>
        <div>100,000원</div>
      </div>  
      <button className='px-2 py-8 bg-Accent text-white'>다음 단계</button>
    </div>
  </div>
  );
}
