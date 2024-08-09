import Timer from "./Timer";
import MainMatchInfo from "./MainMatchInfo/MainMatchInfo";

const mainMatch = {
  // 임시 정보
  content: [
    {
      gameId: 56,
      homeTeamName: "한화 이글스",
      awayTeamName: "두산 베어스",
      sportName: "야구",
      gameStartTime: "2024-08-10T15:40:20",
    },
  ],
};

export default function MainMatch() {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="text-3xl font-bold">
        What is the most popular <span className="text-red-500">match</span>?
      </h2>
      <Timer mainMatchStartTime={mainMatch.content[0].gameStartTime} />
      <MainMatchInfo matchData={mainMatch.content[0]} />
    </div>
  );
}
