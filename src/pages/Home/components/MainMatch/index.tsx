import MainMatchInfo from "@/pages/Home/components/MainMatch/MainMatchInfo";
import Timer from "@/pages/Home/components/MainMatch/Timer";

const mainMatch = {
  // 임시 정보
  content: [
    {
      gameId: 56,
      homeTeamName: "한화 이글스",
      awayTeamName: "두산 베어스",
      sportName: "야구",
      gameStartTime: "2024-09-04T15:40:20",
    },
  ],
};

export default function MainMatch() {
  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-2xl font-bold">
        What is the most popular <span className="text-red-500">match</span>?
      </h1>
      <Timer mainMatchStartTime={mainMatch.content[0].gameStartTime} />
      <MainMatchInfo matchData={mainMatch.content[0]} />
    </div>
  );
}
