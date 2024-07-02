import { formatRoles } from "@/lib/inputUtils";
import { DataItem, Model, Role } from "@/lib/types";
import React from "react";
import MobileInputField from "../mobileInputField";

type FormValues = {
  email: string;
  name: string;
  contact: string;
  role: Role | null;
}[];

type mobileInputProps = {
  index: number;
  formValues: FormValues;
  handleInputChange: (
    index: number,
    field: any
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange?: (index: number, newRole: Role) => void;
  models?: Model[];
};

export default function MobileInput({
  index,
  formValues,
  handleInputChange,
  handleRoleChange,
}: mobileInputProps) {
  return (
    <div className="">
      {/* <div className="divider">8;p {index + 1}</div> */}
      <div className="text-2xl font-bold flex items-center justify-center btn btn-circle mx-auto mb-3">
        <p>{index + 1}</p>
      </div>
      <div className="w-full">
        <div className=" w-full h-full rounded   place-content-center ">
          <label className="input  input-bordered input-sm flex items-center gap-2 m-1 relative ">
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={formValues[index].email}
              onChange={handleInputChange(index, "email")}
            />
            <span className="absolute top-[-1] right-0 bg-primary  rounded-r-lg text-white laptop:px-5 mobile:px-1 ">
              @digio.co.th
            </span>
          </label>
        </div>

        <MobileInputField
          placeholder="Name"
          value={formValues[index].name}
          onChange={handleInputChange(index, "name")}
        />

        <MobileInputField
          placeholder="Contact"
          value={formValues[index].contact}
          onChange={handleInputChange(index, "contact")}
        />

        <div className=" w-full h-full rounded   place-content-center">
          <label className="input  input-bordered input-sm flex items-center gap-2 m-1">
            <select
              value={formValues[index].role ?? ""}
              onChange={(e) =>
                handleRoleChange &&
                handleRoleChange(index, e.target.value as Role)
              }
              className="grow bg-white"
            >
              <option value="" disabled={true}>
                Select a role
              </option>
              {Object.values(Role).map((role) => (
                <option key={role} value={role} className="p-3">
                  {formatRoles(role)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
