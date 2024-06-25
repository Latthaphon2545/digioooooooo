import { formatRoles } from "@/lib/inputUtils";
import { DataItem, Model, Role } from "@/lib/types";
import React from "react";
import MobileInputField from "../mobileInputField";

type mobileInputProps = {
  page: "user" | "product" | "merchant";
  index: number;
  formValues: Array<DataItem>;
  handleInputChange: (
    index: number,
    field: any
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRoleChange?: (index: number, newRole: Role) => void;
  models?: Model[];
};

export default function MobileInput({
  page,
  index,
  formValues,
  handleInputChange,
  handleRoleChange,
  models,
}: mobileInputProps) {
  return (
    <div>
      {/* <div className="divider">8;p {index + 1}</div> */}
      <div className="text-2xl font-bold flex items-center justify-center btn btn-circle mx-auto mb-3">
        <p>{index + 1}</p>
      </div>
      <div className="w-full">
        {page === "user" && (
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
        )}
        {page === "user" ||
          (page === "merchant" && (
            <MobileInputField
              placeholder="Name"
              value={formValues[index].name}
              onChange={handleInputChange(index, "name")}
            />
          ))}
        {page === "merchant" && (
          <MobileInputField
            placeholder="Address"
            value={formValues[index].address}
            onChange={handleInputChange(index, "address")}
          />
        )}
        {page === "user" ||
          (page === "merchant" ?? (
            <MobileInputField
              placeholder="Contact"
              value={formValues[index].contact}
              onChange={handleInputChange(index, "contact")}
            />
          ))}
        {page === "user" && (
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
        )}
        {page === "product" && (
          <label className="border p-1 rounded-lg flex items-center gap-2 m-1">
            <select
              className="grow bg-white"
              value={formValues[index].model}
              onChange={handleInputChange(index, "model")}
            >
              <option disabled={true} value="">
                Select Model
              </option>
              {models?.map((model, index) => (
                <option key={index} value={model.id}>
                  {model.series}
                </option>
              ))}
            </select>
          </label>
        )}
        {page === "product" && (
          <MobileInputField
            placeholder="Serial Number"
            value={formValues[index].sn}
            onChange={handleInputChange(index, "sn")}
          />
        )}
      </div>
    </div>
  );
}
