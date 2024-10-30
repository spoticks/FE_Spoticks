import MenuItem from "@/common/components/Layout/Header/UserButton/UserInfoPopup/MenuItem";
import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import { FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { LuTrophy } from "react-icons/lu";

export default function UserInfoPopup({
  setIsPopoverOpen,
  popoverRef,
}: {
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popoverRef: React.RefObject<HTMLDivElement>;
}) {
  const { memberName, accessToken, logout } = useAuthStore((state) => ({
    memberName: state.memberName,
    accessToken: state.accessToken,
    logout: state.logout,
  }));

  function handleLogout() {
    logout();
    setIsPopoverOpen(false);
    alertToast("로그아웃 되었습니다!", "info");
  }
  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-5 w-24 rounded-lg border border-borders bg-white shadow-lg"
    >
      <div
        className="flex justify-center gap-1 p-2 text-[14px] font-semibold"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="truncate">{memberName}</p>
        <span className="font-normal"> 님</span>
      </div>
      <div className="border-t border-gray-200">
        <MenuItem to="/profile/user-info" icon={<FiUser className="mr-3" />} label="프로필" />
        <MenuItem
          to="/profile/my-tickets/my-reservations"
          icon={<FiFileText className="mr-3" />}
          label="예매한 티켓"
        />
        <MenuItem to="/profile/my-team" icon={<LuTrophy className="mr-3" />} label="나의 팀" />
        <MenuItem
          onClick={handleLogout}
          icon={<FiLogOut className="mr-3" />}
          label="로그아웃"
          isButton
        />
      </div>
    </div>
  );
}
