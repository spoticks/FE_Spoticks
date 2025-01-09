export default function getHeaderDescription(pathname: string) {
  const content = {
    heading: "",
    paragraph: "",
  };

  switch (true) {
    case pathname === "/profile/user-info":
      content.heading = "회원 정보";
      content.paragraph = "회원 정보를 확인하고 수정하세요.";
      break;

    case pathname === "/profile/account-deletion":
      content.heading = "회원 탈퇴";
      content.paragraph = "회원 탈퇴를 신청하기 전에 안내사항을 확인해주세요.";
      break;

    case pathname.startsWith("/profile/my-tickets/my-reservations"):
    case pathname.startsWith("/profile/my-tickets/cancellation-history"):
      content.heading = "예매/취소 내역";
      content.paragraph = "내역을 클릭하면 상세정보를 확인할 수 있어요.";
      break;

    case pathname === "/profile/my-team":
      content.heading = "My Team";
      content.paragraph = "회원님께서 관심있는 팀을 확인해보세요!";
      break;

    default:
      content.heading = "알 수 없는 페이지";
      content.paragraph = "해당 페이지를 찾을 수 없습니다.";
      break;
  }

  return content;
}
