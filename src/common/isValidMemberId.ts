export default function isValidMemberId(memberId: number | null): memberId is number {
  return memberId !== null && typeof memberId === "number" && +memberId > 3;
}
