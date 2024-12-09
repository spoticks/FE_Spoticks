import InfoPart from "@/common/components/molecules/InfoPart";

interface DetailItemType {
  key: string;
  value: string;
  isAccent?: boolean;
}

interface DetailInfoProps {
  details: DetailItemType[];
  isRight?: true;
}

export default function DetailInfo({ details, isRight }: DetailInfoProps) {
  return (
    <div className={`flex flex-col font-bold ${isRight ? "items-end" : "items-start"}`}>
      {details.map(({ key, value, isAccent }, idx) => (
        <InfoPart
          key={idx}
          heading={key}
          content={value}
          isRight={isRight}
          isAdmin={true}
          isAccent={isAccent}
        />
      ))}
    </div>
  );
}
