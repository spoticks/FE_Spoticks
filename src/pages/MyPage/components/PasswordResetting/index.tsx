import PasswordResettingForm from "@/pages/MyPage/components/PasswordResetting/PasswordResettingForm";

export default function PasswordResetting() {
  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="mb-4 flex justify-between border-b border-borders text-sm">
          <h2>비밀번호 변경</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
        </div>
        <PasswordResettingForm />
      </div>
    </section>
  );
}
