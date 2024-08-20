export default function InputLabel({ label }: { label: string }) {
  return (
    <label className="text-[14px] text-[#8d8d8d]" htmlFor={label}>
      {label}
    </label>
  );
}
