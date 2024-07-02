import { useState, useEffect } from "react";

export const EditableField = ({
  defaultValue,
  onChange,
  textarea = false,
  name,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  name?: string;
}) => {
  // Use useEffect to set the initial value only once
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  if (textarea) {
    return (
      <textarea
        value={value}
        className="border-2 border-base-content rounded-md p-1 w-full h-24"
        onChange={handleChange}
        name={name}
      />
    );
  } else {
    return (
      <input
        type="text"
        value={value}
        className="border-2 border-base-content rounded-md p-1 w-full text-start"
        onChange={handleChange}
        name={name}
      />
    );
  }
};
