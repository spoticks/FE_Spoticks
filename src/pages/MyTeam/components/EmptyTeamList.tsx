import SmilingFace from "@/assets/smilingface.svg?react";

export default function EmptyTeamList() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-text-tertiary">
      <SmilingFace className="mb-8" />
      <p>아직 좋아하는 팀이 없어요...</p>
      <p>관심있는 팀을 추가해보세요!</p>
    </div>
  );
}
