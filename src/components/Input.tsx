import { useState } from "react";

type InputType = "text" | "email" | "password";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputComponentProps {
  label: string;
  type?: InputType;
  register?: UseFormRegisterReturn;
}

export default function Input({ label, type = "text", register }: InputComponentProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-1">
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          {...register}
          className="w-full appearance-none rounded-[15px] px-3 py-2 text-[16px] transition-colors duration-300 focus:bg-focused-input-background focus:outline-none"
          placeholder={label}
        />
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
            onClick={handleToggleShowPassword}
          >
            {!showPassword ? (
              <svg
                width="29"
                height="23"
                viewBox="0 0 29 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5375 7.5L17.5 11.45V11.25C17.5 10.2554 17.1049 9.30161 16.4017 8.59835C15.6984 7.89509 14.7446 7.5 13.75 7.5H13.5375ZM8.1625 8.5L10.1 10.4375C10.0375 10.7 10 10.9625 10 11.25C10 12.2446 10.3951 13.1984 11.0983 13.9017C11.8016 14.6049 12.7554 15 13.75 15C14.025 15 14.3 14.9625 14.5625 14.9L16.5 16.8375C15.6625 17.25 14.7375 17.5 13.75 17.5C12.0924 17.5 10.5027 16.8415 9.33058 15.6694C8.15848 14.4973 7.5 12.9076 7.5 11.25C7.5 10.2625 7.75 9.3375 8.1625 8.5ZM1.25 1.5875L4.1 4.4375L4.6625 5C2.6 6.625 0.975 8.75 0 11.25C2.1625 16.7375 7.5 20.625 13.75 20.625C15.6875 20.625 17.5375 20.25 19.225 19.575L19.7625 20.1L23.4125 23.75L25 22.1625L2.8375 0M13.75 5C15.4076 5 16.9973 5.65848 18.1694 6.83058C19.3415 8.00269 20 9.5924 20 11.25C20 12.05 19.8375 12.825 19.55 13.525L23.2125 17.1875C25.0875 15.625 26.5875 13.575 27.5 11.25C25.3375 5.7625 20 1.875 13.75 1.875C12 1.875 10.325 2.1875 8.75 2.75L11.4625 5.4375C12.175 5.1625 12.9375 5 13.75 5Z"
                  fill="#DBDBDB"
                  fillOpacity=""
                />
              </svg>
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 11.25C14.0054 11.25 13.0516 11.6451 12.3483 12.3483C11.6451 13.0516 11.25 14.0054 11.25 15C11.25 15.9946 11.6451 16.9484 12.3483 17.6517C13.0516 18.3549 14.0054 18.75 15 18.75C15.9946 18.75 16.9484 18.3549 17.6517 17.6517C18.3549 16.9484 18.75 15.9946 18.75 15C18.75 14.0054 18.3549 13.0516 17.6517 12.3483C16.9484 11.6451 15.9946 11.25 15 11.25ZM15 21.25C13.3424 21.25 11.7527 20.5915 10.5806 19.4194C9.40848 18.2473 8.75 16.6576 8.75 15C8.75 13.3424 9.40848 11.7527 10.5806 10.5806C11.7527 9.40848 13.3424 8.75 15 8.75C16.6576 8.75 18.2473 9.40848 19.4194 10.5806C20.5915 11.7527 21.25 13.3424 21.25 15C21.25 16.6576 20.5915 18.2473 19.4194 19.4194C18.2473 20.5915 16.6576 21.25 15 21.25ZM15 5.625C8.75 5.625 3.4125 9.5125 1.25 15C3.4125 20.4875 8.75 24.375 15 24.375C21.25 24.375 26.5875 20.4875 28.75 15C26.5875 9.5125 21.25 5.625 15 5.625Z"
                  fill="#DBDBDB"
                  fillOpacity=""
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
