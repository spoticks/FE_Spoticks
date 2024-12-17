interface BasicButtonProps {
  content: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: string;
}

export default function BasicButton({ content, disabled, onClick, style }: BasicButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`transition-all duration-300 ${style} `}
      disabled={disabled}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}
