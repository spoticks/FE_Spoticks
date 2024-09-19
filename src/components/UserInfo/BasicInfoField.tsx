import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import InputLabel from "./InputLabel";
import Input from "../../common/components/atoms/Input";
import InputErrorMessage from "../../common/components/atoms/InputErrorMessage";

interface FormInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  type?: "password";
}

export default function BasicInfoField({ label, register, error, type }: FormInputFieldProps) {
  return (
    <div className="mb-4">
      <InputLabel label={label} />
      <Input label={label} register={register} type={type} />
      <InputErrorMessage error={error} />
    </div>
  );
}
