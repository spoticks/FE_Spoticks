interface ButtonProps {
  content: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: string;
}

export default function BasicButton({ content, icon, disabled, onClick, style }: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`transition-all duration-300 ${style} `}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon}
      {content}
    </button>
  );
}
