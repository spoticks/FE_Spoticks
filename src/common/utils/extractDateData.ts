export default function extractDateData(rawTime: string) {
  const [date, time] = rawTime.split("T");
  const formattedDate = new Date(date);
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  const [hours, minutes] = time.split(":");
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = daysOfWeek[formattedDate.getDay()];
  return { date, month, day, weekday, hours, minutes };
}
