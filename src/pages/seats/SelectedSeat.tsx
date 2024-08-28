import { Seat } from "../../type";

interface SelectedSeatsSummaryProps {
  selectedSeats: Seat[];
  selectedSection: string;
}

export default function SelectedSeats({
  selectedSeats,
  selectedSection,
}: SelectedSeatsSummaryProps) {
  
  return (
    <div className='flex flex-row justify-between items-center'>
      <div className="flex items-center">
        {selectedSeats?.map(seat => (
          <div key={seat.id} className='flex flex-col items-center'>
            <div>{selectedSection} {Math.ceil(seat.id / 10)}열 {seat.id}번</div>
            <div>{seat.price}원</div>
          </div>
        ))}
      </div>
      <div className='flex flex-col'>
        <div className="text-[20px] font-bold">총 {selectedSeats.length} 매</div>
        <div className="text-[28px] font-bold">{selectedSeats.reduce((total, seat) => total + Number(seat.price), 0)}원</div>
      </div>
      <button className='px-8 py-2 rounded-[10px] bg-Accent text-white cursor-pointer'>다음 단계</button>
    </div>
  );
}
