import { useState, useEffect } from "react";

export const EditableField = ({
  defaultValue,
  onChange,
  textarea = false,
  name,
  contact,
  tooltip,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  name?: string;
  contact?: boolean;
  tooltip?: string;
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
        className="input input-sm input-primary input-bordered h-24 w-full"
        onChange={handleChange}
        name={name}
      />
    );
  } else {
    return (
      <label
        className={`input input-sm input-primary input-bordered relative flex items-center gap-2 ${
          value.length === 0
            ? "input-error"
            : contact && value.length !== 10
            ? "input-error"
            : ""
        }`}
      >
        <input
          type="text"
          value={value}
          className="grow"
          onChange={handleChange}
          name={name}
          minLength={contact ? 10 : 1}
          maxLength={contact ? 10 : undefined}
        />
        {tooltip && (
          <div
            className="tooltip absolute right-1 top-1/2 transform -translate-y-1/2"
            data-tip={tooltip}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className={`h-4 w-4 shrink-0 stroke-warning`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        )}
      </label>
    );
  }
};
