import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import useAuthStore from "@/common/stores/authStore";
import BasicUserInfo from "@/pages/MyPage/components/BasicUserInfo";
import PasswordResetting from "@/pages/MyPage/components/PasswordResetting";

export default function MyPage() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-10">
        <AuthFirstHeading content="회원정보" />
        <span className="text-text-tertiary">어서오세요 {userName}(사용자 아이디) 님</span>
      </div>
      <div className="grid grid-cols-2">
        <BasicUserInfo />
        <PasswordResetting />
      </div>
    </>
  );
}
