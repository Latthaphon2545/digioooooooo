import React from "react";

type InputFieldProps = {
  index: number;
  formValues: {
    email: string;
    username: string;
    contact: string;
  }[];
  handleInputChange: (
    index: number,
    field: "email" | "contact" | "username"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UserInputField = ({
  index,
  formValues,
  handleInputChange,
}: InputFieldProps) => (
  <tr key={index}>
    <td>
      <p className="text-center text-xl font-semibold">{index + 1}</p>
    </td>
    <td>
      <label className="input input-sm input-bordered flex items-center gap-2 m-2 relative">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          value={formValues[index].email}
          onChange={handleInputChange(index, "email")}
        />
        <span className="absolute top-[-1] right-0 bg-primary rounded-r-lg text-white px-5">
          @digio.co.th
        </span>
      </label>
    </td>
    <td>
      <label className="input input-sm input-bordered flex items-center gap-2 m-1">
        <input
          type="text"
          className="grow"
          placeholder="Username"
          value={formValues[index].username}
          onChange={handleInputChange(index, "username")}
        />
      </label>
    </td>
    <td>
      <label className="input input-sm input-bordered flex items-center gap-2 m-1">
        <input
          type="text"
          className="grow"
          placeholder="Contact"
          value={formValues[index].contact}
          onChange={handleInputChange(index, "contact")}
        />
      </label>
    </td>
  </tr>
);

export default UserInputField;
