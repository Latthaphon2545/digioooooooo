import React from "react";

type ModelInputFieldProps = {
  title: string;
  textarea: boolean;
};

export default function ModelInputField({
  title,
  textarea,
}: ModelInputFieldProps) {
  const underScore_to_whiteSpace = (field: string) => {
    return field.replace(/_/g, " ");
  };

  return (
    <>
      {textarea ? (
        <textarea
          name="description"
          id=""
          rows={2}
          placeholder="Description"
          className={`lg:ml-7 mt-3 font-normal block p-2.5 lg:min-w-[70vh] text-sm text-base-content bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  w-full  bg-transparent`}
          required
        ></textarea>
      ) : (
        <input
          type="text"
          name={title}
          className="lg:ml-7 mt-2 p-2 sm:py-1 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary placeholder:capitalize w-full bg-transparent"
          placeholder={underScore_to_whiteSpace(title)}
          required
        />
      )}
    </>
  );
}
