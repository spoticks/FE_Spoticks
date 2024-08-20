import { FiUser, FiFileText, FiLogOut } from "react-icons/fi";
import { LuUserCircle } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import usePopover from "../../hooks/usePopover";
import MenuItem from "./MenuItem";

export default function UserButton() {
  const { handleClickProfile, popoverRef, isPopoverOpen, setIsPopoverOpen } = usePopover();
  const { username, accessToken, logout } = useAuthStore((state) => ({
    username: state.userName,
    accessToken: state.accessToken,
    logout: state.logout,
  }));

  function handleLogout() {
    logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setIsPopoverOpen(false);
    // 로그아웃 후 페이지 새로고침 또는 리다이렉트하기... 여기서는 리로드 함.
    window.location.reload();
  }

  return (
    <div className="relative flex">
      <button onClick={handleClickProfile}>
        <LuUserCircle className="size-5" />
      </button>
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className="mt- absolute right-0 top-5 w-24 rounded-lg border border-borders bg-white shadow-lg"
        >
          <div className="gap-3 p-2">
            <p className="text-center text-[14px] font-semibold">
              {username} <span className="font-normal">님</span>
            </p>
          </div>
          <div className="border-t border-gray-200">
            <MenuItem to="/profile/user-info" icon={<FiUser className="mr-3" />} label="프로필" />
            <MenuItem
              to="/profile/my-tickets"
              icon={<FiFileText className="mr-3" />}
              label="예매한 티켓"
            />
            <MenuItem
              onClick={handleLogout}
              icon={<FiLogOut className="mr-3" />}
              label="로그아웃"
              isButton
            />
          </div>
        </div>
      )}
    </div>
  );
}
