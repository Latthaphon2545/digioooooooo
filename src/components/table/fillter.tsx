import DropdownBottom from "./dropdownFillter";

const CATEGORIES = [
  {
    title: "User",
    list: [
      {
        title: "Status",
        names: [
          { name: "Active", action: () => {} },
          { name: "Inactive", action: () => {} },
          { name: "Restricted", action: () => {} },
          { name: "Pending", action: () => {} },
        ],
      },
      {
        title: "Role",
        names: [
          { name: "Admin", action: () => {} },
          { name: "Operator", action: () => {} },
          { name: "Call Center", action: () => {} },
        ],
      },
    ],
  },
];

export default function Fillter() {
  return (
    <>
      {CATEGORIES.map((item, index) => (
        <DropdownBottom
          key={index}
          item={item}
          index={index}
        />
      ))}
    </>
  );
}
