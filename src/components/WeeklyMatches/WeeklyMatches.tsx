import { useRef, useState } from "react";
import MatchCard from "./MatchCard/MatchCard";

const matchData = {
  content: [
    {
      gameId: 17,
      homeTeamName: "KT 위즈",
      awayTeamName: "SSG 랜더스",
      sportName: "야구",
      gameStartTime: "2024-08-16T12:30:00",
    },
    {
      gameId: 12,
      homeTeamName: "삼성 라이온즈",
      awayTeamName: "KIA 타이거즈",
      sportName: "야구",
      gameStartTime: "2024-08-08T15:00:00",
    },
    {
      gameId: 56,
      homeTeamName: "한화 이글스",
      awayTeamName: "두산 베어스",
      sportName: "야구",
      gameStartTime: "2024-08-08T06:00:00",
    },
    {
      gameId: 57,
      homeTeamName: "LG 트윈스",
      awayTeamName: "키움 히어로즈",
      sportName: "야구",
      gameStartTime: "2024-08-14T11:30:00",
    },
    {
      gameId: 10,
      homeTeamName: "KT 위즈",
      awayTeamName: "NC 다이노스",
      sportName: "야구",
      gameStartTime: "2024-08-08T15:00:00",
    },
  ],
};

export default function WeeklyMatches() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [totalX, setTotalX] = useState<number>(0);

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const x = e.clientX;
    if (containerRef.current && "scrollLeft" in containerRef.current) {
      setTotalX(x + containerRef.current.scrollLeft);
    }
  };
  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const scrollLeft = totalX - e.clientX;

    if (containerRef.current && "scrollLeft" in containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft;
    }
  };
  const onDragEnd = () => {
    if (!isDragging) return;
    if (!containerRef.current) return;

    setIsDragging(false);
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">이번주 경기</h2>
      <div
        className="hide-scrollbar flex w-full snap-x gap-4 overflow-scroll"
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        {matchData.content.map((data) => (
          <MatchCard key={data.gameId} data={data} />
        ))}
      </div>
    </>
  );
}
