import useMatchWeatherQuery from "@/pages/Home/api/useMatchWeatherQuery";

export default function useMatchWeatherIconCode(
  gameId: number,
  latitude: number,
  longitude: number,
) {
  const { data } = useMatchWeatherQuery(gameId, latitude, longitude);
  const weatherIconCode = data?.weather[0].icon;

  return weatherIconCode;
}
