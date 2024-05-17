const InputField = (input: { placeholder: string }) => {
  return input.placeholder === "email" ? (
    <div className="flex justify-between border-2 border-gray-300 rounded-lg w-full">
      <input
        name={input.placeholder}
        type="text"
        placeholder={input.placeholder}
        className="pl-3 placeholder:capitalize flex-grow"
      />
      <span className="bg-primary p-[0.8rem] rounded-r-lg text-lg text-base-100">
        @digio.co.th
      </span>
    </div>
  ) : (
    <input
      name={input.placeholder}
      type="text"
      placeholder={input.placeholder}
      className="placeholder:capitalize p-3 border-2 border-gray-300 rounded-lg w-full"
    />
  );
};

export default InputField;
