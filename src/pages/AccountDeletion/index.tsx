import CryingIcons from "@/assets/cryingface.svg?react";
import AccountDeletionForm from "@/pages/AccountDeletion/components/AccountDeletionForm";
export default function AccountDeletion() {
  return (
    <div className="px-24">
      <section className="flex">
        <span className="mr-8 text-[20px] text-text-tertiary">
          탈퇴 후 해당 아이디 정보로 로그인 할 수 없으며, 보유하신 혜택(포인트, 쿠폰 등)도 사용할 수
          없습니다. <br />
          신중하게 신청해주세요.
        </span>
        <CryingIcons />
      </section>
      <AccountDeletionForm />
    </div>
  );
}
