import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useMatchWeatherQuery(gameId: number, latitude: number, longitude: number) {
  return useQuery({
    queryKey: ["weathers", gameId, latitude, longitude],
    queryFn: async () => {
      return await axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: latitude,
            lon: longitude,
            appid: import.meta.env.VITE_WEATHER_API_KEYS,
            lang: "kr",
          },
        })
        .then((res) => res.data);
    },
  });
}
