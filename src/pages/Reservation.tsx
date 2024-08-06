import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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
  price:number;
}

interface FormData {
  section: string;
}

export default function Reservation() {
  const location = useLocation();
  const matchData = location.state?.match;
  // console.log(matchData);

  // 샘플 데이터
  const initSectionData: sectionOfSeats[] = [
    { section: '1루', price: 12000, availableSeat: 39, allSeat: 50},
    { section: '2루', price: 12000, availableSeat: 23, allSeat: 50},
    { section: '외야', price: 12000, availableSeat: 12, allSeat: 50},
    { section: '프리미엄', price: 24000, availableSeat: 34, allSeat: 50}
  ]

  // 샘플 좌석 데이터 생성
  const createSeats = (allSeat: number, availableSeat: number, price: number): Seat[] => {
    const seats: Seat[] = Array.from({ length: allSeat }, (_, idx) => ({
      id: idx + 1,
      isReserved: idx >= availableSeat, // 예약된 좌석은 availableSeat만큼 설정
      isSelected: false,
      price,
    }));

    return seats;
  };

  // 초기 좌석 데이터 생성
  const initSeats = initSectionData.reduce((acc, section) => {
    acc[section.section] = createSeats(section.allSeat, section.availableSeat, section.price);
    return acc;
  }, {} as Record<string, Seat[]>);

  const { control, watch } = useForm<FormData>({
    defaultValues: {
      section: '1루',
    }
  });

  const selectedSection = watch('section');
  const selectedSectionData = initSectionData.find(section => section.section === selectedSection);

  const [seats, setSeats] = useState<Seat[]>(initSeats[selectedSection]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [sectionData, setSectionData] = useState<sectionOfSeats[]>(initSectionData);

  useEffect(() => {
    setSeats(initSeats[selectedSection]);
    setSelectedSeats([]); // 섹션이 바뀔 때 선택된 좌석 초기화
  }, [selectedSection]);

  const handleSeatClick = (seat: Seat) => {
    // 이미 예약되었거나 이미 선택한 좌석이 4자리 이상일 경우
    if (seat.isReserved || (seat.isSelected === false && selectedSeats.length >= 4)) return;

    const updatedSeats = seats.map((el) => el.id === seat.id ? { ...el, isSelected: !el.isSelected } : el);

    const updatedSelectedSeats = seat.isSelected
      ? selectedSeats.filter(el => el.id !== seat.id)
      : [...selectedSeats, seat];

    setSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);

    const newSectionData = sectionData.map(section => {
      if (section.section === selectedSection) {
        return {
          ...section,
          availableSeat: seat.isSelected ? section.availableSeat + 1 : section.availableSeat - 1
        };
      }
      return section;
    });
    setSectionData(newSectionData);
  }

  return(
  <div>
    <div className='flex flex-row justify-between items-center'>
      <h3 className="text-[18px] font-bold rounded-[10px] border-borders border-[2px] flex items-center px-2">경기 목록</h3>
      <div className='flex-1 text-center'>
        <span className='inline-block font-bold bg-[#d9d9d9] px-1 rounded-[10px] text-[18px]'>
          좌석 선택
        </span>
      </div>
    </div>
    <h1 className='text-[40px] font-extrabold'>{matchData.home} vs {matchData.away}</h1>
    <div className='text-[18px] font-bold'>{matchData.place} <span>2024.07.22 18:30</span></div>
    <hr className='border-[#222222] opacity-25 border-2 ' />
    <div className='flex flex-row my-5'>
      <div className='flex flex-col'>
        <h1 className='flex justify-center text-[32px] font-bold'>{selectedSection}</h1>
        <div className="grid grid-cols-10 gap-2">
          {seats.map(seat => (
            <div key={seat.id} onClick={()=> handleSeatClick(seat)} className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-[10px] text-white ${
              seat.isReserved
                ? 'bg-borders cursor-not-allowed'
                : seat.isSelected
                ? 'bg-Accent'
                : 'bg-text-primary opacity-50'
            }`}>
              {seat.id}
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='flex justify-center text-[32px] font-bold'>구역 선택</h1>
        <div className='grid grid-cols-2 gap-4 p-4'>
        {sectionData.map((section, idx) => (
              <Controller
                key={idx}
                name="section"
                control={control}
                render={({ field }) => (
                  <div
                    onClick={() => {
                      field.onChange(section.section);
                      setSeats(initSeats[section.section]);
                    }}
                    className='flex flex-col border px-7 py-2 items-center font-bold rounded-[10px] border-borders cursor-pointer'>
                    <div className='text-[24px]'>{section.section}</div>
                    <div className='text-[16px]'>{section.price}원</div>
                    <div className='text-[16px]'>{section.availableSeat}/{section.allSeat}</div>
                  </div>
                )}
              />
            ))}
        </div>
      </div>
    </div>
    <hr className='border-[#222222] opacity-25 border-2' />
    <div className='flex flex-row justify-between items-center'>
      <div className="flex items-center">
      {selectedSeats.map(seat => (
          <div key={seat.id} className='flex flex-col items-center'>
            <div>{selectedSection} {Math.ceil(seat.id / 10)}열 {seat.id}번</div>
            <div>{seat.price}원</div>
          </div>
        ))}
      </div>
      <div className='flex flex-col'>
        <div className="text-[20px] font-bold">총 {selectedSeats.length} 매</div>
        <div className="text-[28px] font-bold">{selectedSeats.reduce((total, seat) => total + seat.price, 0)}원</div>
      </div>  
      <button className='px-8 py-2 rounded-[10px] bg-Accent text-white cursor-pointer'>다음 단계</button>
    </div>
  </div>
  );
}
