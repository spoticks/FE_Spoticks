import LinkButton from "@/common/components/atoms/button/LinkButton";
import { menu } from "@/common/constants";

export default function HeaderNav() {
  return (
    <nav className="m-auto flex w-60 flex-row justify-between">
      {/* <div className="text-[18px] font-medium">{el}</div> */}
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
