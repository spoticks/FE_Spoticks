interface ButtonProps {
  w: string;
  h: string;
  content: string;
}

const Button = ({w, h, content}:ButtonProps) => {
  const getStyles = (content:string) => {
    switch (content) {
      case "로그인":
        return {
          base: "bg-[#ffffff] text-[#000000] border-[#000000]",
          hover:
            "hover:bg-[#dd4255] hover:text-[#ffffff] hover:border-[#dd4255]",
        };

      case "회원가입":
        return {
          base: "bg-[#dd4255] text-[#ffffff] border-[#dd4255]",
          hover:
            "hover:bg-[#a50115] hover:text-[#ffffff] hover:border-[#a50115]",
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
      className={`w-${w} h-${h} ${styles.base} border ${styles.hover} rounded-[10px] transition-all duration-300 flex justify-center items-center`}
    >
      {content}
    </div>
  );
};

export default Button;
