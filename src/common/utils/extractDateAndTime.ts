export default function extractDateAndTime(gameStartTime: string) {
  const [date, time] = gameStartTime.split("T");
  const [hours, minutes] = time.split(":");

  return { date, hours, minutes };
}
