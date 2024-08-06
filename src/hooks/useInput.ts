import { useState } from "react";

export default function useInput() {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  const inputProps = {
    value: inputValue,
    onChange: handleInputChange,
  };

  return inputProps;
}
