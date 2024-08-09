interface ButtonProps {
  content: string;
}

const Button = ({ content }: ButtonProps) => {
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
      type="button"
      className={`${styles.base} border ${styles.hover} flex items-center justify-center rounded-[10px] transition-all duration-300`}
    >
      {content}
    </button>
  );
};

export default Button;
