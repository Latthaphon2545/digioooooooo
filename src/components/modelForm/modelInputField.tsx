import React from "react";

type ModelInputFieldProps = {
  title: string;
  fieldset: Boolean;
};

export default function ModelInputField({
  title,
  fieldset,
}: ModelInputFieldProps) {
  const underScore_to_whiteSpace = (field: string) => {
    return field.replace(/_/g, " ");
  };

  return (
    <input
      type="text"
      name={title}
      className="lg:ml-7 mt-2 p-2 sm:py-1 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary placeholder:capitalize w-full"
      placeholder={underScore_to_whiteSpace(title)}
      // required
    />
  );
}
