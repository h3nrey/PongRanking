interface Props {
  placeholder?: string;
}

export default function Input({ placeholder }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-lightgray rounded-full p-4 py-2 min-w-[200px] outline-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline"
    />
  );
}
