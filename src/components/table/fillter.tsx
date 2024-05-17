const categories = {
  user: [
    {
      title: ["Status", "Role"],
      status: ["Active", "Inactive", "Restricted", "Pending"],
      role: ["Admin", "Operator", "Call Center"],
    },
  ],
  product: [
    {
      status: ["Active", "Inactive"],
    },
  ],
};

export default function Fillter() {
  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn m-1 btn-neutral">
        All
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {categories.user.map((category, index) => (
          <li key={index} className="flex flex-col gap-2">
            <p className="text-xs mt-2">{category.title[0]}</p>
            {category.status.map((status, statusIndex) => (
              <label key={statusIndex} className="cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">{status}</span>
              </label>
            ))}
            <p className="text-xs mt-2">{category.title[1]}</p>
            {category.role.map((role, roleIndex) => (
              <label key={roleIndex} className="cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
                <span className="label-text">{role}</span>
              </label>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
