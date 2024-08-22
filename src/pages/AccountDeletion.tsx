import cryingIcons from "../assets/heroicons_ticket-solid.svg";
import AccountDeletionForm from "../components/AccountDeletionForm";

export default function AccountDeletion() {
  return (
    <>
      <div className="mb-10 border-b border-borders pb-5">
        <h1 className="text-2xl font-bold">회원탈퇴</h1>
        <span className="text-[20px] text-[#8d8d8d]">
          회원 탈퇴를 신청하기 전에 안내사항을 확인해주세요.
        </span>
      </div>
      <section className="flex">
        <span className="mr-8 text-[20px] text-[#8d8d8d]">
          탈퇴 후 해당 아이디 정보로 로그인 할 수 없으며, 보유하신 혜택(포인트, 쿠폰 등)도 사용할 수
          없습니다. <br />
          신중하게 신청해주세요.
        </span>
        <img src={cryingIcons} />
      </section>
      <AccountDeletionForm />
    </>
  );
}
