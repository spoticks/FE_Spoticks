import Input from "@/common/components/atoms/Input";
import InputErrorMessage from "@/common/components/atoms/InputErrorMessage";
import { InputType } from "@/common/types/formTypes";
import InputLabel from "@/components/UserInfo/InputLabel";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  isLabelRequired?: true;
  inputType: InputType;
}

export default function FormInputField({
  label,
  register,
  error,
  isLabelRequired,
  inputType,
}: FormInputFieldProps) {
  return (
    <div>
      {isLabelRequired && <InputLabel label={label} />}
      <Input label={label} register={register} type={inputType} />
      {error && <InputErrorMessage errorMessage={error.message} />}
    </div>
  );
}
