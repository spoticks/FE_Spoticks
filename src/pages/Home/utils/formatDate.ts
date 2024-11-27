export default function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = daysOfWeek[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return { month, day, weekday, hours, minutes };
}
