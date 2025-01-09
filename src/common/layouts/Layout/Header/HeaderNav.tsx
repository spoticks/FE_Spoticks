import LinkButton from "@/common/components/atoms/button/LinkButton";
import { menu } from "@/common/constants";

export default function HeaderNav() {
  return (
    <nav className="flex w-full max-w-60 flex-row justify-between">
      {menu.map((el) => (
        <LinkButton
          key={el}
          content={el}
          linkTo={el === "HOME" ? "/" : `/match-list/${el}`}
          style="text-[18px] font-medium hover:text-Accent"
        />
      ))}
    </nav>
  );
}
