interface ButtonProps {
  content: string;
  isValid?: boolean;
}

const Button = ({ content, isValid }: ButtonProps) => {
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
      case "변경사항 저장":
      case "비밀번호 변경":
      case "로그인 하기":
      case "회원가입 하기":
        return {
          base: "bg-Accent text-foreground text-[16px] w-full px-3 py-2 mt-4 ",
          hover: "hover:bg-button-hovered ",
          disabled: "disabled:bg-disabled-button disabled:cursor-not-allowed",
        };
      case "block":
        return {
          base: "bg-borders text-text-primary border-borders",
        };
      case "예매하기":
        return {
          base: " bg-Accent text-foreground px-8 py-1 text-xs w-26",
          hover: "hover:bg-button-hovered",
        };
      default:
        return {
          base: "bg-defaultBg text-defaultText border-defaultBorder",
          hover:
            "hover:bg-defaultHoverBg hover:text-defaultHoverText hover:border-defaultHoverText",
        };
    }
  };
  const styles = getStyles(content);

  return (
    <button
      type={content === "회원가입 하기" || content === "로그인 하기" ? "submit" : "button"}
      disabled={isValid === false}
      className={`${styles.base} border ${styles.hover} ${styles.disabled} flex items-center justify-center rounded-[10px] transition-all duration-300`}
    >
      {content}
    </button>
  );
};

export default Button;
