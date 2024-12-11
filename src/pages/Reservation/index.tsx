import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Section from "./components/seats/Section";
import { seatFormData, Seat } from "@/common/types/seatTypes";
import SectionOfSeats from "./components/seats/SectionOfSeats";
import SelectedSeats from "./components/seats/SelectedSeat";
import Loading from "@/common/components/atoms/Loading";
import { seatDataProps, positionInfoProps } from "./type";

interface sectionOfSeats {
  seatPosition: string;
  seatPrice: number;
  availableSeat: number;
}

export default function Reservation() {
  // const location = useLocation();
  // const matchData = location.state?.match;
  const { control, watch } = useForm<seatFormData>({
    defaultValues: {
      section: "1루",
    },
  });

  const [sectionData, setSectionData] = useState<sectionOfSeats[]>([]);
  const [seats, setSeats] = useState<Record<string, Seat[]>>({});
  const selectedSection = watch("section");
  const [sectionOfSeats, setSectionOfSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const { gameId } = useParams<{ gameId?: string }>();
  const reservationId = gameId || "";

  // 전체 데이터
  const { data, isLoading } = useAxios<seatDataProps>(
    ["reservation", reservationId, selectedSection],
    {
      config: {
        url: `/games/${reservationId}?seatPosition=${selectedSection}`,
        method: "GET",
      },
    },
  );

  //날짜
  const matchDate = `${data?.game.gameStartTime.split("T")[0]} ${data?.game.gameStartTime
    .split("T")[1]
    .slice(0, 5)}`;
  // let matchDate = matchData.gameStartTime.split("T");
  // const date = matchDate[0];
  // const time = matchDate[1].slice(0, 5);
  // matchDate = `${date} ${time}`;

  useEffect(() => {
    if (data) {
      // 초기 섹션데이터
      const initSectionData: sectionOfSeats[] = data.positionInfo.map(
        (info: positionInfoProps) => ({
          seatPosition: info.seatPosition,
          seatPrice: info.price,
          availableSeat: data.seat.filter(
            (seat) => seat.seatPosition === info.seatPosition && seat.status === "available",
          ).length, //초깃깂
        }),
      );
      setSectionData(initSectionData);

      // 좌석 데이터 생성
      const seatGroups = data.seat.reduce(
        (acc, seat) => {
          if (!acc[seat.seatPosition]) {
            acc[seat.seatPosition] = [];
          }
          acc[seat.seatPosition].push({
            id: seat.id,
            isReserved: seat.status === "reserved",
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
  // console.log(sectionData, seats);

  // 예약 가능 좌석
  // console.log(selectedSection, selectedSeats);
  //섹션클릭시 좌석데이터 갱신
  useEffect(() => {
    if (selectedSection && seats[selectedSection]) {
      setSectionOfSeats(seats[selectedSection]);
      setSelectedSeats([]);
    }
  }, [seats, selectedSection]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-row items-center justify-between">
        <h3 className="flex items-center rounded-[10px] border-[2px] border-borders px-2 text-[18px] font-bold">
          경기 목록
        </h3>
        <div className="flex-1 text-center">
          <span className="inline-block rounded-[10px] bg-[#d9d9d9] px-1 text-[18px] font-bold">
            좌석 선택
          </span>
        </div>
      </div>
      <h1 className="text-[40px] font-extrabold">
        {data?.game.homeTeamName} vs {data?.game.awayTeamName}
      </h1>
      <div className="text-[18px] font-bold">
        {data?.game.stadiumName} <span>{matchDate}</span>
      </div>
      <hr className="border-2 border-[#222222] opacity-25" />
      <div className="my-5 flex flex-row">
        <div className="flex flex-col">
          <h1 className="flex justify-center text-[32px] font-bold">{selectedSection}</h1>
          <SectionOfSeats
            sectionOfSeats={sectionOfSeats}
            selectedSeats={selectedSeats}
            setSectionOfSeats={setSectionOfSeats}
            setSelectedSeats={setSelectedSeats}
            sectionData={sectionData}
            setSectionData={setSectionData}
            selectedSection={selectedSection}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="flex justify-center text-[32px] font-bold">구역 선택</h1>
          <Section sectionData={sectionData} control={control} />
        </div>
      </div>
      <hr className="border-2 border-[#222222] opacity-25" />
      <SelectedSeats
        selectedSeats={selectedSeats}
        selectedSection={selectedSection}
        gameId={data?.game.gameId}
      />
    </div>
  );
}
