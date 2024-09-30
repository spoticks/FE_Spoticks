export default function InputErrorMessage({ errorMessage }: { errorMessage?: string }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        errorMessage ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="ml-2 text-[14px] text-Accent">{errorMessage}</p>
    </div>
  );
}
