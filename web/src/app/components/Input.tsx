import { ChangeEvent, useState } from "react";
interface Props {
  placeholder?: string;
  name: string;
  type?: string;
}

export default function Input({ placeholder, name, type }: Props) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    console.log(e.target.value);
  }
  return (
    <input
      type={type ? type : "text"}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInput}
      name={name}
      className="bg-lightgray rounded-full p-4 py-2 min-w-[200px] outline-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline"
    />
  );
}
