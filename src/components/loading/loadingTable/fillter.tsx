import { IoFilterSharp } from "react-icons/io5";

export default function DropdownBottom() {
  return (
    <div className="dropdown dropdown-hover dropdown-bottom">
      <button tabIndex={0} className="btn btn-sm ml-3">
        <IoFilterSharp size={20} />
      </button>
    </div>
  );
}
