import InfoPart from "@/pages/MyTicket/components/modal/InformationModal/InfoPart";

interface InfoContentType {
  heading: string;
  content: string;
}
interface ModalInfoProps {
  firstInfoPart: InfoContentType & { isSeat?: boolean };
  secondInfoPart?: InfoContentType;
}
export default function ModalInfo({
  firstInfoPart: { heading: firstInfoHeading, content: firstInfoContent, isSeat },
  secondInfoPart: { heading: secondInfoHeading, content: secondInfoContent } = {
    heading: "",
    content: "",
  },
}: ModalInfoProps) {
  return (
    <div className="flex justify-between">
      <InfoPart heading={firstInfoHeading} content={firstInfoContent} isSeat={isSeat || false} />
      {secondInfoHeading.length && (
        <InfoPart heading={secondInfoHeading} content={secondInfoContent} isRight />
      )}
    </div>
  );
}
