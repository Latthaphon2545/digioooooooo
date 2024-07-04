"use client";

let USERROLE = ["Admin", "Operator", "CallCenter"];
USERROLE = USERROLE.map((role) => role.toUpperCase());
let USERSTATUS = ["Pending", "Active", "Restricted", "Inactive"];
USERSTATUS = USERSTATUS.map((status) => status.toUpperCase());

interface DropdownProps {
  selected: any;
  onChange: (value: string) => void;
  isRole?: boolean;
  isStatus?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  selected,
  isRole,
  onChange,
  isStatus,
}) => {
  if (isRole) {
    return (
      <select
        className="border border-primary bg-base-100 rounded-md p-1 w-full text-center"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {USERROLE.map((option) => (
          <option key={option} value={option}>
            {handleRoleChange(option)}
          </option>
        ))}
      </select>
    );
  } else if (isStatus) {
    return (
      <select
        className="border border-primary bg-base-100 rounded-md p-1 w-full text-center"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {USERSTATUS.map((option) => (
          <option key={option} value={option}>
            {handleStatusChange(option)}
          </option>
        ))}
      </select>
    );
  }
};

export const handleRoleChange = (e: string) => {
  let showRole = "";
  if (e === "ADMIN") {
    showRole = "Admin";
  } else if (e === "OPERATOR") {
    showRole = "Operator";
  } else if (e === "CALLCENTER") {
    showRole = "Call Center";
  }
  return showRole;
};

export const handleStatusChange = (e: string) => {
  let showStatus = "";
  if (e === "ACTIVE") {
    showStatus = "Active";
  } else if (e === "INACTIVE") {
    showStatus = "Inactive";
  } else if (e === "RESTRICTED") {
    showStatus = "Restricted";
  } else if (e === "PENDING") {
    showStatus = "Pending";
  }
  return showStatus;
};
