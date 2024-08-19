import { Link } from "react-router-dom";
import Button from "../Button";
import Logo from "../Logo";
import HeaderNav from "./HeaderNav";
import { LuUserCircle } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { FiFileText, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleClickProfile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsPopoverOpen(!isPopoverOpen);
  }
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <header className="fixed flex h-[80px] w-full justify-center border bg-foreground">
      <div className="flex w-[1280px] items-center">
        <Logo />
        <HeaderNav />
        {/* <div className="flex items-center gap-6 text-[18px]">
          <Link to={"/sign-up"}>
            <Button content="회원가입" />
          </Link>
          <Link to={"/login"}>
            <Button content="로그인" />
          </Link>
        </div> */}
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
                  홍길동 <span className="font-normal">님</span>
                </p>
              </div>
              <div className="border-t border-gray-200">
                <Link
                  to="/profile"
                  className="flex cursor-pointer items-center p-3 text-[14px] hover:bg-gray-100"
                >
                  <FiUser className="mr-3" />
                  프로필
                </Link>
                <Link
                  to="/tickets"
                  className="flex cursor-pointer items-center p-3 text-[14px] hover:bg-gray-100"
                >
                  <FiFileText className="mr-3" />
                  예매한 티켓
                </Link>

                <button
                  onClick={() => {
                    setIsPopoverOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center rounded-b-lg p-3 text-[14px] hover:bg-gray-100"
                >
                  <FiLogOut className="mr-3" />
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
