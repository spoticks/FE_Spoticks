import BasicUserInfo from "@/pages/MyPage/components/BasicUserInfo";
import PasswordResetting from "@/pages/MyPage/components/PasswordResetting";
import useAuthStore from "../../stores/authStore";

export default function MyPage() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">회원정보</h1>
        <span className="text-text-tertiary">어서오세요 {userName}(사용자 아이디) 님</span>
      </div>
      <div className="flex gap-40">
        <BasicUserInfo />
        <PasswordResetting />
      </div>
    </>
  );
}
