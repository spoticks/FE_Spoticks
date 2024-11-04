import isValidMemberId from "@/common/utils/isValidMemberId";
import useAuthStore from "@/common/stores/authStore";
import alertToast from "@/common/utils/alertToast";
import PopupMenuList from "@/common/components/Layout/Header/UserButton/UserInfoPopup/PopupMenu/PopupMenuList";
import getPopupMenuItems from "@/common/components/Layout/Header/UserButton/UserInfoPopup/PopupMenu/getPopupMenuItems";

export default function UserInfoPopup({
  setIsPopoverOpen,
  popoverRef,
}: {
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popoverRef: React.RefObject<HTMLDivElement>;
}) {
  const { memberName, memberId, logout } = useAuthStore((state) => ({
    ...state,
  }));

  function handleLogout() {
    logout();
    setIsPopoverOpen(false);
    alertToast("로그아웃 되었습니다!", "info");
  }

  const menuItems = isValidMemberId(memberId)
    ? getPopupMenuItems("user")
    : getPopupMenuItems("admin");
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
      <PopupMenuList items={menuItems} handleLogout={handleLogout} />
    </div>
  );
}
