import { IoIosCloseCircle } from "react-icons/io";

export default function ModalHeader({
  onCloseButtonClick,
  content,
}: {
  onCloseButtonClick: () => void;
  content: string;
}) {
  return (
    <>
      <header className="flex w-full justify-between pb-1">
        <h1 className="font-semibold">{content}</h1>
        <button onClick={onCloseButtonClick}>
          <IoIosCloseCircle className="size-5 text-borders transition-all duration-150 hover:text-black" />
        </button>
      </header>
      <hr className="border-1 mb-5 w-full border-borders" />
    </>
  );
}
