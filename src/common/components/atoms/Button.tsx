interface ButtonProps {
  content: string;
  isValid?: boolean;
  onClick?: () => void;
}
const getStyles = (content: string) => {
  switch (content) {
    case "로그인":
      return {
        base: "w-[88px] h-[42px] bg-foreground text-text-primary border-text-primary",
        hover: "hover:bg-Accent hover:text-foreground hover:border-Accent",
      };
    case "회원가입":
      return {
        base: "border-0",
        hover: "hover:text-Accent",
      };
    case "결제하기":
      return {
        base: "flex w-full bg-Accent text-background py-1",
        hover: "hover:bg-button-hovered",
      };
    case "티켓 취소":
    case "변경사항 저장":
    case "비밀번호 변경":
    case "로그인 하기":
    case "회원가입 하기":
    case "탈퇴하기":
      return {
        base: "bg-Accent text-foreground text-[16px] w-full px-3 py-2 mt-4 ",
        hover: "hover:bg-button-hovered ",
        disabled: "disabled:bg-disabled-button disabled:cursor-not-allowed",
      };
    case "닫기":
      return {
        base: "bg-borders  text-[16px] w-full px-3 py-2 mt-4 font-semibold",
        hover: "hover:bg-text-tertiary ",
      };
    case "block":
      return {
        base: "bg-borders text-text-primary border-borders",
      };
    default:
      return {
        base: "bg-defaultBg text-defaultText border-defaultBorder",
        hover: "hover:bg-defaultHoverBg hover:text-defaultHoverText hover:border-defaultHoverText",
      };
  }
};
const Button = ({ content, isValid, onClick }: ButtonProps) => {
  const styles = getStyles(content);

  return (
    <button
      type={
        content === "회원가입 하기" ||
        content === "로그인 하기" ||
        content === "변경사항 저장" ||
        content === "비밀번호 변경" ||
        content === "탈퇴하기"
          ? "submit"
          : "button"
      }
      disabled={isValid === false}
      onClick={onClick}
      className={`${styles.base} border ${styles.hover} ${styles.disabled} flex items-center justify-center rounded-[10px] transition-all duration-300`}
    >
      {content}
    </button>
  );
};

export default Button;
