export default function getErrorToastMessage(message: string) {
  switch (message) {
    case "JWT Token expired":
      return "로그인이 만료되었습니다. 다시 로그인 해주세요!";
    case "Invalid JWT signature":
      return "인증에 실패했습니다. 다시 로그인해 주세요.";
    case "JWT Token format incorrect":
      return "인증 토큰 형식이 잘못되었습니다. 다시 로그인해 주세요.";
    case "Access is Denied":
      return "접근 권한이 없습니다!";
    default:
      return "로그아웃 되었습니다! 다시 로그인해 주세요!";
  }
}
