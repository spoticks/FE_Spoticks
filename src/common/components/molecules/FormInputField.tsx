import Input from "@/common/components/atoms/Input";
import InputMessage from "@/common/components/atoms/InputMessage";
import InputLabel from "@/common/components/atoms/InputLabel";
import { InputType } from "@/common/types/formTypes";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  inputType: InputType;
  isLabelRequired?: true;
  onBlur?: () => void;
  isAlertMessage?: boolean;
  message?: string;
}

export default function FormInputField({
  label,
  register,
  error,
  isLabelRequired,
  inputType,
  onBlur,
  isAlertMessage,
  message,
}: FormInputFieldProps) {
  return (
    <div className={`${isLabelRequired && "mb-4"}}`}>
      {isLabelRequired && <InputLabel label={label} />}
      <Input label={label} register={register} type={inputType} onBlur={onBlur} />
      <InputMessage errorMessage={error?.message} />
      <InputMessage isAlertMessage={isAlertMessage} message={message} />
    </div>
  );
}
