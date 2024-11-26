export default function isGameDatePast(gameStartTime: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gameDate = new Date(gameStartTime);
  gameDate.setHours(0, 0, 0, 0);
  // 게임 시작일 <= 오늘
  return gameDate <= today;
}
