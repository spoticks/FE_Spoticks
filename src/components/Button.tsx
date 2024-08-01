interface ButtonProps {
  w: string;
  h: string;
  content: string;
}

const Button = ({ content }:ButtonProps) => {
  const getStyles = (content:string) => {
    switch (content) {
      case "로그인":
        return {
          base: "w-100 h-40 bg-foreground text-text-primary border-text-primary",
          hover:
            "hover:bg-Accent hover:text-foreground hover:border-Accent",
        };

      case "회원가입":
        return {
          base: "w-100 h-40 bg-Accent text-foreground border-Accent",
          hover:
            "hover:bg-[#a50115] hover:text-foreground hover:border-[#a50115]",
        };
      case 'block':
          return {
            base: "bg-[#dbdbdb] text-[#222222] border-[#dbdbdb]"
          }
      
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
    <div
      className={`${styles.base} border ${styles.hover} rounded-[10px] transition-all duration-300 flex justify-center items-center`}
    >
      {content}
    </div>
  );
};

export default Button;
