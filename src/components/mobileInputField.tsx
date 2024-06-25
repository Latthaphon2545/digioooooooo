import React from "react";

type ReusableInputProps = {
  placeholder: string;
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MobileInputField: React.FC<ReusableInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="w-full h-full rounded place-content-center">
      <label className="input input-bordered input-sm flex items-center gap-2 m-1 relative">
        <input
          type="text"
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default MobileInputField;
