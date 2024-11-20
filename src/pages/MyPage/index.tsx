import BasicUserInfo from "@/pages/MyPage/components/BasicUserInfo";
import PasswordResetting from "@/pages/MyPage/components/PasswordResetting";

export default function MyPage() {
  return (
    <>
      <div className="grid grid-cols-2 place-items-center items-start">
        <BasicUserInfo />
        <PasswordResetting />
      </div>
    </>
  );
}
