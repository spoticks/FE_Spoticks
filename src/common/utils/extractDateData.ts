export default function extractDateData(rawTime: string) {
  const [date, time] = rawTime.split("T");
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear() % 100;
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const [hours, minutes] = time.split(":");
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = daysOfWeek[formattedDate.getDay()];
  return { year, date, month, day, weekday, hours, minutes };
}
