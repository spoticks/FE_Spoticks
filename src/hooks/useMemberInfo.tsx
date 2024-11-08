import useAuthStore from "@/common/stores/authStore";
import { jwtDecode } from "jwt-decode";

interface AuthorityType {
  authority: string;
}
export interface DecodedTokenType {
  sub: string; // 사용자 ID
  memberName: string; // 회원이름
  exp: number; // 토큰 만료 시간 (Unix timestamp)
  iat: number; // 토큰 발급 시간 (Unix timestamp)
  authorities: AuthorityType[]; // 사용자 권한
  memberId: number; // 회원 고유 ID
}
export default function useMemberInfo() {
  const { accessToken } = useAuthStore((state) => state);
  if (typeof accessToken === "string") {
    const {
      memberId,
      memberName,
      authorities: [{ authority }],
    } = jwtDecode<DecodedTokenType>(accessToken);
    return { memberId, memberName, authority };
  } else {
    return null;
  }
}
