import formatDate from "@/pages/Home/utils/formatDate";

export default function MatchDate({ gameStartTime }: { gameStartTime: string }) {
  const { month, day, weekday, hours, minutes } = formatDate(gameStartTime);
  return (
    <div className="flex w-full justify-center">
      <p className="">{`${month}/${day}(${weekday})`}</p>
      <p className="ml-2 font-bold">
        {hours}:{minutes}
      </p>
    </div>
  );
}
