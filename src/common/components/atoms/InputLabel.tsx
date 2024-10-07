export default function InputLabel({ label }: { label: string }) {
  return (
    <label className="text-text-tertiary text-[14px]" htmlFor={label}>
      {label}
    </label>
  );
}
