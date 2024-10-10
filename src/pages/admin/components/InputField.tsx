import { FormValues } from "@/pages/admin/type";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  id: keyof FormValues;
  register: UseFormRegister<FormValues>;
  disabled?: boolean;
}

export default function InputField({ label, type, id, register, disabled }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="w-full cursor-pointer rounded border px-3 py-2"
        disabled={disabled}
      />
    </div>
  );
}
