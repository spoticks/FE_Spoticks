import { Link } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import { LuUserCircle } from "react-icons/lu";
import { FiFileText, FiLogOut, FiUser } from "react-icons/fi";
import usePopover from "../../hooks/usePopover";
import useAuthStore from "../../stores/authStore";
import AuthButtonGroup from "./AuthButtonGroup";

export default function Header() {
  const { handleClickProfile, popoverRef, isPopoverOpen, setIsPopoverOpen } = usePopover();
  const { isLoggedIn, username, accessToken, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
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
    <header className="fixed flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <Logo />
        <HeaderNav />
        {!isLoggedIn ? (
          <AuthButtonGroup />
        ) : (
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
                  <Link
                    to="/profile/user-info"
                    className="flex cursor-pointer items-center p-3 text-[14px] hover:bg-gray-100"
                  >
                    <FiUser className="mr-3" />
                    프로필
                  </Link>
                  <Link
                    to="/profile/my-tickets"
                    className="flex cursor-pointer items-center p-3 text-[14px] hover:bg-gray-100"
                  >
                    <FiFileText className="mr-3" />
                    예매한 티켓
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center rounded-b-lg p-3 text-[14px] hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-3" />
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
