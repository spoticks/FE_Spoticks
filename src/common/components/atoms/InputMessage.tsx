export default function InputMessage({
  errorMessage,
  isAlertMessage,
  message,
}: {
  errorMessage?: string;
  isAlertMessage?: boolean;
  message?: string;
}) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        errorMessage || isAlertMessage ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className={`ml-2 text-[14px] ${errorMessage ? "text-Accent" : "text-valid"}`}>
        {errorMessage || message}
      </p>
    </div>
  );
}
