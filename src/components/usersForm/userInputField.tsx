import { Role } from "@/lib/types";
import React from "react";

type InputFieldProps = {
  index: number;
  formValues: {
    email: string;
    name: string;
    contact: string;
    role: Role | null;
  }[];
  handleInputChange: (
    index: number,
    field: "email" | "contact" | "name"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (index: number, newRole: Role) => void;
};

const UserInputField = ({
  index,
  formValues,
  handleInputChange,
  handleRoleChange,
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
          placeholder="Name"
          value={formValues[index].name}
          onChange={handleInputChange(index, "name")}
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
    <td>
      <label className="input input-sm input-bordered flex items-center gap-2 m-1">
        <select
          value={formValues[index].role ?? ""}
          onChange={(e) => handleRoleChange(index, e.target.value as Role)}
        >
          <option value="" disabled={true}>
            Select a role
          </option>
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>
    </td>
  </tr>
);

export default UserInputField;
