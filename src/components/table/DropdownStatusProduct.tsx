"use client";

let PRODUCTSTATUS = [
  "INSTOCK",
  "INSTALLED",
  "INSTALLING",
  "WAITREPAIR",
  "REPARING",
  "DAMAGED",
  "LOST",
];

interface DropdownProps {
  selected: any;
  onChange: (value: string) => void;
}

export const DropdownProduct: React.FC<DropdownProps> = ({
  selected,
  onChange,
}) => {
  return (
    <select
      className="border-2 border-base-content rounded-md p-1 w-full text-center"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {PRODUCTSTATUS.map((option) => (
        <option key={option} value={option}>
          {handleStatusChange(option)}
        </option>
      ))}
    </select>
  );
};

export const handleStatusChange = (e: string) => {
  let showStatus = "";
  if (e === "INSTOCK") {
    showStatus = "In Stock";
  } else if (e === "INSTALLED") {
    showStatus = "Installed";
  } else if (e === "INSTALLING") {
    showStatus = "Installing";
  } else if (e === "WAITREPAIR") {
    showStatus = "Waiting for Repair";
  } else if (e === "REPARING") {
    showStatus = "Repairing";
  } else if (e === "DAMAGED") {
    showStatus = "Damaged";
  } else if (e === "LOST") {
    showStatus = "Lost";
  }
  return showStatus;
};
