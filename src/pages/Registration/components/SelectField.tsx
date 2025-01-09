import InputErrorMessage from "@/common/components/atoms/InputMessage";
import { FormValueType } from "@/pages/admin/type";
import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  id: keyof FormValueType;
  register: UseFormRegister<FormValueType>;
  options: string[];
  disabled?: boolean;
  error: FieldError | undefined;
}

export default function SelectFiled({
  label,
  id,
  register,
  options,
  disabled,
  error,
}: SelectProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <select
        id={id}
        {...register(id)}
        className="mb-2 w-full appearance-none rounded-[15px] px-3 py-2 text-[16px] transition-colors duration-300 focus:bg-focused-input-background focus:outline-none"
        disabled={disabled}
      >
        <option value="">{label}을 선택해주세요.</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <InputErrorMessage errorMessage={error.message} />}
    </div>
  );
}
