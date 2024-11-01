export default function isValidMemberId(memberId: number | null): memberId is number {
  // 로그인이 되어있지 않을 경우 &&  && memberId가 3 보다 클 경우
  return !memberId || memberId > 3 ? true : false;
}
