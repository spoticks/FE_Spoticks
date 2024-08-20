import Button from "../components/Button";
import Input from "../components/Input";
import useAuthStore from "../stores/authStore";

export default function MyPage() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));
  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">회원정보</h1>
        <span className="text-[#8d8d8d]">어서오세요 {userName}님</span>
      </div>
      <div className="flex gap-40">
        <section className="flex w-64 flex-col">
          <div className="mb-4 flex justify-between border-b border-borders text-sm">
            <h2>기본 정보</h2>
            <button className="text-borders transition-colors duration-300 hover:text-Accent">
              탈퇴하기
            </button>
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#8d8d8d]" htmlFor="id">
              아이디
            </label>
            <input
              id="id"
              className="w-full appearance-none rounded-[15px] px-3 py-2 text-[16px] transition-colors duration-300 focus:bg-focused-input-background focus:outline-none disabled:bg-borders"
              disabled
              value={"사용자 아이디값"}
            />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#8d8d8d]" htmlFor="userName">
              이름
            </label>
            <Input label="이름" />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#8d8d8d]" htmlFor="연락처">
              연락처
            </label>
            <Input label="연락처" />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-[#8d8d8d]" htmlFor="이메일">
              이메일
            </label>
            <Input label="이메일" />
          </div>
          <Button content="변경사항 저장" />
        </section>
      </div>
    </>
  );
}
