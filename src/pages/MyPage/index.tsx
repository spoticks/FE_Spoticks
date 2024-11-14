import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import useMemberInfo from "@/hooks/useMemberInfo";
import BasicUserInfo from "@/pages/MyPage/components/BasicUserInfo";
import PasswordResetting from "@/pages/MyPage/components/PasswordResetting";

export default function MyPage() {
  const { memberName, memberId } = useMemberInfo();
  return (
    <>
      <div className="mb-10">
        <AuthFirstHeading content="회원정보" />
        <span className="text-text-tertiary">어서오세요 {memberName} 님</span>
      </div>
      <div className="grid grid-cols-2">
        <BasicUserInfo memberId={memberId} />
        <PasswordResetting />
      </div>
    </>
  );
}
