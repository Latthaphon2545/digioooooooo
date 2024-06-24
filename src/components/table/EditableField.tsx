"use client";

import { useState } from "react";

export const EditableField = ({
  defaultValue,
  onChange,
  textarea = false,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);

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
      />
    );
  } else {
    return (
      <input
        type="text"
        value={value}
        className="border-2 border-base-content rounded-md p-1 w-full text-start"
        onChange={handleChange}
      />
    );
  }
};
