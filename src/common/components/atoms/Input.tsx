import { InputType } from "@/common/types/formTypes";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ClosedEye from "@/assets/closedEye.svg?react";
import OpenEye from "@/assets/openEye.svg?react";

interface InputComponentProps {
  label?: string;
  type?: InputType;
  register?: UseFormRegisterReturn;
  onBlur?: () => void;
}

export default function Input({ label, type = "text", register, onBlur }: InputComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative my-1">
      <input
        type={type === "password" && showPassword ? "text" : type}
        {...register}
        className="w-full appearance-none rounded-[15px] px-3 py-2 text-[16px] transition-colors duration-300 focus:bg-focused-input-background focus:outline-none"
        placeholder={label}
        id={label}
        autoComplete="off"
        onBlur={(e) => {
          register?.onBlur(e);
          if (onBlur) {
            onBlur();
          }
        }}
      />
      {type === "password" && (
        <div
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
          onClick={handleToggleShowPassword}
        >
          {!showPassword ? <ClosedEye /> : <OpenEye />}
        </div>
      )}
    </div>
  );
}
