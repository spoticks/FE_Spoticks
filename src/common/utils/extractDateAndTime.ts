export default function extractDateAndTime(rawTime: string) {
  const [date, time] = rawTime.split("T");
  const [hours, minutes] = time.split(":");

  return { date, hours, minutes };
}
