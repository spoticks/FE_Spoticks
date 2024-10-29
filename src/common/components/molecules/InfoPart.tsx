export default function InfoPart({
  heading,
  content,
  isRight,
  isSeat = false,
  isAdmin = false,
  isAccent = false,
}: {
  heading: string;
  content: string;
  isRight?: true;
  isSeat?: boolean;
  isAdmin?: boolean;
  isAccent?: boolean;
}) {
  return (
    <div className={`flex flex-col ${isSeat && "w-3/4"} ${isRight && "items-end"}`}>
      <h2 className={`text-[16px] text-text-secondary ${isAdmin && "text-[25px]"}`}>{heading}</h2>
      <div
        className={`text-[16px] ${isSeat && "break-keep"} ${isAdmin && "text-[25px]"} ${isAccent && "text-Accent"}`}
      >
        {content}
      </div>
    </div>
  );
}
