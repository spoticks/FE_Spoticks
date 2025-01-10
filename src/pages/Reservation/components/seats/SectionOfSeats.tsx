import { Seat, SeatDataProps, SectionOfSeatsProps } from "@/common/types/seatTypes";
import { useEffect, useState } from "react";

interface SeatsProps {
  selectedSeats: Seat[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  sectionData: SectionOfSeatsProps[];
  setSectionData: React.Dispatch<React.SetStateAction<SectionOfSeatsProps[]>>;
  selectedSection: string;
  data?: SeatDataProps;
}

export default function SectionOfSeats({
  selectedSeats,
  setSelectedSeats,
  sectionData,
  setSectionData,
  selectedSection,
  data,
}: SeatsProps) {
  //초기좌석 생성
  const [seats, setSeats] = useState<Record<string, Seat[]>>({});
  const [sectionOfSeats, setSectionOfSeats] = useState<Seat[]>([]);

  useEffect(() => {
    if (data) {
      const seatGroups = data.seat.reduce(
        (acc, seat) => {
          if (!acc[seat.seatPosition]) {
            acc[seat.seatPosition] = [];
          }
          acc[seat.seatPosition].push({
            id: seat.id,
            seatNumber: seat.seatNumber,
            isReserved: seat.status === "RESERVED",
            isSelected: false,
            price: seat.seatPrice,
          });
          return acc;
        },
        {} as Record<string, Seat[]>,
      );

      setSeats(seatGroups);
    }
  }, [data]);

  //섹션클릭시 좌석데이터 갱신
  useEffect(() => {
    if (selectedSection && seats[selectedSection]) {
      setSectionOfSeats(seats[selectedSection]);
      setSelectedSeats([]);
    }
  }, [seats, selectedSection, setSelectedSeats]);

  const handleSeatClick = (seat: Seat) => {
    // 이미 예약되었거나 이미 선택한 좌석이 4자리 이상일 경우
    if (seat.isReserved || (seat.isSelected === false && selectedSeats.length >= 4)) return;

    const updatedSeats = sectionOfSeats.map((el) =>
      el.id === seat.id ? { ...el, isSelected: !el.isSelected } : el,
    );

    const updatedSelectedSeats = seat.isSelected
      ? selectedSeats.filter((el) => el.id !== seat.id)
      : [...selectedSeats, seat];

    setSectionOfSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);

    const newSectionData = sectionData.map((section) => {
      if (section.seatPosition === selectedSection) {
        return {
          ...section,
          availableSeat: seat.isSelected ? section.availableSeat + 1 : section.availableSeat - 1,
        };
      }
      return section;
    });

    setSectionData(newSectionData);
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {sectionOfSeats?.map((seat) => (
        <div
          key={seat.id}
          onClick={() => handleSeatClick(seat)}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] text-white ${
            seat.isReserved
              ? "cursor-not-allowed bg-borders"
              : seat.isSelected
                ? "bg-Accent"
                : "bg-text-primary opacity-50"
          }`}
        >
          {seat.seatNumber}
        </div>
      ))}
    </div>
  );
}
