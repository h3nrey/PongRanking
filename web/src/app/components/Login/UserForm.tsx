import Input from "../Input";
import Link from "next/link";
import FormAlert from "./FormAlert";
import { useState } from "react";

interface FormProps {
  formAction: (e: any) => Promise<void>;
  title: string;
  submitText: string;
  showAlert: boolean;
  alertText: string;
  otherPageLink: string;
  otherPageText: string;
  children: JSX.Element;
}

export default function UserForm({
  formAction,
  title,
  submitText,
  showAlert,
  alertText,
  children,
  otherPageLink,
  otherPageText,
}: FormProps) {
  return (
    <div className="h-full flex-1 flex items-center justify-center w-full">
      <div className="flex flex-col relative">
        <FormAlert enabled={showAlert} text={alertText} />
        <form
          onSubmit={formAction}
          className="bg-red p-4 items-center flex flex-col gap-8 rounded-md"
        >
          <h2 className="text-[2rem] font-bold">{title}</h2>

          <div className="flex flex-col gap-4">
            {children}
            <button
              type="submit"
              className="bg-white text-red rounded-full py-2"
            >
              {submitText}
            </button>
          </div>
          <Link href={otherPageLink}>{otherPageText}</Link>
        </form>
      </div>
    </div>
  );
}
