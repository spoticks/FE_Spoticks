import MenuButton from "@/common/components/atoms/MenuButton";
import useAuthStore from "@/stores/authStore";
import { Outlet } from "react-router-dom";

const myTicketMenu = ["예매완료", "취소내역"];

export default function MyTicketRouteLayout() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">어서오세요, {userName}님.</h1>
        <span className="text-text-tertiary">예매내역을 클릭하면 상세정보를 확인할 수 있어요.</span>
      </div>
      <div className="mb-4 flex gap-4 border-b border-b-borders pb-4">
        {myTicketMenu.map((menu) => (
          <MenuButton menu={menu} key={menu} />
        ))}
      </div>
      <div className="flex w-[1280px]">
        <Outlet />
      </div>
    </>
  );
}
