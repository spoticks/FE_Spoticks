import AuthFirstHeading from "@/common/components/atoms/AuthFirstHeading";
import MenuButton from "@/common/components/atoms/button/MenuButton";
import useAuthStore from "@/common/stores/authStore";
import { Outlet } from "react-router-dom";

const myTicketMenu = ["예매완료", "취소내역"];

export default function MyTicketRouteLayout() {
  const { userName } = useAuthStore((state) => ({ userName: state.userName }));

  return (
    <>
      <div className="mb-6">
        <AuthFirstHeading content={`어서요세요, ${userName}님`} />
        <span className="text-text-tertiary">예매내역을 클릭하면 상세정보를 확인할 수 있어요.</span>
      </div>
      <div className="mb-4 flex gap-4 border-b border-b-borders pb-4">
        {myTicketMenu.map((menu) => (
          <MenuButton menu={menu} key={menu} />
        ))}
      </div>
      <Outlet />
    </>
  );
}
