import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputLabel from "./InputLabel";
import Input from "../Input";
import InputErrorMessage from "../InputErrorMessage";

interface FormInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
}

export default function BasicInfoField({ label, register, error }: FormInputFieldProps) {
  return (
    <div className="mb-4">
      <InputLabel label={label} />
      <Input label={label} register={register} />
      <InputErrorMessage error={error} />
    </div>
  );
}
