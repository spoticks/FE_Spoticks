import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Section from "./Section";
import { Seat, seatFormData, SeatsResponse } from "../../type";
import SectionOfSeats from "./SectionOfSeats";
import SelectedSeats from "./SelectedSeat";
import Loading from "../../common/components/atoms/Loading";
import Error from "../Error";

interface sectionOfSeats {
  seatPosition: string;
  seatPrice: number;
  availableSeat: number;
}

export default function Reservation() {
  const location = useLocation();
  const matchData = location.state?.match;

  const { control, watch } = useForm<seatFormData>({
    defaultValues: {
      section: "1루",
    },
  });

  //날짜
  let matchDate = matchData.gameStartTime.split("T");
  const date = matchDate[0];
  const time = matchDate[1].slice(0, 5);
  matchDate = `${date} ${time}`;

  const [sectionData, setSectionData] = useState<sectionOfSeats[]>([]);
  const [seats, setSeats] = useState<Record<string, Seat[]>>({});
  const selectedSection = watch("section");
  const [sectionOfSeats, setSectionOfSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // 전체 데이터
  const {
    data: seatData,
    isLoading,
    error,
  } = useAxios<SeatsResponse[]>(["seats"], {
    config: {
      url: "/seats",
      method: "GET",
      // params: { seatPosition: seatPosition }
    },
  });

  useEffect(() => {
    if (seatData) {
      // 초기 섹션데이터
      const initSectionData: sectionOfSeats[] = seatData[0].content.map((seat) => ({
        seatPosition: seat.seatPosition,
        seatPrice: seat.seatPrice,
        availableSeat: 50, //초가깂. 추후 seat의 길이로 받음
      }));
      setSectionData(initSectionData);

      // 초기 좌석 데이터
      const initialSeats = initSectionData.reduce(
        (acc, section) => {
          acc[section.seatPosition] = Array.from({ length: 50 }, (_, idx) => ({
            id: idx + 1,
            isReserved: false,
            isSelected: false,
            price: section.seatPrice,
          }));
          return acc;
        },
        {} as Record<string, Seat[]>,
      );

      setSeats(initialSeats);
    }
  }, [seatData]);
  // console.log(sectionData, seats);

  // 예약 가능 좌석
  // console.log(selectedSection, selectedSeats);

  useEffect(() => {
    setSectionOfSeats(seats[selectedSection]);
    setSelectedSeats([]);
  }, [seats, selectedSection]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

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
        {matchData.homeTeamName} vs {matchData.awayTeamName}
      </h1>
      <div className="text-[18px] font-bold">
        {matchData.stadiumName} <span>{matchDate}</span>
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
      <SelectedSeats selectedSeats={selectedSeats} selectedSection={selectedSection} />
    </div>
  );
}
