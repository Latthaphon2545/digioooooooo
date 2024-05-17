export default function SearchBar() {
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

  return (
    <div className="flex justify-end items-center">
      <div className="relative inline-block text-left">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn m-1">
            All
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {categories.user.map((category, index) => (
              <>
                <li key={index} className="flex flex-col gap-2">
                  <p className="text-xs mt-2">{category.title[0]}</p>
                  {category.status.map((status) => (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-info"
                      />
                      <span className="label-text">{status}</span>
                    </label>
                  ))}
                  <p className="text-xs mt-2">{category.title[1]}</p>
                  {category.role.map((role) => (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-info"
                      />
                      <span className="label-text">{role}</span>
                    </label>
                  ))}
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}
