import { Link } from "react-router-dom";
import BasicUserInfoForm from "@/pages/MyPage/components/BasicUserInfo/BasicUserInfoForm";

export default function BasicUserInfo() {
  return (
    <section>
      <div className="flex w-64 flex-col">
        <div className="mb-4 flex justify-between border-b border-borders text-sm">
          <h2>기본 정보</h2>
          {/** 여기서 아이디, 이메일, 이름, 전화번호 불러오기 */}
          <Link
            to="/profile/account-deletion"
            className="text-borders transition-colors duration-300 hover:text-Accent"
          >
            탈퇴하기
          </Link>
        </div>
        <BasicUserInfoForm />
      </div>
    </section>
  );
}
