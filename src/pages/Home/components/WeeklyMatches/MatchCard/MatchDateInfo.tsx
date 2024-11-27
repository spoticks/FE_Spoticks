import MatchDate from "@/common/components/molecules/MatchDate";
import useMatchWeather from "@/pages/Home/api/useMatchWeather";

export default function MatchDateInfo({
  gameStartTime,
  latitude,
  longitude,
  gameId,
}: {
  gameStartTime: string;
  latitude: number;
  longitude: number;
  gameId: number;
}) {
  const weatherIconCode = useMatchWeather(gameId, latitude, longitude);

  return (
    <div className="relative flex justify-center gap-2">
      {/* 경기 날짜 및 기상 정보 */}
      <MatchDate gameStartTime={gameStartTime} />
      <img
        src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
        className="absolute -right-7 top-[-0.125rem] size-6"
      />
    </div>
  );
}
