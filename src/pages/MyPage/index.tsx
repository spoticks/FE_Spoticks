import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import useMemberInfo from "@/hooks/useMemberInfo";
import BasicUserInfo from "@/pages/MyPage/components/BasicUserInfo";
import PasswordResetting from "@/pages/MyPage/components/PasswordResetting";

export default function MyPage() {
  const { memberName, userName } = useMemberInfo();
  return (
    <>
      <div className="mb-10">
        <AuthFirstHeading content="회원정보" />
        <p className="text-text-tertiary">
          어서오세요
          <strong>
            {" "}
            {memberName}({userName}){" "}
          </strong>
          님
        </p>
      </div>
      <div className="grid grid-cols-2">
        <BasicUserInfo />
        <PasswordResetting />
      </div>
    </>
  );
}
