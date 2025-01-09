import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  SeatFormData,
  Seat,
  SectionOfSeatsProps,
  PositionInfoProps,
  SeatsProps,
} from "@/common/types/seatTypes";
import SectionOfSeats from "./components/seats/SectionOfSeats";
import SelectedSeats from "./components/seats/SelectedSeat";
import Loading from "@/common/components/atoms/Loading";
import { useReservationQuery } from "./api/useReservationQuery";
import ReservationHeader from "./components/ReservationHeader";
import SectionSelector from "./components/seats/Section";

export default function Reservation() {
  const { control, watch, reset } = useForm<SeatFormData>({
    defaultValues: {
      section: "",
    },
  });
  const { gameId } = useParams<{ gameId?: string }>();
  const reservationId = gameId || "";
  const selectedSection = watch("section");

  const { data, isLoading } = useReservationQuery(reservationId, selectedSection);

  const [sectionData, setSectionData] = useState<SectionOfSeatsProps[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const seatPrice =
    sectionData.find((section) => section.seatPosition === selectedSection)?.seatPrice || 0;

  // defaultValues 업데이트
  useEffect(() => {
    if (data?.positionInfo?.[0]?.seatPosition && !selectedSection) {
      reset({
        section: data.positionInfo[0].seatPosition,
      });
    }
  }, [data, reset, selectedSection]);

  useEffect(() => {
    if (data) {
      // 초기 섹션데이터
      const initSectionData: SectionOfSeatsProps[] = data.positionInfo.map(
        (info: PositionInfoProps) => ({
          seatPosition: info.seatPosition,
          seatPrice: info.price,
          availableSeat: data.seat.filter(
            (seat: SeatsProps) =>
              seat.seatPosition === info.seatPosition && seat.status === "AVAILABLE",
          ).length,
        }),
      );
      setSectionData(initSectionData);
    }
  }, [data, selectedSection]);

  if (isLoading) return <Loading />;

  return (
    <section className="w-full">
      <ReservationHeader data={data} />
      <hr className="border-2 border-[#222222] opacity-25" />
      <div className="my-5 grid grid-cols-5 gap-4">
        <div className="col-span-3 flex flex-col pt-2">
          <h1 className="flex justify-center text-[32px] font-bold">{selectedSection}</h1>
          <SectionOfSeats
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            sectionData={sectionData}
            setSectionData={setSectionData}
            selectedSection={selectedSection}
            data={data}
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <h1 className="flex justify-center text-[32px] font-bold">구역 선택</h1>
          <SectionSelector sectionData={sectionData} control={control} />
        </div>
      </div>
      <hr className="border-2 border-[#222222] opacity-25" />
      <SelectedSeats
        selectedSeats={selectedSeats}
        selectedSection={selectedSection}
        gameId={data?.game.gameId}
        seatPrice={seatPrice}
      />
    </section>
  );
}
