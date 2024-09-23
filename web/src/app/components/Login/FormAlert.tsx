import { useState } from "react";

interface AlertProps {
  enabled: boolean;
  text: string;
}
export default function FormAlert({ enabled, text }: AlertProps) {
  return (
    <div
      id="login__alert__toast"
      className="bg-lightgray rounded p-2 absolute -top-2 w-full transition"
      style={{
        transform: enabled ? "translate(0%, -100%)" : "translate(-50%, -100%)",
        opacity: enabled ? "1" : "0",
      }}
    >
      {text}
    </div>
  );
}
