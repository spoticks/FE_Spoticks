import { FormValues } from "@/pages/admin/type";
import { UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  id: keyof FormValues;
  register: UseFormRegister<FormValues>;
  options: string[];
  disabled?: boolean;
}

export default function SelectFiled({ label, id, register, options, disabled }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <select
        id={id}
        {...register(id)}
        className="w-full rounded border px-3 py-2"
        disabled={disabled}
      >
        <option value="">{label}을 선택해주세요.</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
