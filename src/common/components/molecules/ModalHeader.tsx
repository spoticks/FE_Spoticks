import { IoIosCloseCircle } from "react-icons/io";

export default function ModalHeader({
  onCloseButtonClick,
  content,
}: {
  onCloseButtonClick: () => void;
  content: string;
}) {
  return (
    <header className="mb-5 flex w-full justify-between border-b border-b-borders pb-1">
      <h1 className="font-semibold">{content}</h1>
      <button onClick={onCloseButtonClick}>
        <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
      </button>
    </header>
  );
}
