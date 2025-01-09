import useMemberInfo from "@/hooks/useMemberInfo";
import useLogoutMutation from "@/hooks/useLogoutMutation";
import useAuthStore from "@/common/stores/authStore";
import PopupMenuList from "@/common/layouts/Layout/Header/UserButton/UserInfoPopup/PopupMenu/PopupMenuList";
import getPopupMenuItems from "@/common/layouts/Layout/Header/UserButton/UserInfoPopup/PopupMenu/getPopupMenuItems";

export default function UserInfoPopup({
  setIsPopoverOpen,
  popoverRef,
}: {
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popoverRef: React.RefObject<HTMLDivElement>;
}) {
  const authority = useMemberInfo();
  const { memberName } = useAuthStore((state) => state);
  const { handleLogout } = useLogoutMutation(setIsPopoverOpen);

  const menuItems =
    authority === "ROLE_MEMBER" ? getPopupMenuItems("user") : getPopupMenuItems("admin");
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
