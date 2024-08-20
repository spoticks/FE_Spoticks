import useAuthStore from "../stores/authStore";

export default function MyPage() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));
  return (
    <>
      <h1 className="text-2xl font-bold">회원정보</h1>
      <span className="text-[#8d8d8d]">어서오세요 {userName}님</span>
    </>
  );
}
