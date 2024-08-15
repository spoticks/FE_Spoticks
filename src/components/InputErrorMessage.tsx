import { FieldError } from "react-hook-form";

export default function InputErrorMessage({ error }: { error: FieldError | undefined }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        error ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {error && <p className="ml-2 text-[14px] text-Accent">{error.message}</p>}
    </div>
  );
}
