import { Seat, sectionOfSeats } from "../../type";

interface SeatsProps {
  sectionOfSeats: Seat[];
  selectedSeats: Seat[];
  setSectionOfSeats:React.Dispatch<React.SetStateAction<Seat[]>>
  setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  sectionData: sectionOfSeats[];
  setSectionData:React.Dispatch<React.SetStateAction<sectionOfSeats[]>>;
  selectedSection:string;
}

export default function SectionOfSeats({ sectionOfSeats, selectedSeats, setSectionOfSeats, setSelectedSeats, sectionData, setSectionData, selectedSection }: SeatsProps) {
  const handleSeatClick = (seat: Seat) => {
    // 이미 예약되었거나 이미 선택한 좌석이 4자리 이상일 경우
    if (seat.isReserved || (seat.isSelected === false && selectedSeats.length >= 4)) return;

    const updatedSeats = sectionOfSeats.map((el) => el.id === seat.id ? { ...el, isSelected: !el.isSelected } : el);

    const updatedSelectedSeats = seat.isSelected
      ? selectedSeats.filter(el => el.id !== seat.id)
      : [...selectedSeats, seat];

    setSectionOfSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);

    const newSectionData = sectionData.map(section => {
      if (section.seatPosition === selectedSection) {
        return {
          ...section,
          availableSeat: seat.isSelected ? section.availableSeat + 1 : section.availableSeat - 1
        };
      }
      return section;
    });
    setSectionData(newSectionData);
  }
  return (
    <div className="grid grid-cols-10 gap-2">
      {sectionOfSeats?.map(seat => (
        <div key={seat.id} onClick={() => handleSeatClick(seat)} className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-[10px] text-white ${
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
  );
}
