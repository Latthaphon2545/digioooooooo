import { Model } from "@/lib/types";
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
    <label
      className={`${
        fieldset ? "ml-7 font-normal" : "ml-2 font-semibold"
      } capitalize`}
    >
      {underScore_to_whiteSpace(title)}:
      <input
        type="text"
        name={title}
        className="input input-sm input-bordered ml-2 placeholder:capitalize"
        placeholder={title}
      />
    </label>
  );
}
