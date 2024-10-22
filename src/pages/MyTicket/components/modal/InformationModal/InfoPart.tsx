export default function InfoPart({
  heading,
  content,
  isRight,
  isSeat = false,
}: {
  heading: string;
  content: string;
  isRight?: true;
  isSeat?: boolean;
}) {
  return (
    <div className={`flex flex-col ${isSeat && "w-3/4"} ${isRight && "items-end"}`}>
      <div className="text-[16px] text-text-secondary">{heading}</div>
      <div className={`text-[16px] ${isSeat && "break-keep"}`}>{content}</div>
    </div>
  );
}
