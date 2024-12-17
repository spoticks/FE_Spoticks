export default function InputLabel({ label }: { label: string }) {
  const labelClassName =
    label === "경기일" || label === "경기 시작 시간"
      ? "mb-2 block font-medium"
      : "text-text-tertiary text-[14px]";

  return (
    <label className={labelClassName} htmlFor={label}>
      {label}
    </label>
  );
}
